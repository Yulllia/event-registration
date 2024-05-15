import Agenda from "agenda";
import { Event } from "../models/eventsModel.js";
import dotenv from 'dotenv';
dotenv.config();

const mongoDBURL = process.env.MONGODB_URL;
const url = process.env.API_URL;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
  },
};


//add agenda every 1 hour and save to database
const agenda = new Agenda({ db: { address: mongoDBURL, collection: "agendaJobs" } });

agenda.define("eventSaveDatabase", async () => {
  try {
    const response = await fetch(url, options);
      if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const result = await response.json();
    for (const event of result.events) {
      await Event.create({
        title: event.summary || "title",
        description: event.description || "description",
        eventDate: event.dtstart,
        organizer: event.location,
      });
    }
  } catch (error) {
    console.error("Error fetching or storing events:", error);
  }
});

export default agenda;