var express = require("express");
var app = express();
var port = 3000;
var upload = require("express-fileupload");
// For reading the csv file
var fs = require("fs");
var csv = require("fast-csv");

// Insert post
app.get("/addpost", (req, res) => {
  var post = "";
})

// Connect with the upload package
app.use(upload())

// To leave out the ejs extension
app.set("view engine", "ejs")

// Look in the static folder for all the css and js files, img and fonds
app.use(express.static("static"))


// When on just localhost, show landing page
app.get("/", function(req, res){
  res.render("landing");
})

// When on "localhost/upload" show upload page
app.get("/upload", function(req, res){
  res.render("upload");
})

// Upload file to upload dir
app.post("/", function(req, res){
  if (Object.keys(req.files).length == 0) {
     return res.status(400).send('No files were uploaded.');
   }

   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
   var csvFile = req.files.csvFile;
   var fileName = csvFile.name;

   // Use the mv() method to place the file somewhere on your server
   csvFile.mv('./upload/' + fileName, function(err) {
     if (err)
       return res.status(500).send(err);

     res.send('File uploaded!');
   });
})

// Reading and translating csv file
fs.createReadStream("upload/GephiMatrix_co-citation.csv")
  .pipe(csv())
  .on("data", function(data){
    console.log(data[3]);
  })
  .on("end", function(data){
    //console.log("Csv file read")
  })


app.listen(port, () => console.log("Group 4 server has started!"));
