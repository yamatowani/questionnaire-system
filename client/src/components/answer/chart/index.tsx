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

export default function AnswersChart({ surveyResult }) {
  if (!surveyResult) {
    return <p>データが存在しません</p>;
  }

  return (
    <div>
      {surveyResult.questionResults.map((question) => {
        const labels = question.answerCounts.map((result) => result.optionText);
        const dataValues = question.answerCounts.map((result) => result.count);

        const chartData = {
          labels,
          datasets: [
            {
              label: `質問ID: ${question.questionId} - ${question.questionText}`,
              data: dataValues,
              backgroundColor: "#1976d2",
              borderColor: "#1976d2",
              borderWidth: 1,
            },
          ],
        };

        const filteredOtherResponses = question.otherResponses.filter(response => response.trim() !== "");

        return (
          <div key={question.questionId} style={{ margin: "20px 0", width: "100%" }}>
            <h3>{question.questionText}</h3>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => {
                        return `${tooltipItem.label}: ${tooltipItem.raw} 回答`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      stepSize: 1,
                    },
                  },
                  y: {
                    grid: {
                      display: true,
                    },
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
            />

            {filteredOtherResponses.length > 0 && (
              <div style={{ marginTop: "10px" }}>
                <h4>その他の回答:</h4>
                <ul>
                  {filteredOtherResponses.map((response, index) => (
                    <li key={index}>{response}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
