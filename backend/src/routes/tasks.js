import express from "express";
import {
  authenticate,
  authorize
} from "../middleware/auth.js";
import Task from "../models/Task.js";
import Application from "../models/Application.js";
import SQIPic from "../models/SQIPic.js";
import SupportType from "../models/SupportType.js";
import User from "../models/User.js";


const router = express.Router();

/**
 * ===============================
 * 🔐 SQI: Melihat semua task
 * ===============================
 */
router.get("/", authenticate, authorize("sqi", "developer"), async (req, res) => {
  try {
    console.log("✅ Fetch tasks - Authorized user:", req.user);

    const whereCondition =
      req.user.role === "developer"
        ? { createdByUserId: req.user.userId } // hanya task miliknya
        : {}; // SQI: semua task

    const tasks = await Task.findAll({
      where: whereCondition,
      include: [
        { model: Application, as: "application" },
        { model: SQIPic, as: "sqiPic" },
        { model: SupportType, as: "supportType" },
        { model: User, as: "createdBy", attributes: ["id", "username", "role"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "Berhasil mengambil data task.",
      count: tasks.length,
      data: tasks,
    });
  } catch (err) {
    console.error("❌ Error fetching tasks:", err);
    res.status(500).json({ error: "Gagal mengambil data task.", details: err.message });
  }
});


/**
 * ===============================
 * 👨‍💻 Developer: Membuat task baru
 * ===============================
 */
router.post("/", authenticate, authorize("developer"), async (req, res) => {
  try {
    const {
      title,
      description,
      supportType,
      customSupportType,
      applicationId,
      sqiPicId,
    } = req.body;

    // Validasi input
    if (!title || !description || !applicationId || !sqiPicId) {
      return res.status(400).json({
        error: "Field wajib tidak boleh kosong: title, description, applicationId, sqiPicId.",
      });
    }

    // Tentukan supportTypeId (jika bukan custom)
    let supportTypeId = null;
    if (supportType && supportType !== "Other") {
      const existingType = await SupportType.findOne({
        where: {
          name: supportType
        }
      });
      if (existingType) supportTypeId = existingType.id;
    }

    // Buat task baru
    const newTask = await Task.create({
      title,
      description,
      supportTypeId,
      customSupportType: supportType === "Other" ? customSupportType : null,
      applicationId,
      sqiPicId,
      createdByUserId: req.user.userId, // 🔹 user login dari JWT
      createdAt: new Date(),
    });


    res.status(201).json({
      message: "✅ Task berhasil dibuat.",
      data: newTask,
    });
  } catch (err) {
    console.error("❌ Error creating task:", err);
    res.status(500).json({
      error: "Gagal membuat task.",
      details: err.message,
    });
  }
});

/**
 * ===============================
 * 🔍 (Opsional) SQI & Developer:
 * Melihat 1 task berdasarkan ID
 * ===============================
 */
router.get("/:id", authenticate, authorize("sqi", "developer"), async (req, res) => {
  try {
    const {
      id
    } = req.params;

    const task = await Task.findByPk(id, {
      include: [{
          model: Application,
          as: "application"
        },
        {
          model: SQIPic,
          as: "sqiPic"
        },
        {
          model: SupportType,
          as: "supportType"
        },
        {
          model: User,
          as: "createdBy",
          attributes: ["id", "username", "role"]
        }, // 🔹 Tambahan baru
      ],
    });

    if (!task) {
      return res.status(404).json({
        error: "Task tidak ditemukan."
      });
    }

    res.status(200).json({
      message: "Task ditemukan.",
      data: task
    });
  } catch (err) {
    console.error("❌ Error fetching task by ID:", err);
    res.status(500).json({
      error: "Gagal mengambil data task.",
      details: err.message
    });
  }
});

export default router;