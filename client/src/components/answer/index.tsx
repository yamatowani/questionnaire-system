'use client';
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { SURVEY_RESULT } from "@/lib/graphql/queries/query";
import useAuth from "@/hooks/useAuth";
import AnswersChart from "./chart";
import { Box, Button, Typography, CircularProgress, Alert } from "@mui/material";
import { useParams } from "next/navigation";

export default function SurveyResult() {
  const { token } = useAuth();
  const params = useParams<{ url: string }>();
  const url = params.url;

  const { data, loading, error } = useQuery(SURVEY_RESULT, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    variables: { url },
  });
  console.log(data);

  if (loading) return <CircularProgress />;

  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  if (!data || !data.surveyResult) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6">作成したアンケートはありません</Typography>
        <Link href='/question' passHref>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            新しいアンケートを作成する
          </Button>
        </Link>
        <br />
        <Link href='/' passHref>
          <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
            ホームに戻る
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4">{data.surveyResult.title} の結果一覧</Typography>
      <Typography variant="h5">総回答数: {data.surveyResult.answer_count}件</Typography>
      {/* AnswersChartコンポーネントを修正して、questionsを渡す */}
      <AnswersChart surveyResult={data.surveyResult} />
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Link href='/question' passHref>
          <Button variant="contained" color="primary" sx={{ mb: 2 }}>
            新しいアンケートを作成する
          </Button>
        </Link>
        <br />
        <Link href='/' passHref>
          <Button variant="outlined" color="primary">
            ホームに戻る
          </Button>
        </Link>
      </Box>
    </Box>
  );  
}
