'use client';
import { useQuery, useMutation } from "@apollo/client";
import { SURVEY_BY_URL } from "@/lib/graphql/queries/query";
import { SUBMIT_ANSWER } from "@/lib/graphql/mutations/mutations";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Option, Question } from "@/types/types";
import { Box, Button, Typography, RadioGroup, FormControlLabel, Radio, CircularProgress, Alert, FormGroup } from "@mui/material";

export default function NewAnswerForm() {
  const params = useParams<{ url: string }>();
  const url = params.url;

  const { loading, error, data } = useQuery(SURVEY_BY_URL, {
    variables: { url },
  });

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [createAnswer] = useMutation(SUBMIT_ANSWER, {
    onCompleted: () => {
      setSubmitError(null);
      alert("回答を記録しました!");
      setIsSubmitting(true);
    },
    onError: (error) => {
      setSubmitError(error.message || "回答の送信中にエラーが発生しました");
    },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  const survey = data.surveyByUrl;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption) {
      await createAnswer({
        variables: {
          submitAnswerInput: {
            question_id: Number(survey.id),
            option_id: selectedOption,
          },
        },
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {survey.title}
      </Typography>

      <form onSubmit={handleSubmit}>
        <RadioGroup value={selectedOption?.toString() || ""} onChange={(e) => setSelectedOption(Number(e.target.value))}>
          {survey.questions.map((question: Question) => (
        <div key={question.id}>
          <Typography variant="h6">{question.question_text}</Typography>
          <FormGroup>
            {question.options.map((option: Option) => (
              <FormControlLabel
                key={option.id}
                control={<Radio />}
                label={option.option_text}
                value={option.id.toString()}
              />
            ))}
          </FormGroup>
        </div>
      ))}

        </RadioGroup>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!selectedOption || isSubmitting}
        >
          回答する
        </Button>
        {submitError && <Alert severity="error" sx={{ mt: 2 }}>{submitError}</Alert>}
      </form>
    </Box>
  );
}
