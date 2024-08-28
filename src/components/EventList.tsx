import React, { useEffect, useState } from "react";
import axios from "axios";
import { Event } from "../config/types";

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
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.description}</h3>
            <p>Disciplin: {event.discipline.name}</p>
            <p>
              Køn og aldersgruppe: {event.gender ? "Kvinder" : "Mænd"}{" "}
              {event.ageGroup.name}
            </p>
            <p>
              Hvornår: Dag {event.timeSlot.day} kl {event.timeSlot.startTime}
            </p>
            <p>Varighed: {event.discipline.duration} minutter</p>
            <p>Field: {event.field.fieldType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
