'use client';
import { useMutation } from "@apollo/client";
import { CREATE_QUESTION } from "@/lib/graphql/mutations/mutations";
import { NewQuestionInput } from "@/types/types";
import { useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function NewQuestionForm() {
  const { logout } = useAuth();

  const [formData, setFormData] = useState<NewQuestionInput>({
    title: '',
    options: [{ option_text: '' }],
  });

  const [questionUrl, setQuestionUrl] = useState<string | null>(null);

  const [addNewQuestion, { loading, error }] = useMutation(CREATE_QUESTION, {
    variables: { createQuestionInput: formData },
    onCompleted: (data) => {
      const generatedUrl = data.createQuestion.url;
      const fullUrl = `${window.location.origin}/question/${generatedUrl}`;
      setQuestionUrl(generatedUrl);
      alert(`アンケートを作成しました! \n URLは"${fullUrl}"です`);
      setFormData({ title: '', options: [{ option_text: '' }] });
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
        {error && <p>Error: {error.message}</p>}
      </form>

      {questionUrl && (
        <div>
          <button onClick={copyToClipboard}>URLをコピー</button>
        </div>
      )}
      <button onClick={logout}>ログアウト</button>
      <br />
      <Link href='/'>Back to Home</Link>
    </div>
  );
}
