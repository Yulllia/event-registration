import express from "express";
import { Register } from "../models/registerModel.js";
import mongoose from "mongoose";

const router = express.Router();

// Route for Save a new User
router.post("/:eventId", async (request, response) => {
  try {
    console.log(request.body);
    const { fullName, email, birthDate, source } = request.body.user;
    const eventId = request.params.eventId;

    if (!fullName || !email || !birthDate || !source || !eventId) {
      return response.status(400).send({
        message:
          "Please provide all required fields: full name, email, birthDate, source",
      });
    }

    // Check if source value is valid
    const validSources = ["social media", "friends", "found myself"];
    if (!validSources.includes(source)) {
      return response.status(400).send({
        message:
          "Invalid source value. Source must be one of: social media, friends, found myself",
      });
    }

    const newUser = {
      fullName,
      email,
      birthDate,
      source,
      eventId,
    };

    const user = await Register.create(newUser);
    return response.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All users from database by eventId
router.get("/:eventId", async (request, response) => {
  const eventId = request.params.eventId;
  const { q: searchString } = request.query;
  const allUserByEventId = await Register.find({ eventId });

  try {
    const result = await Register.find({
      eventId,
      $or: [
        { fullName: { $regex: searchString, $options: "i" } },
        { email: { $regex: searchString, $options: "i" } },
      ],
    });
    const aggregationResult = await aggregateRegistrationsByDay(eventId);

    return response.status(200).json({
      data: result,
      count: allUserByEventId.length,
      chart: aggregationResult.data,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

const aggregateRegistrationsByDay = async (eventId) => {
  try {
    const result = await Register.aggregate([
      {
        $match: {
          eventId: new mongoose.Types.ObjectId(eventId)
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const formattedResult = result.map((item) => ({
      day: item._id,
      count: item.count,
    }));

    return { data: formattedResult };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default router;
