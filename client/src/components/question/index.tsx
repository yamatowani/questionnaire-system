'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { SURVEYS } from "@/lib/graphql/queries/query";
import { Question } from "@/types/types";
import useAuth from "@/hooks/useAuth";
import { Box, Button, Typography, CircularProgress, List, ListItem, ListItemText } from "@mui/material";

export default function Questions() {
  const { logout, token } = useAuth();
  const router = useRouter();

  const { data, loading, error } = useQuery(SURVEYS, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  useEffect(() => {
    if (error) {
      router.push('/login');
    }
  }, [error, router]);

  if (loading) return <CircularProgress />;

  if (!data || !data.questions || data.questions.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6">作成したアンケートはありません</Typography>
        <Button variant="outlined" color="primary" onClick={logout} sx={{ mt: 2 }}>
          ログアウト
        </Button>
        <br />
        <Link href='/question' passHref>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            新しいアンケートを作成する
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        作成したアンケート一覧
      </Typography>
      <List>
        {data.questions.map((question: Question) => (
          <ListItem key={question.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
            <ListItemText
              primary={
                <Link href={`/question/${question.url}`} passHref>
                  <Typography variant="h6" component="span" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
                    タイトル: {question.title}
                  </Typography>
                </Link>
              }
            />
          </ListItem>
        ))}
      </List>
      <Link href='/answer' passHref>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          アンケートの結果を見る
        </Button>
      </Link>
      <br />
      <Link href='/question' passHref>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          新しいアンケートを作成する
        </Button>
      </Link>
      <br />
      <br />
      <Button variant="outlined" color="primary" onClick={logout} sx={{ mt: 2 }}>
        ログアウト
      </Button>
    </Box>
  );
}
