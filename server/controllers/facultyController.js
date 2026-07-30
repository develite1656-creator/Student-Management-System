const Faculty = require("../models/Faculty");

// Create Faculty
exports.createFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.create(req.body);

        res.status(201).json({
            success: true,
            data: faculty,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Faculty
exports.getFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.find();

        res.status(200).json({
            success: true,
            data: faculty,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Single Faculty
exports.getSingleFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);

        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "Faculty not found",
            });
        }

        res.status(200).json({
            success: true,
            data: faculty,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Faculty
exports.updateFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "Faculty not found",
            });
        }

        res.status(200).json({
            success: true,
            data: faculty,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Faculty
exports.deleteFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndDelete(req.params.id);

        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "Faculty not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Faculty deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};