'use client';
import { useQuery, useMutation } from "@apollo/client";
import { SURVEY_BY_URL } from "@/lib/graphql/queries/query";
import { SUBMIT_ANSWER } from "@/lib/graphql/mutations/mutations";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Option, Question } from "@/types/types";
import { Box, Button, Typography, FormControlLabel, Checkbox, Radio, RadioGroup, CircularProgress, Alert, FormGroup, Divider, TextField } from "@mui/material";

export default function NewAnswerForm() {
  const params = useParams<{ url: string }>();
  const url = params.url;

  const { loading, error, data } = useQuery(SURVEY_BY_URL, {
    variables: { url },
  });

  const [selectedOptions, setSelectedOptions] = useState<{ [questionId: number]: number[] }>({});
  const [otherResponses, setOtherResponses] = useState<{ [key: number]: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [createAnswer] = useMutation(SUBMIT_ANSWER, {
    onCompleted: () => {
      setSubmitError(null);
      alert("回答を記録しました!");
      setIsSubmitting(false);
    },
    onError: (error) => {
      const errorMessage = error.graphQLErrors.length > 0 
        ? error.graphQLErrors[0].message 
        : '予期しないエラーが発生しました';
      setSubmitError(errorMessage);
      alert(errorMessage);
      setIsSubmitting(false);
    },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  const survey = data.surveyByUrl;

  const handleOptionChange = (questionId: number, optionId: number, hasMultipleOptions: boolean) => {
    setSelectedOptions((prev) => {
      const currentOptions = prev[questionId] || [];
      if (hasMultipleOptions) {
        if (currentOptions.includes(optionId)) {
          return { ...prev, [questionId]: currentOptions.filter(id => id !== optionId) };
        } else {
          return { ...prev, [questionId]: [...currentOptions, optionId] };
        }
      } else {
        return { ...prev, [questionId]: [optionId] };
      }
    });
  };

  const handleOtherResponseChange = (questionId: number, value: string) => {
    setOtherResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const responses = survey.questions.map((question: Question) => ({
      question_id: Number(question.id),
      options: (selectedOptions[question.id] || []).map(optionId => ({
        option_id: Number(optionId),
        other_response: otherResponses[question.id] || "",
      })),
    }));

    console.log("Submitting Responses:", responses);

    try {
      await createAnswer({
        variables: {
          submitAnswerInput: {
            question_answers: responses,
          },
        },
      });
    } catch (error) {
      console.error("Error submitting answers:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        {survey.title}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <form onSubmit={handleSubmit}>
        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError.split('\n').map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </Alert>
        )}

        <FormGroup>
          {survey.questions.map((question: Question) => (
            <Box key={question.id} sx={{ mb: 4, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <Typography variant="h5">{question.question_text}</Typography>
              <FormGroup sx={{ mt: 2 }}>
                {question.has_multiple_options ? (
                  question.options.map((option: Option) => (
                    <FormControlLabel
                      key={option.id}
                      control={
                        <Checkbox
                          checked={selectedOptions[question.id]?.includes(option.id) || false}
                          onChange={() => handleOptionChange(question.id, option.id, true)}
                        />
                      }
                      label={option.option_text}
                    />
                  ))
                ) : (
                  <RadioGroup
                    value={selectedOptions[question.id]?.[0] || ""}
                    onChange={(e) => {
                      const selectedId = Number(e.target.value);
                      handleOptionChange(question.id, selectedId, false);
                      if (selectedId === question.options.find(option => option.option_text === 'その他')?.id) {
                        handleOtherResponseChange(question.id, otherResponses[question.id] || "");
                      } else {
                        handleOtherResponseChange(question.id, "");
                      }
                    }}
                  >
                    {question.options.map((option: Option) => (
                      <FormControlLabel
                        key={option.id}
                        value={option.id}
                        control={<Radio />}
                        label={option.option_text}
                      />
                    ))}
                  </RadioGroup>
                )}
              </FormGroup>

              {question.allows_other && (
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="その他の回答を入力してください"
                  value={otherResponses[question.id] || ""}
                  onChange={(e) => handleOtherResponseChange(question.id, e.target.value)}
                  sx={{ mt: 2 }}
                />
              )}
            </Box>
          ))}
        </FormGroup>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          fullWidth
          sx={{ mt: 2 }}
        >
          回答する
        </Button>
      </form>
    </Box>
  );
}
