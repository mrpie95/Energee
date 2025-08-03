
// AllSessions.jsx
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';

export default function AllSessions() {
  const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');

  return (
    <Box p={4}>
      <Heading mb={4}>All Sessions</Heading>
      <List spacing={4}>
        {sessions.map((session, i) => (
          <ListItem key={i} borderBottom="1px solid #444" pb={2}>
            <Text fontSize="sm">Started: {new Date(session.started).toLocaleString()}</Text>
            <Text fontSize="sm">Entries: {session.entries.length}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
