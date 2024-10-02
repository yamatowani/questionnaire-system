// app/page.tsx
import { gql } from '@apollo/client';
import client from '../../lib/apollo';

const GET_ADMIN_USERS = gql`
  query {
    admin_users {
      name
      password_digest
      session_id
    }
  }
`;

export default async function Home() {
  const { data } = await client.query({
    query: GET_ADMIN_USERS,
  });

  return (
    <div>
      <h1>Admin Users</h1>
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
