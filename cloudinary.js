// cloudinary.js
const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
    cloud_name: "dovddhx7i",
    api_key: "188288294532912",
    api_secret: "0T7ojGlK73kv3yfFTqcK-gQSPQI"
  });

module.exports = cloudinary;


// example on how to upload an retireve an image

// // Upload

// const res = cloudinary.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})

// res.then((data) => {
//   console.log(data);
//   console.log(data.secure_url);
// }).catch((err) => {
//   console.log(err);
// });


// // Generate 
// const url = cloudinary.url("olympic_flag", {
//   width: 100,
//   height: 150,
//   Crop: 'fill'
// });



// // The output url
// console.log(url);
// // https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag

// async function uploadImage() {
//   const fileInput = document.getElementById('file-input');
//   const file = fileInput.files[0];

//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', 'your_upload_preset'); // You can create an upload preset in your Cloudinary dashboard

//   const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
//     method: 'POST',
//     body: formData,
//   });

//   const data = await response.json();
//   displayImage(data.secure_url);
// }