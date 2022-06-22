import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

interface LineChartProps {}

const LineChart: React.FC<LineChartProps> = () => {
  const [weeks, setweeks] = useState<Date[]>([]);
  useEffect(() => {
    var days_array: Date[] = [];
    for (let i = 0; i < 7; i++) {
      let today = new Date();
      today.setDate(today.getDate() - i);
      if (today.getDay() !== 0 && today.getDay() !== 6) days_array.push(today);
    }
    days_array.reverse();
    setweeks(days_array);
    return () => {
      setweeks([]);
    };
  }, []);

  const Rounded = (value: number): number => {
    return Math.round(value * 100) / 100;
  };

  return (
    <Wrapper>
      <Line
        color="tomato"
        data={{
          labels: weeks.map((date) =>
            date.toLocaleDateString("en-ID", { weekday: "short", year: "2-digit", month: "short", day: "numeric" })
          ),
          datasets: [
            {
              label: "USD",
              data: [14664.96, 14598.63, 14503.16, 14534.31, 14536.32],
              backgroundColor: "#C06C84",
              borderColor: "#C06C84",
              borderWidth: 2,
              tension: 0.35,
              fill: false,
            },
            {
              label: "AUD",
              data: [10542.64, 10500.79, 10532.19, 10511.21, 10447.25],
              backgroundColor: "#8FC0A9",
              borderColor: "#8FC0A9",
              borderWidth: 2,
              tension: 0.35,
              fill: false,
            },
            {
              label: "JPY",
              data: [
                Rounded(11463.27 / 100),
                Rounded(11238.36 / 100),
                Rounded(11157.99 / 100),
                Rounded(11116.96 / 100),
                Rounded(10950.15 / 100),
              ],
              backgroundColor: "#355C7D",
              borderColor: "#355C7D",
              borderWidth: 2,
              tension: 0.35,
              fill: false,
            },
          ],
        }}
        options={{
          maintainAspectRatio: true,
          scales: { y: { beginAtZero: true } },
          backgroundColor: "#ddd",
          responsive: true,
        }}
      />
    </Wrapper>
  );
};
export default LineChart;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
