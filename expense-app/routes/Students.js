const express = require("express");
const router = express.Router();

// BUILD THE DATA FOR LOCAL
let students = [
  { id: "1", fullName: "Phat Truong", skills: "ReactJS, Cooking, Sports" },
  { id: "2", fullName: "Khoa Truong", skills: "ReactJS, Backend, Football" },
  { id: "3", fullName: "Ngoc Le", skills: "Badminton, Cooking, Frontend" },
  { id: "4", fullName: "Hung Trinh", skills: "ReactJS, Sports, Football" },
];

// Student routing
router.get("/", (req, res) => {
  // const query = req.query;
  // console.log({ query });
  res.json({
    data: students,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  let student = students.find((elm) => elm.id === id);
  console.log(student);
  if (!student) {
    return res.json({
      mess: "Student is not exist!",
    });
  }
  res.json({
    data: student,
  });
});

router.get("/:id/class/:class/timetable", (req, res) => {
  console.log("Params: ", req.params);
  res.send("Get student with id");
});

router.post("/", (req, res) => {
  const newStudent = req.body;
  const { fullName, skills } = newStudent;
  if (!fullName || !skills) {
    return res.json({
      mess: "Missing the info of new student",
    });
  }
  // generate id for new student
  const newId = students.length + 1;
  newStudent.id = newId;
  // add in database
  students.push(newStudent);
  res.status(201).json({
    mess: "Create a new student successfully!",
    data: students,
  });
});

router.put("/:id", (req, res) => {
  const updateData = req.body;
  const { id } = req.params;
  let idx = students.findIndex((student) => student.id === id);

  if (idx === -1) {
    return res.json({
      msg: "Student is not exits",
    });
  }

  students[idx] = updateData;
  res.json({
    msg: `Student ${id} update successfully!`,
    data: students,
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const idx = students.findIndex((student) => student.id === id);
  if (idx === -1) {
    return res.json({
      msg: "Student does not exist ",
    });
  }

  const filteredStudent = students.filter((student) => student.id !== id);
  students = filteredStudent;

  res.json({
    msg: "Delete student successfully",
    data: students,
  });
});

module.exports = router;
