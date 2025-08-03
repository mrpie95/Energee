// SessionScreen.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  VStack,
  Text,
  HStack,
} from "@chakra-ui/react";

function getColor(energy) {
  const red = Math.round(255 - (energy / 10) * 255);
  const green = Math.round((energy / 10) * 255);
  return `rgb(${red}, ${green}, 0)`;
}

export default function SessionScreen({ onEnd }) {
  const [energy, setEnergy] = useState(5);
  const [entries, setEntries] = useState([]);
  const [startTime] = useState(Date.now());

  const handleLog = () => {
    setEntries([...entries, { time: Date.now(), energy }]);
  };

  const handleEnd = () => {
    const sessions = JSON.parse(localStorage.getItem("sessions") || "[]");
    const newSession = { startTime, entries };
    localStorage.setItem("sessions", JSON.stringify([...sessions, newSession]));
    onEnd(newSession);
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Session In Progress</Heading>
      <VStack mt={4} spacing={2} align="start">
        {entries.map((entry, index) => {
          // shows the logged entries
          const minutes = Math.round((entry.time - startTime) / 60000);
          const energy = entry.energy;

          const hue = Math.round((energy / 10) * 120); // 0 = red, 120 = green
          const bg = `hsl(${hue}, 70%, 50%)`;
          const width = `${(energy / 10) * 100}%`;

          return (
            <HStack key={index} w="100%" maxW="400px" spacing={2}>
              <Text fontSize="sm" whiteSpace="nowrap">
                {new Date(entry.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
              </Text>
              <Box
                w={width}
                h="12px"
                bg={bg}
                borderRadius="md"
                flexShrink={0}
              />
              <Text fontSize="sm" flexGrow={1}>
                {energy}
              </Text>
            </HStack>
          );
        })}
      </VStack>

      <VStack spacing={4}>
        <Text>Energy: {energy}</Text>
        <Slider value={energy} onChange={setEnergy} min={0} max={10} step={1}>
          <SliderTrack>
            <SliderFilledTrack bg={getColor(energy)} />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Button onClick={handleLog}>Log Energy</Button>
        <Button onClick={handleEnd} colorScheme="red">
          End Session
        </Button>
      </VStack>
    </Box>
  );
}
