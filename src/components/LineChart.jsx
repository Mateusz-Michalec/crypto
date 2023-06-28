import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { Stack } from "react-bootstrap";

export default function LineChart({ coinHistory, currentPrice, coinName }) {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Cena w $",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <section className="mt-5">
      <h4 className="text-center">Wykres cenowy</h4>
      <Stack
        direction="horizontal"
        className="justify-content-between fw-bold mb-3"
      >
        <span
          className={`${
            coinHistory?.data?.change < 0 ? "text-danger" : "text-success"
          }`}
        >
          {coinHistory?.data?.change}%
        </span>
        <span>Obecna cena: {currentPrice} $</span>
      </Stack>
      <Line data={data} options={options} className="w-100" />
    </section>
  );
}
