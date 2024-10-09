'use client';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AnswersChart({ data }) {
  if (!data) {
    return <p>データが存在しません</p>;
  }

  return (
    <div>
      {data.map((question) => {
        const labels = question.options.map((option) => option.option_text);

        const ChartData = {
          labels,
          datasets: [
            {
              label: `アンケートID: ${question.questionId} - ${question.title}`,
              data: question.options.map((option) => option.count),
              backgroundColor: "#1976d2",
              borderColor: "#1976d2",
              borderWidth: 1,
            },
          ],
        };

        return (
          <div key={question.questionId} style={{ width: "400px" }}>
            <h3>{question.title}</h3>
            <Bar
              height={100}
              width={100}
              data={ChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                },
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
