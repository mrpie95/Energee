import { useState, useRef } from 'react'
import {
  Box, Button, Heading, Slider, SliderTrack, SliderFilledTrack, SliderThumb,
  Text, VStack, Divider, List, ListItem
} from '@chakra-ui/react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function App() {
  const [screen, setScreen] = useState("home")
  const [startTime, setStartTime] = useState(null)
  const [entries, setEntries] = useState([])
  const [energy, setEnergy] = useState(5)
  const [sessions, setSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)
  const sessionRef = useRef(null)

  const loadSessions = () => {
    const saved = JSON.parse(localStorage.getItem("sessions") || "[]")
    setSessions(saved)
    setScreen("sessions")
  }

  const startSession = () => {
    const now = Date.now()
    setStartTime(now)
    sessionRef.current = { started: now, entries: [] }
    setEntries([])
    setScreen("session")
  }

  const logEnergy = () => {
    const now = Date.now()
    const elapsed = Math.floor((now - startTime) / 1000)
    const newEntry = { time: elapsed, energy }
    sessionRef.current.entries.push(newEntry)
    setEntries([...sessionRef.current.entries])
  }

  const endSession = () => {
    const saved = JSON.parse(localStorage.getItem("sessions") || "[]")
    saved.push({
      started: new Date(sessionRef.current.started).toISOString(),
      entries: sessionRef.current.entries
    })
    localStorage.setItem("sessions", JSON.stringify(saved))
    setScreen("summary")
  }

  const goHome = () => {
    setScreen("home")
    setEntries([])
    setEnergy(5)
    sessionRef.current = null
    setStartTime(null)
    setSelectedSession(null)
  }

  const viewSession = (session) => {
    setSelectedSession(session)
    setScreen("view")
  }

  return (
    <Box p={4} bg="gray.900" minH="100vh" color="white">
      {screen === "home" && (
        <VStack spacing={6}>
          <Heading size="lg">Energy Tracker</Heading>
          <Text>Track how your energy changes during a focused session.</Text>
          <Button colorScheme="blue" onClick={startSession}>Start New Session</Button>
          <Button colorScheme="gray" onClick={loadSessions}>View Past Sessions</Button>
        </VStack>
      )}

      {screen === "session" && (
        <VStack spacing={4} align="stretch">
          <Heading size="md">Session In Progress</Heading>
          <Text>Time Elapsed: {Math.floor((Date.now() - startTime) / 1000)}s</Text>
          <Text>Energy: {energy}</Text>
          <Slider min={0} max={10} step={1} value={energy} onChange={setEnergy}>
            <SliderTrack><SliderFilledTrack /></SliderTrack>
            <SliderThumb />
          </Slider>
          <Button colorScheme="green" onClick={logEnergy}>Log Energy</Button>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={entries}>
              <XAxis dataKey="time" tickFormatter={t => `${t}s`} />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line type="monotone" dataKey="energy" stroke="#4CAF50" />
            </LineChart>
          </ResponsiveContainer>
          <Divider />
          <Button colorScheme="red" onClick={endSession}>End Session</Button>
        </VStack>
      )}

      {screen === "summary" && (
        <VStack spacing={4}>
          <Heading size="md">Session Summary</Heading>
          <Text>Logged {entries.length} entries.</Text>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={entries}>
              <XAxis dataKey="time" tickFormatter={t => `${t}s`} />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line type="monotone" dataKey="energy" stroke="#4CAF50" />
            </LineChart>
          </ResponsiveContainer>
          <Button onClick={goHome}>Start New Session</Button>
        </VStack>
      )}

      {screen === "sessions" && (
        <VStack spacing={4} align="stretch">
          <Heading size="md">Past Sessions</Heading>
          {sessions.length === 0 ? (
            <Text>No sessions recorded yet.</Text>
          ) : (
            <List spacing={3}>
              {sessions.map((s, i) => (
                <ListItem
                  key={i}
                  border="1px solid #4CAF50"
                  borderRadius="md"
                  p={2}
                  _hover={{ bg: "gray.700", cursor: "pointer" }}
                  onClick={() => viewSession(s)}
                >
                  <Text><strong>{new Date(s.started).toLocaleString()}</strong></Text>
                  <Text fontSize="sm">{s.entries.length} energy points</Text>
                </ListItem>
              ))}
            </List>
          )}
          <Button mt={4} onClick={goHome}>Back to Home</Button>
        </VStack>
      )}

      {screen === "view" && selectedSession && (
        <VStack spacing={4}>
          <Heading size="md">Session from {new Date(selectedSession.started).toLocaleString()}</Heading>
          <Text>{selectedSession.entries.length} energy entries</Text>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={selectedSession.entries}>
              <XAxis dataKey="time" tickFormatter={t => `${t}s`} />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line type="monotone" dataKey="energy" stroke="#4CAF50" />
            </LineChart>
          </ResponsiveContainer>
          <Button onClick={goHome}>Back to Home</Button>
        </VStack>
      )}
    </Box>
  )
}
