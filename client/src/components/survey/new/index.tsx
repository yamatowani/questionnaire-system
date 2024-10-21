'use client';
import { useMutation } from "@apollo/client";
import { SUBMIT_SURVEY } from "@/lib/graphql/mutations/mutations";
import { SubmitSurveyInput } from "@/types/types";
import { useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { Box, Button, TextField, Typography, Alert, IconButton, FormControlLabel, Checkbox } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function NewSurveyForm() {
  const { token } = useAuth();
  const [formData, setFormData] = useState<SubmitSurveyInput>({
    title: '',
    questions: [
      {
        question_text: '',
        has_multiple_options: false,
        allows_other: false,
        options: [{ option_text: '' }]
      }
    ],
  });
  const [surveyUrl, setSurveyUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [submitSurvey, { loading }] = useMutation(SUBMIT_SURVEY, {
    variables: { submitSurveyInput: formData },
    context: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    onCompleted: (data) => {
      const { success, errorMessage, survey } = data.submitSurvey;

      if (success) {
        const fullUrl = `${window.location.origin}/survey/${survey.url}`;
        setSurveyUrl(fullUrl);
        alert(`アンケートを作成しました! \n URLは"${fullUrl}"です`);
        setFormData({
          title: '',
          questions: [
            {
              question_text: '',
              has_multiple_options: false,
              allows_other: false,
              options: [{ option_text: '' }]
            }
          ],
        });
        setError(null);
      } else {
        setError(errorMessage);
        alert(`エラー: ${errorMessage}`);
      }
    },
    onError: (error) => {
      console.error("Error creating survey:", error);
      alert(`Error: ${error.message}`);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, qIndex: number, oIndex?: number) => {
    const updatedQuestions = [...formData.questions];
    if (oIndex !== undefined) {
      updatedQuestions[qIndex].options[oIndex].option_text = e.target.value;
    } else {
      updatedQuestions[qIndex].question_text = e.target.value;
    }
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleRemoveOption = (qIndex: number, oIndex: number) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter((_, i) => i !== oIndex);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleRemoveQuestion = (qIndex: number) => {
    const updatedQuestions = formData.questions.filter((_, i) => i !== qIndex);
    setFormData({ ...formData, questions: updatedQuestions });
  };  

  const addOption = (qIndex: number) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].options.push({ option_text: '' });
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          question_text: '',
          has_multiple_options: false,
          allows_other: false,
          options: [{ option_text: '' }]
        }
      ],
    });
  };

  const handleMultipleOptionsChange = (qIndex: number) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].has_multiple_options = !updatedQuestions[qIndex].has_multiple_options;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleOtherOptionsChange = (qIndex: number) => {
    const updatedQuestions = [...formData.questions];
    const question = updatedQuestions[qIndex];
  
    question.allows_other = !question.allows_other;
  
    if (question.allows_other) {
      if (!question.options.some(option => option.option_text === "その他")) {
        question.options.push({ option_text: "その他" });
      }
    } else {
      question.options = question.options.filter(option => option.option_text !== "その他");
    }
  
    setFormData({ ...formData, questions: updatedQuestions });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitSurvey();
  };

  const copyToClipboard = () => {
    if (surveyUrl) {
      navigator.clipboard.writeText(surveyUrl).then(() => {
        alert(`URL "${surveyUrl}" がコピーされました!`);
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3, border: '1px solid #ddd', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        新しいアンケートを作成
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          label="アンケートタイトルを入力"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          value={formData.title}
          required
          sx={{ mb: 2 }}
        />
        {formData.questions.map((question, qIndex) => (
          <Box key={qIndex} sx={{ mt: 2, mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2, position: 'relative' }}>
            <IconButton onClick={() => handleRemoveQuestion(qIndex)} color="error" sx={{ position: 'absolute', top: 10, right: 10 }}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" sx={{ mb: 1 }}>
              質問 {qIndex + 1}
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label={`質問 ${qIndex + 1} を入力`}
              onChange={(e) => handleChange(e, qIndex)}
              value={question.question_text}
              required
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={question.has_multiple_options}
                    onChange={() => handleMultipleOptionsChange(qIndex)}
                  />
                }
                label="複数選択を許可する"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={question.allows_other}
                    onChange={() => handleOtherOptionsChange(qIndex)}
                  />
                }
                label="任意回答を作成する"
              />
            </Box>
            {question.options.map((option, oIndex) => (
              <Box key={oIndex} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label={`選択肢 ${oIndex + 1} を入力`}
                  onChange={(e) => handleChange(e, qIndex, oIndex)}
                  value={option.option_text}
                  required
                  sx={{ mr: 1 }}
                />
                <IconButton onClick={() => handleRemoveOption(qIndex, oIndex)} color="error">
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
            <Button variant="outlined" onClick={() => addOption(qIndex)} sx={{ mb: 1 }}>
              選択肢を追加
            </Button>
          </Box>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="outlined" onClick={addQuestion}>
            質問を追加
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            アンケートを作成
          </Button>
        </Box>
      </form>
      {surveyUrl && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">作成したアンケートのURL:</Typography>
          <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
            {surveyUrl}
          </Typography>
          <Button variant="outlined" onClick={copyToClipboard} sx={{ mt: 1 }}>
            URLをコピー
          </Button>
        </Box>
      )}
      <Link href="/">
        <Button variant="outlined" sx={{ mt: 2 }}>
          ホームに戻る
        </Button>
      </Link>
    </Box>
  );
}
