const { request, response } = require("express");
const path = require('path');
const { createCourse, updateCourseState, updateCourseDetails, getAllCoursesByInstructor, getCourseById, removeStudentFromCourse } = require("../database/dao/courseDAO");
const HttpStatusCodes = require('../utils/enums');
const { createCourse, updateCourseState, updateCourseDetails, 
    getAllCoursesByInstructor, getCourseById, joinCourse, 
    getCoursesByStudent, getCoursesByName, getCoursesByCategory, 
    getCoursesByMonth, getCoursesByState } = require("../database/dao/courseDAO");

const createCurso = async(req, res = response) => {
    const { name, description, category, startDate, endDate, state, instructorUserId } = req.body;

    if (!name || !category || !startDate || !endDate || !state || !instructorUserId) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            statusCode: HttpStatusCodes.BAD_REQUEST,
            details: "Missing required fields. Please check your input."
        });
    }

    try {
        const result = await createCourse({
            name,
            description,
            category,
            startDate,
            endDate,
            state,
            instructorUserId
        });
        return res.status(HttpStatusCodes.CREATED).json({
            message: "The course has been registered successfully",
            cursoId: result.cursoId,
            joinCode: result.joinCode
        });

    } catch (error) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            details: "Error creating new course. Try again later"
        });
    }
};

const updateCourse = async (req, res = response) => {
    const { cursoId, name, description, category, endDate } = req.body;

    if (!cursoId) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            statusCode: HttpStatusCodes.BAD_REQUEST,
            details: "Course ID is required"
        });
    }

    try {
        const result = await updateCourseDetails(cursoId, { name, description, category, endDate });

        if (result.affectedRows === 0) {
            return res.status(HttpStatusCodes.NOT_FOUND).json({
                error: true,
                statusCode: HttpStatusCodes.NOT_FOUND,
                details: "Course not found"
            });
        }

        return res.status(HttpStatusCodes.OK).json({
            statusCode: HttpStatusCodes.OK,
            message: "Course updated successfully"
        });

    } catch (error) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            details: "Server error. Could not update course"
        });
    }
};

const setCourseState = async (req, res = response) => {
    const { cursoId, state } = req.body;
    if (!cursoId || !state) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            statusCode: HttpStatusCodes.BAD_REQUEST,
            details: "Course ID and state are required"
        });
    }
    try {
        const result = await updateCourseState(cursoId, state);

        if (result.affectedRows === 0) {
            return res.status(HttpStatusCodes.NOT_FOUND).json({
                error: true,
                statusCode: HttpStatusCodes.NOT_FOUND,
                details: "Course not found"
            });
        }
        return res.status(HttpStatusCodes.OK).json({
            message: `Course state updated to ${state}`
        });
    } catch (error) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            details: "Server error. Could not update course state"
        });
    }
};

const getCourseDetailById = async (req, res = response) => {
    const { courseId } = req.params;

    try {
        const result = await getCourseById(courseId);

        return res.status(HttpStatusCodes.OK).json({
            count: result.length,
            message: "Query executed successfully",
            result
        });
    } catch (error) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, 
            statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            details: "Server error. Could not fetch course"
        });
    }
};

const getCoursesByInstructor = async (req, res = response) => {
    const { instructorId } = req.params;

    try {
        const result = await getAllCoursesByInstructor(instructorId);

        return res.status(HttpStatusCodes.OK).json({
            count: result.length,
            message: "Query executed successfully",
            result
        });
    } catch (error) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR, 
            details: "Server error. Could not fetch courses"
        });
    }
};

const joinCurso = async (req, res = response) => {
    const { studentUserId, joinCode } = req.body;

    if (!studentUserId || !joinCode) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            details: "Missing studentUserId or joinCode"
        });
    }

    try {
        const result = await joinCourse(studentUserId, joinCode);

        if (!result.success) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                error: true,
                details: result.message
            });
        }

        return res.status(HttpStatusCodes.OK).json({
            message: result.message
        });

    } catch (error) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            details: "Error joining the course. Try again later"
        });
    }
};

// Unenroll student from course
const unenrollStudentFromCourse = async (req, res = response) => {
    const { courseId, studentId } = req.params;

    if (!courseId || !studentId) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            statusCode: HttpStatusCodes.BAD_REQUEST,
            details: "Course and student are required"
        });
    }

    try {
        const result = await removeStudentFromCourse(courseId, studentId);

        if (result.affectedRows === 0) {
            return res.status(HttpStatusCodes.NOT_FOUND).json({
                error: true,
                statusCode: HttpStatusCodes.NOT_FOUND,
                details: "Enrollment not found for this course and student"
            });
        }

        return res.status(HttpStatusCodes.OK).json({
            statusCode: HttpStatusCodes.OK,
            message: "Student removed from course successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            details: "Server error. Could not remove student from course"
        });
    }
};

// Search courses by name
const getCoursesByNameController = async (req, res = response) => {
    const { name } = req.query;

    if (!name) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            details: "Missing 'name' query parameter"
        });
    }

    try {
        const courses = await getCoursesByName(name);

        return res.status(HttpStatusCodes.OK).json({ courses });
    } catch (error) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            details: "Error fetching courses by name"
        });
    }
};

// Search courses by category
const getCoursesByCategoryController = async (req, res = response) => {
    const { category } = req.query;

    if (!category) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            details: "Missing 'category' query parameter"
        });
    }

    try {
        const courses = await getCoursesByCategory(category);

        return res.status(HttpStatusCodes.OK).json({ courses });
    } catch (error) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            details: "Error fetching courses by category"
        });
    }
};

// Deactivate course
const deactivateCourse = async (req, res = response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            statusCode: HttpStatusCodes.BAD_REQUEST,
            details: "Course ID is required"
        });
    }

    try {
        const result = await updateCourseState(id, "Inactivo");

        if (result.affectedRows === 0) {
            return res.status(HttpStatusCodes.NOT_FOUND).json({
                error: true,
                statusCode: HttpStatusCodes.NOT_FOUND,
                details: "Course not found"
            });
        }

        return res.status(HttpStatusCodes.OK).json({
            statusCode: HttpStatusCodes.OK,
            message: "Course deactivated successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            details: "Server error. Could not deactivate course"
        });
    }
};

module.exports = { 
    createCurso, 
    updateCourse, 
    setCourseState, 
    getCourseDetailById, 
    getCoursesByInstructor, 
    joinCurso, 
    getCoursesByStudentController, 
    getCoursesByNameController, 
    getCoursesByCategoryController, 
    getCoursesByMonthController, 
    getCoursesByStateController, 
    deleteStudentFromCourse, 
    deactivateCourse, 
    unenrollStudentFromCourse 
};
