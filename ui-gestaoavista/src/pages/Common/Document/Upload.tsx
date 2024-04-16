// import { Button } from "@mui/material";
// import * as React from "react";
// import { useState } from "react";

// interface UploaderProps {
//   fileType?: string | AcceptedFileType[];
// }

// enum AcceptedFileType {
//   Text = ".txt",
//   Gif = ".gif",
//   Jpeg = ".jpg",
//   Png = ".png",
//   Doc = ".doc",
//   Pdf = ".pdf",
//   AllImages = "image/*",
//   AllVideos = "video/*",
//   AllAudios = "audio/*"
// }

// export const Upload = (props: UploaderProps) => {
//   const { fileType } = props;
//   const acceptedFormats: string | AcceptedFileType[] =
//     typeof fileType === "string"
//       ? fileType
//       : Array.isArray(fileType)
//       ? fileType?.join(",")
//       : AcceptedFileType.Text;
//   const [selectedFiles, setSelectedFiles] = useState<File | undefined>(
//     undefined
//   );

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedFiles(event?.target?.files?.[0]);
//   };

//   const onUpload = () => {
//     console.log(selectedFiles);
//   };

//   return (
//     <>
//       <Button
//         variant="contained"
//         component="label"
//         style={{ textTransform: "none" }}
//       >
//         <input
//           hidden
//           type="file"
//           accept={acceptedFormats}
//           onChange={handleFileSelect}
//         />
//         {!selectedFiles?.name && <span> Choose file to upload</span>}
//         {selectedFiles?.name && (
//           <>
//             <span style={{ float: "left" }}> {selectedFiles?.name}</span>
//             <span style={{ padding: "10px" }}> Change</span>
//             <span onClick={() => setSelectedFiles(undefined)}>Clear</span>
//           </>
//         )}
//       </Button>
//       <Button
//         color="primary"
//         disabled={!selectedFiles}
//         style={{ textTransform: "none" }}
//         onClick={onUpload}
//       >
//         Upload
//       </Button>
//     </>
//   );
// };