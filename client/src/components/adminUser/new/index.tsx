'use client';
import { useMutation } from "@apollo/client";
import { REGISTER_ADMIN_USER } from "@/lib/graphql/mutations/mutations";
import { NewAdminUserInput } from "@/types/types";
import { useState } from "react";
import Link from "next/link";

export default function AddAdminUserForm() {
  const [formData, setFormData] = useState<NewAdminUserInput>({
    name: '',
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [addNewAdminUser, { loading }] = useMutation(REGISTER_ADMIN_USER, {
    variables: { newAdminUserData: formData },
    onCompleted: () => {
      alert('Admin User added Successfully!');
      setFormData({ name: '', email: '', password: '' });
    },
    onError: (err) => {
      if (err.message.includes("Duplicate entry")) {
        setErrorMessage("このメールアドレスはすでに使用されています。別のメールアドレスをお試しください。");
      } else {
        setErrorMessage(err.message);
      }
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewAdminUser();
  };

  return (
    <div>
      <h1>アカウントを作成する</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} required />
        <button type="submit" disabled={loading}>Create Admin User</button>
        {errorMessage && <p>Error: {errorMessage}</p>}
      </form>
      <Link href='/'>Back to Home</Link>
    </div>
  );
}
