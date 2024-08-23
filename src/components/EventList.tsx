import React, { useEffect, useState } from "react";
import axios from "axios";

interface Event {
  id: number;
  disciplineID: {
    id: number;
    name: string;
    description: string;
  };
  gender: boolean;
  ageGroup: {
    id: number;
    name: string;
    description: string;
  };
  date: string;
  startTime: string;
  field: {
    id: number;
    fieldType: string;
  };
  description: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/event/all");
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Could not fetch events. Please try again later.");
        setLoading(true);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Events List</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.description}</h3>
            <p>Discipline: {event.disciplineID.name}</p>
            <p>Gender: {event.gender ? "Female" : "Male"}</p>
            <p>Age Group: {event.ageGroup.name}</p>
            <p>Date: {event.date}</p>
            <p>Start Time: {event.startTime}</p>
            <p>Field: {event.field.fieldType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
