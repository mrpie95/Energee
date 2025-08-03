import React from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Heading,
  HStack,
} from "@chakra-ui/react";

export default function SessionsList({ onStart }) {
  const sessions = JSON.parse(localStorage.getItem("sessions") || "[]");

  return (
    <Box p={4}>
      <Heading mb={4}>Past Sessions</Heading>
      <VStack spacing={3} align="stretch">
        {sessions.map((session, index) => (
          <HStack
            key={index}
            justify="space-between"
            p={3}
            borderWidth="1px"
            borderRadius="md"
            _hover={{ bg: "gray.700", cursor: "pointer" }}
          >
            <Text>Session {index + 1}</Text>
            <Text>{session.entries.length} entries</Text>
          </HStack>
        ))}
        <Button colorScheme="green" onClick={onStart}>
          Start New Session
        </Button>
      </VStack>
    </Box>
  );
}
