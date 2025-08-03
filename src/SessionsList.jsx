// SessionsList.jsx
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import React from "react";
import { Box, Button, VStack, Text, Heading, HStack } from "@chakra-ui/react";

export default function SessionsList({ onStart, onSelectSession }) {
  const sessions = JSON.parse(localStorage.getItem("sessions") || "[]");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cancelRef = useRef();

  const handleDeleteAll = () => {
    localStorage.removeItem("sessions");
    window.location.reload(); // simple way to refresh list
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Past Sessions</Heading>

      <VStack spacing={3} align="stretch">
        <Button colorScheme="green" onClick={onStart}>
          Start New Session
        </Button>
        {sessions.map((session, index) => (
          <HStack
            key={index}
            justify="space-between"
            p={3}
            borderWidth="1px"
            borderRadius="md"
            onClick={() =>
              onSelectSession({
                startTime: session.startTime,
                entries: session.entries,
              })
            }
            _hover={{ bg: "gray.700", cursor: "pointer" }}
          >
            <Text>Session {index + 1}</Text>
            <Text>{session.entries.length} entries</Text>
          </HStack>
        ))}

        <Button colorScheme="red" onClick={() => setIsDialogOpen(true)}>
          Delete All Sessions
        </Button>

        <AlertDialog
          isOpen={isDialogOpen}
          leastDestructiveRef={cancelRef}
          onClose={() => setIsDialogOpen(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete All Sessions
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? This will permanently delete all saved sessions.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDeleteAll} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </VStack>
    </Box>
  );
}
