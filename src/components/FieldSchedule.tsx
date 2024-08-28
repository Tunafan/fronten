import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Event } from "../config/types";
import type { FieldSchedule } from "../config/types";

const FieldSchedule: React.FC<FieldSchedule> = ({ day, field }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/event/all");
        const filteredEvents = response.data.filter(
          (event: Event) =>
            event.timeSlot.day === day && event.field.fieldType === field
        );
        setEvents(filteredEvents);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Could not fetch events. Please try again later.");
        setLoading(true);
      }
    };

    fetchEvents();
  }, [day, field]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const start = 480 + i * 60;
    const end = start + 60;
    return { start, end };
  });

  return (
    <div>
      <h2>
        Skema for {field} på dag {day}
      </h2>
      <table>
        <thead>
          <tr>
            <th>Tidspunkt</th>
            <th>Beskrivelse</th>
            <th>Disciplin</th>
            <th>Køn</th>
            <th>Aldersgruppe</th>
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot) => {
            const event = events.find(
              (event) => event.timeSlot.startTime === slot.start
            );
            return (
              <tr key={slot.start}>
                <td>{`${slot.start / 60}:00 - ${slot.end / 60}:00`}</td>
                {event ? (
                  <>
                    <td>{event.description}</td>
                    <td>{event.discipline.name}</td>
                    <td>{event.gender ? "Kvinder" : "Mænd"}</td>
                    <td>{event.ageGroup.name}</td>
                  </>
                ) : (
                  <td colSpan={4}>No event scheduled</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FieldSchedule;
