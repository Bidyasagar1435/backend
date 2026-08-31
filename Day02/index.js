const http = require("http"); // built-in module
const lodash = require("lodash");

const server = http.createServer((req, res) => {
  res.end("Backend is working!");
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});

// const math = require("./math");  // own module
// const calculator = require("./calculator")

// console.log(calculator.add(2, 3)); // Example usage of mathjs library
// console.log(calculator.subtract(3, 2));
// console.log(calculator.multiply(3, 2));
// console.log(calculator.divide(3, 2));

// const arr = [2, 4, 8, 1, 3, 5];
// console.log(lodash.reverse(arr));

const fs = require("fs");

// fs.readFile("message.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log(data);
// });

// fs.writeFile("user.txt", "my name is bidyaa", (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("file created successfully");
// });

// fs.appendFile("user.txt", "  i am learning MERN backend", (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("File update successfully");
// });

// fs.unlink("user.txt", (err)=>{
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("File deleted");

// })

// const data = fs.readFileSync("message.txt", "utf8");

// console.log(data);

// console.log("Finished");

// const getUser = require("./user");

// getUser((err, users) => {
//   if (err) {
//     console.log(err);
//   }

//   users.map((user)=>{
//     console.log(user.name);
//   })
// });

const {getStudents, addStudent} = require("./students");

// getStudents((err, students) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("All students: ");
//   students.map((student) => {
//     console.log(student.name);
//   });
//   console.log("Total student: ", students.length);
//   console.log("Only MERN students: ");
//   const mernStudents = students.filter((student) => {
//     return student.course === "MERN";
//   });
//   console.log(mernStudents);

//   let stdId = 3;
//   const student = students.find((s) => s.id === stdId);

//   if (stdId) {
//     console.log("Student found: ", student.name);
//   }
// });

const newStudent = {
  id: 6,
  name: "Sagar",
  age: 23,
  course: "Node.js",
};

addStudent(newStudent, (err, student) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Student added successfully:");
  console.log(student);
});



