import React, { useEffect, useState } from "react";
import axios from "axios";
import { Event } from "../config/types";
import "./styles/DaySchedule.css";

interface DayScheduleProps {
  day: number;
}

const timeSlots = [
  { start: 480, end: 540 },
  { start: 540, end: 600 },
  { start: 600, end: 660 },
  { start: 660, end: 720 },
  { start: 720, end: 780 },
  { start: 780, end: 840 },
  { start: 840, end: 900 },
  { start: 900, end: 960 },
  { start: 960, end: 1020 },
  { start: 1020, end: 1080 },
];

const DaySchedule: React.FC<DayScheduleProps> = ({ day }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/event/all");
        const validEvents = response.data.filter(
          (event: Event) =>
            event.timeSlot !== null && event.timeSlot !== undefined
        );

        const dayEvents = validEvents.filter(
          (event: Event) => event.timeSlot.day === day
        );
        setEvents(dayEvents);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Could not fetch events. Please try again later.");
        setLoading(true);
      }
    };

    fetchEvents();
  }, [day]);

  if (loading) {
    return <div>Loading... if it takes too long try reloading page</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="day-schedule">
      <h2>Skema dag {day}</h2>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Tidspunkt</th>
            <th>Beskrivelse</th>
            <th>Disciplin</th>
            <th>Køn</th>
            <th>Aldersgruppe</th>
            <th>Bane</th>
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot) => {
            const eventsInSlot = events.filter(
              (event) => event.timeSlot.startTime === slot.start
            );
            return (
              <tr key={slot.start}>
                <td>{`${slot.start / 60}:00 - ${slot.end / 60}:00`}</td>
                {eventsInSlot.length > 0 ? (
                  eventsInSlot.map((event, index) => (
                    <React.Fragment key={index}>
                      <td>{event.description}</td>
                      <td>{event.discipline.name}</td>
                      <td>{event.gender ? "Kvinder" : "Mænd"}</td>
                      <td>{event.ageGroup.name}</td>
                      <td>{event.field.fieldType}</td>
                    </React.Fragment>
                  ))
                ) : (
                  <td colSpan={5}>No event scheduled</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DaySchedule;
