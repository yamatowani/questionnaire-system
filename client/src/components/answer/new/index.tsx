'use client';
import { useQuery, useMutation } from "@apollo/client";
import { GET_QUESTION_BY_URL } from "@/lib/graphql/queries/query";
import { SUBMIT_ANSWER } from "@/lib/graphql/mutations/mutations";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Option } from "@/types/types";

export default function NewAnswerForm() {
  const params = useParams<{ url: string }>();
  const url = params.url;
  const { loading, error, data } = useQuery(GET_QUESTION_BY_URL, {
    variables: { url },
  });

  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [createAnswer] = useMutation(SUBMIT_ANSWER, {
    onCompleted: () => {
      alert("Answer submitted successfully!");
    },
    onError: (error) => {
      console.error("Error submitting answer:", error);
      alert("Error: " + error.message);
    },
  });

  if (error) {
    console.error("Error fetching question:", error);
    return <p>Error: {error.message}</p>;
  }

  if (loading) return <p>Loading...</p>;

  const question = data.questionByUrl;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption) {
      await createAnswer({
        variables: {
          submitAnswerInput: {
            question_id: Number(question.id),
            option_id: selectedOption,
          },
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}> {/* フォームに onSubmit を追加 */}
      <div>
        <h1>{question.title}</h1>
        <ul>
          {question.options.map((option: Option) => (
            <li key={option.id}>
              <label>
                <input
                  type="radio"
                  value={option.id}
                  onChange={() => setSelectedOption(Number(option.id))}
                  name="option"
                />
                {option.option_text}
              </label>
            </li>
          ))}
        </ul>
        <button type="submit" disabled={!selectedOption}>
          Submit Answer
        </button>
      </div>
    </form>
  );
}
