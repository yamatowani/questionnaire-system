import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';

export default function Complete() {
  return (
    <Container component="main" maxWidth="sm">
      <Box 
        sx={{
          textAlign: 'center',
          mt: 5,
          p: 4,
          borderRadius: 2,
          backgroundColor: '#f5f5f5',
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          アンケートの回答が完了しました！
        </Typography>
        <Typography variant="body1" gutterBottom>
          ご協力いただきありがとうございました。
        </Typography>
      </Box>
    </Container>
  );
};
