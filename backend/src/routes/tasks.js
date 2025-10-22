import express from "express";
// import { authenticate, authorize } from "../middleware/auth.js";
import Task from "../models/Task.js";
import Application from "../models/Application.js";
import SQIPic from "../models/SQIPic.js";
import SupportType from "../models/SupportType.js";

const router = express.Router();

// Hanya SQI yang bisa melihat seluruh task
// router.get("/", authenticate, authorize(["sqi"]), async (req, res) => {
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        {
          model: Application,
          as: "application",  // Pastikan alias sesuai dengan model
        },
        {
          model: SQIPic,
          as: "sqiPic",  // Pastikan alias sesuai dengan model
        },
        {
          model: SupportType,
          as: "supportType",  // Pastikan alias sesuai dengan model
        },
      ],
    });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});


// Developer hanya bisa membuat task
// router.post("/", authenticate, authorize(["developer"]), async (req, res) => {
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      supportType,
      customSupportType,
      applicationId,
      sqiPicId,
    } = req.body;

    let supportTypeId = null;

    // Jika memilih support type dari daftar (bukan custom), set supportTypeId
    if (supportType && supportType !== "Other") {
      const existingType = await SupportType.findOne({
        where: { name: supportType },
      });

      if (existingType) {
        supportTypeId = existingType.id;
      }
    }

    // Jika memilih "Other", simpan customSupportType
    if (supportType === "Other" && customSupportType) {
      supportTypeId = null; // Tetap null karena custom, tidak pakai ID
    }

    const newTask = await Task.create({
      title, // Pastikan title sudah dikirim dari frontend
      description,
      supportTypeId, // supportTypeId bisa null atau ID
      customSupportType: supportType === "Other" ? customSupportType : null, // Simpan customSupportType jika "Other"
      applicationId,
      sqiPicId,
    });

    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Failed to create task" });
  }
});




export default router;
