const express = require("express");

const studentRouter = require("./Students");
const teacherRouter = require("./Teachers");
const authMdw = require("../middlewares/Auth");
const authRouter = require("./Auth");

const apiLogger = require("../middlewares/logger");
const userTracking = require("../middlewares/userTracking");
const router = express.Router();

// If want to use middleware function for all API =>call .use(middleware)
router.use(apiLogger);
// router.use(userTracking);

router.use("/auth", authRouter);
router.use("/students", authMdw, studentRouter);
router.use("/teachers", teacherRouter);


// If only want to use middleware for some specific API => use in block
// router.use("/students", apiLogger, studentRouter);

module.exports = router;
