const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8080;
console.log(__dirname);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./fabrik/build")));

// app.get("/", (req: any, res: any) => {
//   res.send("Hello World!");
// });

// //joining path of directory
// const directoryPath = path.join(__dirname, "/public/retail-3D-models");
// //passsing directoryPath and callback function
// fs.readdir(directoryPath, function (err: any, files: any) {
//   //handling error
//   if (err) {
//     return console.log("Unable to scan directory: " + err);
//   }
//   console.log(files);

//   //listing all files using forEach
//   files.forEach(function (file: any) {
//     // Do whatever you want to do with the file
//     if (file !== ".DS_Store") {
//       console.log(file);
//     }
//   });
// });

const directoryPath = path.join(__dirname, "/public/retail-3D-models");

app.get("/all-model-names", async (req: any, res: any) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");

  //passsing directoryPath and callback function
  fs.readdir(directoryPath, function (err: any, files: any) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    console.log(files);
    res.send(files);
    //listing all files using forEach
    files.forEach(function (file: any) {
      // Do whatever you want to do with the file
      if (file !== ".DS_Store") {
        console.log(file);
      }
    });
  });
});

app.get("/api", async (req: any, res: any) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  // const x = new Promise((resolve: any, reject: any) => {
  //   let a = 2;
  //   if (a === 2) {
  //     resolve("success");
  //   } else {
  //     reject("failed");
  //   }
  // });
  // return;

  res.json({ message: "Hello from server!" });
});

app.get("/fabrik/model", async (req: any, res: any) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  // const x = new Promise((resolve: any, reject: any) => {
  //   let a = 2;
  //   if (a === 2) {
  //     resolve("success");
  //   } else {
  //     reject("failed");
  //   }
  // });
  // return;

  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get("*", (req: any, res: any) => {
  res.sendFile(path.resolve(__dirname, "./fabrik/build", "index.html"));
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
