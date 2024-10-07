'use client';
import Link from "next/link";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUESTIONS } from "@/lib/graphql/queries/query";
import { Question } from "@/types/types";

export default function Questions() {
  const { data, loading, error } = useQuery<{ questions: Question[] }>(GET_ALL_QUESTIONS, {
    fetchPolicy: "network-only"
  });
  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.questions) {
    return <p>作成したアンケートはありません</p>; 
  }


  return (
    <div>
      <h2>作成したアンケート一覧</h2>
      <ul>
        {data.questions.map((question) => (
          <li key={question.id}>
            <Link href={'/question/' + question.url }>タイトル: {question.title}</Link>
          </li>
        ))}
      </ul>
      <br />
      <Link href='/question'>新しいアンケートを作成する</Link>
    </div>
  );
}
