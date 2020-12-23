const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cloudinary = require("./config/cloudinaryConfig");
const { uploader } = require ('cloudinary');
const { multerUpload, dataUri, upload } = require("./middlewares/multer");
const fs = require('fs');
const path = require('path');
require('newrelic');


const app = express();

app.use(cors({origin: '*'}));

// middle ware
/*
app.use(express.static("public")); //to access the files in public folder
*/
/*
app.use(express.static(__dirname + '/public'));
*/
app.use(express.static("public"));

/*var corsOptions = {
  origin: "http://localhost:8080",
};
corsOptions
*/



//app.use(fileUpload());
const db = require("./models/");
const Role = db.role;

db.sequelize
  .sync({
    /*force: true,*/
    
  })
  .then(() => {
    console.log(
      //"Drop and Resync Db"
      "No Drop & Resync"
    );
    //initial();
  });

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });

}


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "800kb" }));


require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/product.routes")(app);
require("./routes/productimg.routes")(app);
require("./routes/productcom.routes")(app);
require("./routes/article.routes")(app);
require("./routes/articlecom.routes")(app);
require("./routes/articleimg.routes")(app);
require("./routes/productRating.routes")(app);


app.post('/upload', multerUpload, (req, res) => {

  if(req.file) {

  const file = dataUri(req);
  return uploader.upload(file).then((result) => {

  const image = result.url;
  return res.status(200).send({ name: req.file.originalname, path: image })
  }).catch((err) => res.status(400).json({
    message: 'something went wrong while processing your request',
    data: {err}}))
  }
  
});

app.post('/multiuploads', upload.array('file'), async(req, res)=>{
const uploader = async (path) => await cloudinary.uploads(path, 'uploads');

const urls = [];
const files = req.files;
for(const file of files){
  const {path} = file;

  const newPath = await uploader(path);

  urls.push(newPath);
  
  fs.unlinkSync(path);
}

res.status(200).json({
  message: "Images Uploaded Successfully",
  data: urls
}).catch((err) => res.status(400).json({
  message: 'something went wrong while processing your request',
  data: {err}}))
})

app.post('/uploadfiles', multerUpload, (req, res) => {

if(req.file) {

const file = dataUri(req);
return uploader.upload(file).then((result) => {

const image = result.url;
return res.status(200).json({
  success: true,
  url: image,
  fileName: res.req.file.originalname,
})
}).catch((err) => res.status(400).json({
  message: 'something went wrong while processing your request',
  data: {err}}))
}
  
});


app.post('/ckeditorupload', multerUpload, (req, res) => {

if(req.file) {

const file = dataUri(req);
return uploader.upload(file).then((result) => {

const image = result.url;
return res.status(200).send({ url: image })
}).catch((err) => res.status(400).json({
  message: 'something went wrong while processing your request',
  data: {err}}))
}

});


app.get('*', function(req, res) {
  res.sendFile( path.join(__dirname, 'public/index.html') );
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
