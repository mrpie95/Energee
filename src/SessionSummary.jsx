import { VStack, Heading, Button } from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function SessionSummary({ session, onBack }) {
  const data = session.entries.map((e) => ({ x: e.time, y: e.energy }));

  return (
    <VStack spacing={4} p={4}>
      <Heading size="md">Session Summary</Heading>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="x" label={{ value: "Seconds", position: "insideBottomRight", offset: -5 }} />
          <YAxis domain={[1, 10]} />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="y" stroke="#4CAF50" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <Button onClick={onBack}>Back to All Sessions</Button>
    </VStack>
  );
}
