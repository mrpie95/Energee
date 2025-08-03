// SessionSummary.jsx
import React from "react";
import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function SessionSummary({ data, onHome }) {
  if (!data) return <Text>No data available.</Text>;

  const chartData = data.entries.map((entry) => ({
    time: Math.round((entry.time - data.startTime) / 60000),
    energy: entry.energy,
  }));

  return (
    <Box p={4}>
      <Heading mb={4}>Session Summary</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          width={350}
          height={200}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="time"
            label={{
              value: "Minutes",
              position: "insideBottomRight",
              offset: 0,
            }}
          />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Bar dataKey="energy" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
      <VStack mt={4}>
        <Button onClick={onHome}>Back to All Sessions</Button>
      </VStack>
    </Box>
  );
}
