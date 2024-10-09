'use client';
import { useMutation } from "@apollo/client";
import { SUBMIT_QUESTION } from "@/lib/graphql/mutations/mutations";
import { SubmitQuestionInput } from "@/types/types";
import { useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";

export default function NewQuestionForm() {
  const { adminUserId } = useAuth();
  const [formData, setFormData] = useState<SubmitQuestionInput>({
    title: '',
    options: [{ option_text: '' }],
  });
  const [questionUrl, setQuestionUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [addNewQuestion, { loading }] = useMutation(SUBMIT_QUESTION, {
    variables: { submitQuestionInput: formData, adminUserId: adminUserId },
    onCompleted: (data) => {
      const { success, errorMessage, question } = data.submitQuestion;

      if (success) {
        const fullUrl = `${window.location.origin}/question/${question.url}`;
        setQuestionUrl(question.url);
        alert(`アンケートを作成しました! \n URLは"${fullUrl}"です`);
        setFormData({ title: '', options: [{ option_text: '' }] });
        setError(null);
      } else {
        setError(errorMessage);
        alert(`エラー: ${errorMessage}`);
      }
    },
    onError: (error) => {
      console.error("Error creating question:", error);
      alert(`Error: ${error.message}`);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index].option_text = e.target.value;
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewQuestion();
  };

  const addOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, { option_text: '' }],
    });
  };

  const copyToClipboard = () => {
    if (questionUrl) {
      const fullUrl = `${window.location.origin}/question/${questionUrl}`;
      navigator.clipboard.writeText(fullUrl).then(() => {
        alert(`URL "${fullUrl}" がコピーされました!`);
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        新しいアンケートを作成
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          label="質問項目を入力"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          value={formData.title}
          required
          sx={{ mb: 2 }}
        />

        {formData.options.map((option, index) => (
          <TextField
            key={index}
            fullWidth
            variant="outlined"
            label={`選択肢 ${index + 1} を入力`}
            onChange={(e) => handleChange(e, index)}
            value={option.option_text}
            required
            sx={{ mb: 2 }}
          />
        ))}

        <Button variant="outlined" color="primary" onClick={addOption} sx={{ mb: 2 }}>
          選択肢を追加
        </Button>
        <br />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          アンケートを作成
        </Button>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </form>

      {questionUrl && (
        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={copyToClipboard}>
            URLをコピー
          </Button>
        </Box>
      )}
      <br />
      <Link href='/' passHref>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          ホームに戻る
        </Button>
      </Link>
    </Box>
  );
}
