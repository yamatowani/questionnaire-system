'use client';
import { useMutation } from "@apollo/client";
import { SUBMIT_QUESTION } from "@/lib/graphql/mutations/mutations";
import { SubmitQuestionInput } from "@/types/types";
import { useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function NewQuestionForm() {
  const { logout, adminUserId } = useAuth();
  const [formData, setFormData] = useState<SubmitQuestionInput>({
    title: '',
    options: [{ option_text: '' }],
  });
  const [questionUrl, setQuestionUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // エラーメッセージ用の状態

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
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="title"
          placeholder="質問項目を入力"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          value={formData.title}
          required
        />

        {formData.options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder="選択肢を入力"
            onChange={(e) => handleChange(e, index)}
            value={option.option_text}
            required
          />
        ))}

        <button type="button" onClick={addOption}>選択肢を追加</button>
        <button type="submit" disabled={loading}>Create Question</button>
        {error && <p>Error: {error}</p>}
      </form>

      {questionUrl && (
        <div>
          <button onClick={copyToClipboard}>URLをコピー</button>
        </div>
      )}
      <button onClick={logout}>ログアウト</button>
      <br />
      <Link href='/'>ホームに戻る</Link>
    </div>
  );
}
