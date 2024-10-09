'use client';
import { useQuery, useMutation } from "@apollo/client";
import { GET_QUESTION_BY_URL } from "@/lib/graphql/queries/query";
import { SUBMIT_ANSWER } from "@/lib/graphql/mutations/mutations";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Option } from "@/types/types";
import { Box, Button, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";

export default function NewAnswerForm() {
  const params = useParams<{ url: string }>();
  const url = params.url;

  const { loading, error, data } = useQuery(GET_QUESTION_BY_URL, {
    variables: { url },
  });

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [createAnswer] = useMutation(SUBMIT_ANSWER, {
    onCompleted: () => {
      setSubmitError(null);
      alert("回答を記録しました!");
    },
    onError: () => {
      alert(submitError)
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
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {question.title}
      </Typography>

      <form onSubmit={handleSubmit}>
        <RadioGroup onChange={(e) => setSelectedOption(Number(e.target.value))}>
          {question.options.map((option: Option) => (
            <FormControlLabel
              key={option.id}
              control={<Radio />}
              label={option.option_text}
              value={option.id.toString()}
            />
          ))}
        </RadioGroup>
        <Button type="submit" variant="contained" color="primary" disabled={!selectedOption}>
          回答する
        </Button>
      </form>
    </Box>
  );
}
