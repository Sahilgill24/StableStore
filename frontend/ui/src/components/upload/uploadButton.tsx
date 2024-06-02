import { generateUploadButton , generateUploadDropzone } from "@uploadthing/react";
console.log(import.meta.env.VITE_BACKEND_URI) 
export const UploadButton = generateUploadButton({
  url: "http://localhost:8080",

});
