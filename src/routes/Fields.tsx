import React, { useState } from "react";
import FieldSchedule from "../components/FieldSchedule"; // Adjust the path as needed

const Fields: React.FC = () => {
  const [selectedField, setSelectedField] = useState<string>("Løb");
  const [selectedDay, setSelectedDay] = useState<number>(1);

  return (
    <div>
      <h1>Plan for baner</h1>

      <div>
        <label>Vælg bane: </label>
        <select
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
        >
          <option value="Løb">Løb</option>
          <option value="Længdespring">Længdespring</option>
          <option value="Højdespring">Højdespring</option>
          <option value="Kast">Kast</option>
          <option value="Svømmepøl 1">Svømmepøl 1</option>
          <option value="Svømmepøl 2">Svømmepøl 2</option>
          <option value="Svømmepøl 3">Svømmepøl 3</option>
          <option value="Breakdancecirkel">Breakdancecirkel</option>
        </select>
      </div>

      <div>
        <label>Vælg dag: </label>
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(Number(e.target.value))}
        >
          <option value={1}>Dag 1</option>
          <option value={2}>Dag 2</option>
          <option value={3}>Dag 3</option>
          <option value={4}>Dag 4</option>
          <option value={5}>Dag 5</option>
        </select>
      </div>
      {/* @ts-ignore */}
      <FieldSchedule day={selectedDay} field={selectedField} />
    </div>
  );
};

export default Fields;
