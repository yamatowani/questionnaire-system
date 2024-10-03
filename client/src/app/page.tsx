"use client";
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

// GraphQLクエリを定義
const GET_ADMIN_USERS = gql`
  query {
    admin_users {
      id
      name
      email
      password_digest
      session_id
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

export default function Home() {
  const { data, loading, error } = useQuery<{ admin_users: AdminUser[] }>(GET_ADMIN_USERS, {
    fetchPolicy: 'network-only'
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Admin Users</h2>
      <ul>
        {data.admin_users.map((user) => (
          <li key={user.id}> {/* 例: emailをキーとして使用 */}
            Name: {user.name}, Password Digest: {user.password_digest}, Session ID: {user.session_id}
          </li>
        ))}
      </ul>
    </div>
  );
}
