export interface Discipline {
  id: number;
  name: string;
  duration: number;
}

export interface AgeGroup {
  id: number;
  name: string;
  description: string;
}

export interface TimeSlot {
  id: number;
  day: number;
  startTime: number;
  endTime: number;
}

export interface Field {
  id: number;
  fieldType: string;
  allowedDisciplines: Discipline[];
}

export interface Event {
  id: number;
  discipline: Discipline;
  gender: boolean;
  ageGroup: AgeGroup;
  timeSlot: TimeSlot;
  field: Field;
  description: string;
}

export interface DaySchedule {
  day: number;
}

export interface FieldSchedule {
  day: number;
  field: string;
}
