'use client';
import { useMutation } from "@apollo/client";
import { REGISTER_ADMIN_USER } from "@/lib/graphql/mutations/mutations";
import { RegisterAdminUserInput } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Alert 
} from '@mui/material';

export default function AddAdminUserForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterAdminUserInput>({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');

  const [addNewAdminUser, { loading }] = useMutation(REGISTER_ADMIN_USER, {
    onCompleted: (data) => {
      const { success, errorMessage } = data.registerAdminUser;

      if (success) {
        alert('アカウントが作成されました!');
        setFormData({ name: '', email: '', password: '' });
        setError('');
        router.push('/');
      } else {
        if (errorMessage.includes("Duplicate entry")) {
          setError("このメールアドレスはすでに使用されています。別のメールアドレスをお試しください。");
        } else {
          setError(errorMessage);
        }
      }
    },
    onError: (err) => {
      console.error("Mutation error:", err);
      setError("予期しないエラーが発生しました。再試行してください。");
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    addNewAdminUser({
      variables: { registerAdminUserInput: formData }
    });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        アカウントを作成する
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="名前"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          アカウントを作成
        </Button>
      </form>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Link href='/' style={{ textDecoration: 'none' }}>
        <Button variant="outlined" color="primary" fullWidth sx={{ marginTop: '16px' }}>
          ホームに戻る
        </Button>
      </Link>
    </Box>
  );
}
