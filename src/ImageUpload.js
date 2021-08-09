import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./ImageUpload.css";
import firebase from "firebase";
import { storage, db } from "./firebase";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    //checking and getting first file
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changes",
      (sanpshot) => {
        //progress function....
        const progress =
          Math.round(sanpshot.bytesTransferred / sanpshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        //Error function
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      {/* I want to have following */}
      {/* progress bar */}
      <progress className="imageupload__progress" value={progress} max="100" />

      {/* Caption input  */}
      <input
        type="text"
        placeholder="Enter a caption..."
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
      />
      {/* File Picker  */}
      <input type="file" onChange={handleChange} />
      {/* Post button  */}
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
