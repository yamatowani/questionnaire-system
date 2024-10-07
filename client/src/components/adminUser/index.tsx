"use client";
import Link from "next/link";
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

const GET_ADMIN_USERS = gql`
  query {
    admin_users {
      id
      name
      email
      password_digest
    }
  }
`;

interface AdminUser {
  id: string,
  name: string;
  email: string;
  password_digest: string;
  session_id: string;
}

export default function AdminUser() {
  const { data, loading, error } = useQuery<{ admin_users: AdminUser[] }>(GET_ADMIN_USERS, {
    fetchPolicy: 'network-only'
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.admin_users) {
    return <p>No admin users found.</p>; 
  }


  return (
    <div>
      <h2>Admin Users</h2>
      <ul>
        {data.admin_users.map((user) => (
          <li key={user.id}>
            Name: {user.name}, Password Digest: {user.password_digest}
          </li>
        ))}
      </ul>
      <Link href='/admin_user'>Create New Admin User</Link>
      <br />
      <Link href='/question'>Create New Question</Link>
    </div>
  );
}
