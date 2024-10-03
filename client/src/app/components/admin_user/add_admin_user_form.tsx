'use client';
import { useMutation } from "@apollo/client";
import { ADD_NEW_ADMIN_USER } from "@/lib/graphql/mutations/mutations";
import { NewAdminUserInput } from "@/types/types";
import { useState } from "react";
import Link from "next/link";


export default function AddAdminUserForm() {
  const [formData, setFormData] = useState<NewAdminUserInput>({
    name: '',
    email: '',
    password_digest: '',
  });

  const [addNewAdminUser, { loading, error }] = useMutation(ADD_NEW_ADMIN_USER, {
    variables: { newAdminUserData: formData },
    onCompleted: () => {
      alert('Admin User added Successfully!');
      setFormData({ name: '', email: '', password_digest: '' });
    },
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
     <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
      <input type="password" name="password_digest" placeholder="Password" onChange={handleChange} value={formData.password_digest} required />
      <button type="submit" disabled={loading}>Create Admin User</button>
      {error && <p>Error: {error.message}</p>}
      </form>
      <Link href='/'>Back Top</Link>
    </div>
  )
}
