import { useState, useEffect } from "react";
import { Box, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, VStack, HStack } from "@chakra-ui/react";
import { energyToColor } from "./utils";

export default function SessionScreen({ onEnd }) {
  const [energy, setEnergy] = useState(5);
  const [entries, setEntries] = useState([]);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTick((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const logEnergy = () => {
    const now = Date.now();
    const seconds = Math.floor((now - startTime) / 1000);
    setEntries([...entries, { time: seconds, energy }]);
  };

const endSession = () => {
  const session = { startTime, entries };

  // Load existing sessions
  const existing = JSON.parse(localStorage.getItem("sessions") || "[]");

  // Save updated session list
  localStorage.setItem("sessions", JSON.stringify([...existing, session]));

  onEnd(session);
};

  return (
    <VStack spacing={4} p={4}>
      <Text fontSize="xl">How do you feel?</Text>
      <Slider min={1} max={10} value={energy} onChange={setEnergy}>
        <SliderTrack>
          <SliderFilledTrack bg={energyToColor(energy)} />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Button onClick={logEnergy}>Log</Button>
      <Button colorScheme="red" onClick={endSession}>
        End Session
      </Button>
      <VStack spacing={2} align="stretch" width="100%">
        {entries.map(({ time, energy }, i) => (
          <HStack key={i} justify="space-between">
            <Text w="50px">{time}s</Text>
            <Box
              h="12px"
              width={`${(energy / 10) * 100}%`}
              bg={energyToColor(energy)}
              borderRadius="md"
            />
            <Text w="30px" textAlign="right">{energy}</Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
}
