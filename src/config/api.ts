import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const events = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/event/all`);
    console.log("events", response.data);
    return response.data;
  } catch (error) {
    console.error("Fejl ved hentning af begivenheder", error);
    throw error;
  }
};

export const disciplines = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/discipline`);
    console.log("discipliner", response.data);

    return response.data;
  } catch (error) {
    console.error("Kunne ikke læse discipliner", error);
    throw error;
  }
};

export const ageGroups = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/ages`);
    console.log("aldersgrupper", response.data);

    return response.data;
  } catch (error) {
    console.error("Kunne ikke indlæse aldersgrupper", error);
    throw error;
  }
};

export const fields = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/field/all`);
    console.log("baner", response.data);

    return response.data;
  } catch (error) {
    console.error("Kunne ikke indlæse baner", error);
    throw error;
  }
};

export const timeSlots = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/timeslots`);
    console.log("tidspunkter", response.data);
    return response.data;
  } catch (error) {
    console.error("Kunne ikke indlæse tidspunkter", error);
    throw error;
  }
};
