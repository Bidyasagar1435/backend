const fs = require("fs");

function getStudents(callback) {
  fs.readFile("students.json", "utf8", (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    const students = JSON.parse(data);
    callback(null, students);
  });
}

function addStudent(newStudent, callback) {
  fs.readFile("students.json", "utf8", (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    const students = JSON.parse(data);
    students.push(newStudent);

    fs.writeFile(
      "students.json",
      JSON.stringify(students, null, 2),
      "utf8",
      (err) => {
        if (err) {
          callback(err);
          return;
        }

        callback(null, newStudent);
      },
    );
  });
}

module.exports = {getStudents, addStudent};
