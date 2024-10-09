'use client';
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { QUESTION_RESULTS } from "@/lib/graphql/queries/query";
import useAuth from "@/hooks/useAuth";
import AnswersChart from "./chart";
import { Box, Button, Typography, CircularProgress, Alert } from "@mui/material";

export default function Answers() {
  const { adminUserId } = useAuth();

  const { data, loading, error } = useQuery(QUESTION_RESULTS, {
    variables: { adminUserId },
  });

  if (loading) return <CircularProgress />;

  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  if (!data || !data.questionResults || data.questionResults.length === 0) {
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
      <AnswersChart data={data.questionResults} />
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <br />
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
