'use client';
import { useMutation } from "@apollo/client";
import { CREATE_QUESTION } from "@/lib/graphql/mutations/mutations";
import { NewQuestionInput, NewOptionInput } from "@/types/types";
import { useState } from "react";
import Link from "next/link";

export default function NewQuestionForm() {
  const [formData, setFormData] = useState<NewQuestionInput>({
    title: '',
    url: '',
    options: [{ option_text: '' }],
  });

  const [addNewQuestion, { loading, error }] = useMutation(CREATE_QUESTION, {
    variables: { createQuestionInput: formData },
    onCompleted: () => {
      alert('Question created successfully!');
      setFormData({ title: '', url: '', options: [{ option_text: '' }] });
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="title"
          placeholder="Question Title"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          value={formData.title}
          required
        />
        <input
          type="text"
          name="url"
          placeholder="Question URL"
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          value={formData.url}
          required
        />

        {formData.options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder="Option Text"
            onChange={(e) => handleChange(e, index)}
            value={option.option_text}
            required
          />
        ))}

        <button type="button" onClick={addOption}>Add Option</button>
        <button type="submit" disabled={loading}>Create Question</button>
        {error && <p>Error: {error.message}</p>}
      </form>
      <Link href='/'>Back to Home</Link>
    </div>
  );
}
