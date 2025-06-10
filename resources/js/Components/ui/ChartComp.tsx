import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CardHeader, CardTitle } from "./card";

// Contoh data, ganti dengan data dari props jika perlu
const data = [
  { year: 2020, projek: 50 },
  { year: 2021, projek: 75 },
  { year: 2022, projek: 90 },
  { year: 2023, projek: 65 },
  { year: 2024, projek: 120 },
  { year: 2025, projek: 150 },
];

export function ChartComp() {
  return (
    <>
      <CardHeader>
        <CardTitle>GrafikProjek pertahunnya</CardTitle>
      </CardHeader>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="projek"
            name="Tahun"
            stroke="#4285F4"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}