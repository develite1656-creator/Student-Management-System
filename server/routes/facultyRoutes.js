const express = require("express");

const {
    createFaculty,
    getFaculty,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty,
} = require("../controllers/facultyController");

const router = express.Router();

// Create Faculty
router.post("/", createFaculty);

// Get All Faculty
router.get("/", getFaculty);

// Get Single Faculty
router.get("/:id", getSingleFaculty);

// Update Faculty
router.put("/:id", updateFaculty);

// Delete Faculty
router.delete("/:id", deleteFaculty);

module.exports = router;