import express from "express";
import { Event } from "../models/eventsModel.js";

const router = express.Router();

// Route for Get All Events from database
router.get("/", async (request, response) => {
  const page = parseInt(request.query.page) || 1;
  const limit = parseInt(request.query.limit) || 10;
  const sortBy = request.query.sortBy || "title"; 
  const sortOrder = request.query.sortOrder || "asc"

  try {
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    const events = await Event.find({})
      .sort(sort) 
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const count = await Event.countDocuments();

    response.status(200).json({
      count: events.length,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: events,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

  
export default router;
