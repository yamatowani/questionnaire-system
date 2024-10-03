"use client";
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

const GET_ADMIN_USERS = gql`
  query {
    admin_users {
      name
      password_digest
      session_id
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_ADMIN_USERS, {
    fetchPolicy: 'network-only'
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;



  return (
    <div>
      <h2>Admin Users</h2>
      <ul>
        {data.admin_users.map((user: any) => (
          <li key={user.session_id}>
            Name: {user.name}, Password Digest: {user.password_digest}, Session ID: {user.session_id}
          </li>
        ))}
      </ul>
    </div>
  );
}
