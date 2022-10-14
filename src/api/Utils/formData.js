const busboy = require("busboy");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUD,
  api_secret: process.env.CLUD_SECRET,
});

const formData = (req,res,next)=>{
    const bb = busboy({ headers: req.headers });
}

module.exports = formData