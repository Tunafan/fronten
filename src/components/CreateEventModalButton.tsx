import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { disciplines, ageGroups, fields, timeSlots } from "../config/api";
import "./styles/CreateEventModalButton.css";
import { AgeGroup, Discipline, Field, TimeSlot } from "../config/types";
import { fieldDisciplinesMapping } from "../config/fieldDisciplinesMapping";

Modal.setAppElement("#root");

const CreateEventModalButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [disciplineOptions, setDisciplineOptions] = useState<Discipline[]>([]);
  const [ageGroupOptions, setAgeGroupOptions] = useState<AgeGroup[]>([]);
  const [fieldOptions, setFieldOptions] = useState<Field[]>([]);
  const [timeSlotOptions, setTimeSlotOptions] = useState<TimeSlot[]>([]);
  const [filteredFieldOptions, setFilteredFieldOptions] = useState<Field[]>([]);

  const openModal = () => {
    setIsModalOpen(true);
    fetchFormData();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchFormData = async () => {
    try {
      const [disciplinesData, ageGroupsData, fieldsData, timeSlotsData] =
        await Promise.all([disciplines(), ageGroups(), fields(), timeSlots()]);
      setDisciplineOptions(disciplinesData);
      setAgeGroupOptions(ageGroupsData);
      setFieldOptions(fieldsData);
      setTimeSlotOptions(timeSlotsData);
    } catch (error) {
      console.error(
        "Det lykkedes ikke at hente infoen til at udfylde formularen",
        error
      );
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return `${hours.toString().padStart(2, "0")}.00`;
  };

  const handleDisciplineChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDisciplineId = Number(event.target.value);
    const allowedFields = Object.keys(fieldDisciplinesMapping).filter((field) =>
      fieldDisciplinesMapping[field].includes(selectedDisciplineId)
    );
    const filteredFields = fieldOptions.filter((field) =>
      allowedFields.includes(field.fieldType)
    );
    setFilteredFieldOptions(filteredFields);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const newEvent = {
      description: formData.get("description") as string,
      discipline: Number(formData.get("discipline")), // Sends discipline ID as number
      gender: formData.get("gender") === "true", // Sends gender as boolean
      ageGroup: Number(formData.get("ageGroup")), // Sends age group ID as number
      timeSlot: Number(formData.get("timeSlot")), // Sends time slot ID as number
      field: Number(formData.get("field")), // Sends field ID as number
    };
    console.log("newEvent", newEvent);

    try {
      await axios.post("http://localhost:8080/event/create", newEvent);
      closeModal();
      // reload siden?
    } catch (error) {
      console.error("Failed to create event", error);
    }
  };

  return (
    <div>
      <button onClick={openModal}>Indtast ny begivenhed</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Opret ny"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Ny begivenhed</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Beskrivelse</label>
            <input type="text" name="description" required />
          </div>
          <div>
            <label>Disciplin</label>
            <select
              name="discipline"
              required
              onChange={handleDisciplineChange}
            >
              {disciplineOptions.map((discipline) => (
                <option key={discipline.id} value={discipline.id}>
                  {discipline.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Køn</label>
            <select name="gender" required>
              <option value="true">Kvinder</option>
              <option value="false">Mænd</option>
            </select>
          </div>
          <div>
            <label>Aldersgruppe</label>
            <select name="ageGroup" required>
              {ageGroupOptions.map((ageGroup) => (
                <option key={ageGroup.id} value={ageGroup.id}>
                  {ageGroup.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Bane</label>
            <select name="field" required>
              {filteredFieldOptions.map((field) => (
                <option key={field.id} value={field.id}>
                  {field.fieldType}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Tidspunkt</label>
            <select name="timeSlot" required>
              {timeSlotOptions.map((timeSlot) => (
                <option key={timeSlot.id} value={timeSlot.id}>
                  {`Dag ${timeSlot.day} ${timeSlot.startTime / 60}-${formatTime(
                    timeSlot.endTime
                  )}`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit">Opret</button>
            <button type="button" onClick={closeModal}>
              Fortryd
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreateEventModalButton;
