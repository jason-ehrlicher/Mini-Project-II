import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import { formatDate } from "@fullcalendar/core";
import { Link } from "react-router-dom";

// Define the CalendarWidget functional component
const CalendarWidget = () => {
  const [events, setEvents] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Function to fetch event data from an API
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8082/api/events");
      const data = await response.json();
      if (response.ok) {
        setEvents(data);
      } else {
        console.error("Failed to fetch events:", data.message);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // useEffect hook to fetch event data when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // Render the CalendarWidget component
  return (
    <Box
      backgroundColor={colors.primary[400]}
      p="15px"
      mt={"30px"}
      maxHeight={"300px"}
      minHeight={"300px"}
    >
      <Link to="/calendar" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography
          variant="h4"
          style={{ marginBottom: "10px", textAlign: "center" }}
          sx={{
            "&:hover": {
              color: "#868dfb", 
            },
          }}
        >
          Upcoming Events
        </Typography>
      </Link>

      <Box sx={{ overflowY: "auto" }} maxHeight={"230px"} marginBottom={"30px"}>
        <List>
          {events.map((event) => (
            <ListItem
              key={event.id}
              sx={{
                backgroundColor: colors.greenAccent[500],
                margin: "10px 0",
                borderRadius: "2px",
              }}
            >
              <ListItemText
                primary={event.title}
                secondary={
                  <Typography>
                    {formatDate(event.start, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CalendarWidget;
