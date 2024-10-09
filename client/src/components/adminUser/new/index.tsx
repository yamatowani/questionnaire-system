'use client';
import { useMutation } from "@apollo/client";
import { REGISTER_ADMIN_USER } from "@/lib/graphql/mutations/mutations";
import { RegisterAdminUserInput } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

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
        alert('Admin User added successfully!');
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
    <div>
      <h1>アカウントを作成する</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} required />
        <button type="submit" disabled={loading}>Create Admin User</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Link href='/'>Back to Home</Link>
    </div>
  );
}
