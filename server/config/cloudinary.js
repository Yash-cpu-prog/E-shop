import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "YOUR_NAME",
  api_key: "YOUR_KEY",
  api_secret: "YOUR_SECRET",
});

export default cloudinary;
