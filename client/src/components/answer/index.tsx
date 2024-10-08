'use client';
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_ANSWER_BY_ADMIN_USER } from "@/lib/graphql/queries/query";
import useAuth from "@/hooks/useAuth";

export default function Answers() {
  const { logout, adminUserId } = useAuth();

  const { data, loading, error } = useQuery(GET_ANSWER_BY_ADMIN_USER, {
    variables: { adminUserId },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.getQuestionWithAnswerCounts || data.getQuestionWithAnswerCounts.length === 0) {
    return <p>作成したアンケートはありません</p>;
  }
  console.log(data)

  return (
    <div>
      <ul>
        {data.getQuestionWithAnswerCounts.map((question) => (
          <li key={question.questionId}>
            <p>アンケートタイトル: {question.title}</p>
            <ul>
              {question.options.map((option) => (
                <li key={option.option_id}>
                  <p>{option.option_text}, 回答数: {option.count}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button onClick={logout}>ログアウト</button>
      <br />
      <Link href='/question'>新しいアンケートを作成する</Link>
      <br />
      <Link href='/'>ホームに戻る</Link>
    </div>
  );  
}
