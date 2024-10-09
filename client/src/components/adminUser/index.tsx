"use client";
import Link from "next/link";
import { useQuery } from '@apollo/client';
import { GET_ADMIN_USERS } from "@/lib/graphql/queries/query";
import { AdminUser } from "@/types/types";

export default function AdminUsers() {
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
            Name: {user.name}, Password Digest: {user.password}
          </li>
        ))}
      </ul>
      <Link href='/admin_user'>Create New Admin User</Link>
      <br />
      <Link href='/question'>Create New Question</Link>
    </div>
  );
}
