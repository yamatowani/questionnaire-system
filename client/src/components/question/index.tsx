'use client';
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUESTIONS_BY_ADMIN_USER_ID } from "@/lib/graphql/queries/query";
import { Question } from "@/types/types";
import useAuth from "@/hooks/useAuth";

export default function Questions() {
  const { logout, adminUserId } = useAuth();

  const { data, loading, error } = useQuery(GET_ALL_QUESTIONS_BY_ADMIN_USER_ID, {
    variables: { adminUserId },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.questions || data.questions.length === 0) {
    return <p>作成したアンケートはありません</p>;
  }

  return (
    <div>
      <h2>作成したアンケート一覧</h2>
      <ul>
        {data.questions.map((question: Question) => (
          <li key={question.id}>
            <Link href={`/question/${question.url}`}>タイトル: {question.title}</Link>
          </li>
        ))}
      </ul>
      <Link href='/answer'>アンケートの結果を見る</Link>
      <br />
      <button onClick={logout}>ログアウト</button>
      <br />
      <Link href='/question'>新しいアンケートを作成する</Link>
    </div>
  );
}
