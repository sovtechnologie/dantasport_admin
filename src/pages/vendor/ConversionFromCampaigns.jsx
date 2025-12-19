import React from "react";
import { Card, Container } from "react-bootstrap";
import "../../stylesheet/vendor/dashboard.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import "../../stylesheet/vendor/dashboard.css"; // Add your CSS here

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ConversionFromCampaigns() {
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Promo code A",
        data: [330, 300, 250, 180, 210, 290, 330, 310, 280, 230, 150],
        borderColor: "#1d69d4",
        backgroundColor: "#1d69d4",
        tension: 0.45,
        borderWidth: 4,
        pointRadius: 0,
      },
      {
        label: "Promo code B",
        data: [260, 220, 170, 140, 200, 330, 360, 340, 300, 220, 140],
        borderColor: "#ff7f0e",
        backgroundColor: "#ff7f0e",
        tension: 0.45,
        borderWidth: 4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 30,
          font: {
            size: 14,
            weight: "300",
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 100 },
        grid: {
          display: true,
          color: "#eee",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    
    <>
    <Card className="chart-card shadow-sm border-0 p-3" style={{ borderRadius: "12px" }}>
        <h4 className="section_heading">Conversion From Campaigns</h4>
        <div className="chart-container" style={{ height: "300px" }}>
          <Line data={data} options={options} />
        </div>
      </Card>
    </>
  );
}
