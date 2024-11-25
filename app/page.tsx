"use client";

import { useChat } from "ai/react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  CircularProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SendIcon from "@mui/icons-material/Send";

interface FlightObj {
  airline_logo: string;
  price: string | number;
  departure_airport_name: string;
  departure_airport_time: string;
  arrival_airport_name: string;
  arrival_airport_time: string;
}

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

export default function Home() {
  const { messages, handleSubmit, input, handleInputChange, isLoading } = useChat({
    api: "http://10.1.1.144:2325/chat",
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" mb={4}>
            <FlightTakeoffIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
            <Typography variant="h4" component="h1">
              Flight Recommendations
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <TextField
                fullWidth
                id="input"
                name="prompt"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about flights (e.g., 'Show flights from Paris to London')"
                variant="outlined"
                disabled={isLoading}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search Flights"}
            </Button>
          </form>

          <Box mt={4}>
            {messages.map((message, i) =>
              message.role === "assistant" ? (
                <Box key={`response_${i}`} mt={3}>
                  {JSON.parse(message.content)["flights"] ? (
                    <Grid container spacing={3}>
                      {JSON.parse(message.content).flights.map(
                        (flight: FlightObj, _: number) => (
                          <Grid item xs={12} key={`flight_${_}_${i}`}>
                            <Card variant="outlined">
                              <CardContent>
                                <Box display="flex" alignItems="center" mb={2}>
                                  <Avatar
                                    src={flight.airline_logo}
                                    alt="Airline logo"
                                    sx={{ width: 48, height: 48, mr: 2 }}
                                  />
                                  <Typography variant="h6" color="primary">
                                    USD {flight.price}
                                  </Typography>
                                </Box>
                                <Grid container spacing={2}>
                                  <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                      Departure
                                    </Typography>
                                    <Typography>
                                      {flight.departure_airport_name}
                                    </Typography>
                                    <Typography color="text.secondary">
                                      {flight.departure_airport_time}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                      Arrival
                                    </Typography>
                                    <Typography>
                                      {flight.arrival_airport_name}
                                    </Typography>
                                    <Typography color="text.secondary">
                                      {flight.arrival_airport_time}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </Grid>
                        )
                      )}
                    </Grid>
                  ) : null}
                </Box>
              ) : (
                <Box
                  key={message.content + i}
                  mt={3}
                  p={2}
                  bgcolor="grey.100"
                  borderRadius={1}
                >
                  <Typography>{message.content}</Typography>
                </Box>
              )
            )}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
