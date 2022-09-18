const express = require("express");
const router = express.Router();

// BUILD THE DATA FOR LOCAL
let teachers = [
  { id: "1", fullName: "Alex Nguyen", skills: "ReactJS, Cooking, Sports" },
  { id: "2", fullName: "Johnny Le", skills: "ReactJS, Backend, UX/UI" },
  { id: "3", fullName: "Ariel Chirstian", skills: "Badminton, Cooking, Frontend" }
];

//routing
router.get("/", (req, res) => {
  res.json({
    data: teachers,
  });
});

router.get("/teachers", (req, res) => {
  res.json({
    data: teachers,
  });
});

router.get("/teachers/:id", (req, res) => {
  const { id } = req.params;
  let teacher = teachers.find((elm) => elm.id === id);
  console.log(teacher);
  if (!teacher) {
    return res.json({
      mess: "teacher is not exist!",
    });
  }
  res.json({
    data: teacher,
  });
});

router.get("/teacher/:id/class/:class/timetable", (req, res) => {
  console.log("Params: ", req.params);
  res.send("Get teacher with id");
});

router.post("/teachers", (req, res) => {
  const newTeacher = req.body;
  const { fullName, skills } = newTeacher;
  if (!fullName || !skills) {
    return res.json({
      mess: "Missing the info of new teacher",
    });
  }
  // generate id for new teacher
  const newId = teachers.length + 1;
  newteacher.id = newId;
  // add in database
  teachers.push(newTeacher);
  res.status(201).json({
    mess: "Create a new teacher successfully!",
    data: teachers,
  });
});

router.put("/teachers/:id", (req, res) => {
  const updateData = req.body;
  const { id } = req.params;
  let idx = teachers.findIndex((teacher) => teacher.id === id);

  if (idx === -1) {
    return res.json({
      msg: "teacher is not exits",
    });
  }

  teachers[idx] = updateData;
  res.json({
    msg: `teacher ${id} update successfully!`,
    data: teachers,
  });
});

router.delete("/teacher/:id", (req, res) => {
  const { id } = req.params;

  const idx = teachers.findIndex((teacher) => teacher.id === id);
  if (idx === -1) {
    return res.json({
      msg: "teacher does not exist ",
    });
  }

  const filtedTeacher = teachers.filter((teacher) => teacher.id !== id);
  teachers = filtedTeacher;

  res.json({
    msg: "Delete teacher successfully",
    data: teachers,
  });
});

module.exports = router;