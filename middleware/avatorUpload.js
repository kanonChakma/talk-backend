import { uploader } from "../utilites/singleUploader.js";

export const avatarUpload = (req, res, next) =>{
 const upload = uploader(
     "avatars",
     ["image/jpeg", "image/jpg", "image/png"],
     1000000,
     "Only .jpg, jpeg or .png format allowed!"
  ).upload.single('myImage')
  return upload;
 }
//  upload.single('myImage')(req, res, (err) => {
//   console.log("Request ---", req.body);
//   console.log("Request file ---", req.file);
//     if (err) {
//       res.status(500).json({
//         errors: {
//           avatar: {
//             msg: err.message,
//           },
//         },
//       });
//     } else {
//       next();
//     }
//   });
// }
