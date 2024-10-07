'use client';
import { useQuery, useMutation } from "@apollo/client";
import { GET_QUESTION_BY_URL } from "@/lib/graphql/queries/query";
import { CREATE_ANSWER } from "@/lib/graphql/mutations/mutations";
import { useParams } from "next/navigation";
import { useState } from "react";


interface Option {
  id: number
  option_text: string
}

export default function QuestionPage() {
  const params = useParams<{ url: string }>();
  const url = params.url;
  const { loading, error, data } = useQuery(GET_QUESTION_BY_URL, {
    variables: { url },
  });

  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [createAnswer] = useMutation(CREATE_ANSWER, {
    onCompleted: () => {
      alert("Answer submitted successfully!");
    },
    onError: (error) => {
      console.error("Error submitting answer:", error);
      alert("Error: " + error.message);
    }
  });

  if (error) {
    console.error("Error fetching question:", error);
    return <p>Error: {error.message}</p>;
  }

  if (loading) return <p>Loading...</p>;

  const question = data.getQuestionByUrl;

  const handleSubmit = async () => {
    if (selectedOption) {
      await createAnswer({
        variables: {
          newAnswerInput: {
            question_id: question.id,
            option_id: selectedOption,
          },
        },
      });
    }
  };

  return (
    <div>
      <h1>{question.title}</h1>
      <ul>
        {question.options.map((option: Option) => (
          <li key={option.id}>
            <label>
              <input
                type="radio"
                value={option.id}
                onChange={() => setSelectedOption(option.id)}
                name="option"
              />
              {option.option_text}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} disabled={!selectedOption}>
        Submit Answer
      </button>
    </div>
  );
}
