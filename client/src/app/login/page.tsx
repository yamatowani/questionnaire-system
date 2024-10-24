'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { AUTHENTICATE_ADMIN_USER } from '@/lib/graphql/mutations/mutations';
import { AuthenticateAdminUserResponse } from '@/types/types';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSuccess = (data: AuthenticateAdminUserResponse) => {
    const { accessToken } = data.authenticateAdminUser;
    localStorage.setItem('token', accessToken);
    alert('ログインに成功しました！');
    router.push('/');
  };

  const handleLoginError = () => {
    setError('メールアドレスまたはパスワードが無効です');
  };

  const [login, { loading }] = useMutation(AUTHENTICATE_ADMIN_USER, {
    onCompleted: handleLoginSuccess,
    onError: handleLoginError,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    await login({
      variables: {
        authenticateAdminUserInput: { email, password },
      },
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          mb: 4,
          padding: 2,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5">ログイン</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            value={email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={password}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
            {loading ? 'ログイン中...' : 'ログイン'}
          </Button>
        </form>
        <Link href='/admin_user/new' passHref>
          <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
            アカウントを作成する
          </Button>
      </Link>
      </Box>
    </Container>
  );
};

export default LoginPage;
