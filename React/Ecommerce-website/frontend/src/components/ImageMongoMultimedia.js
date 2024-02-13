import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

function ImageMongoMultimedia({ image }) {
  const [data, setData] = useState(null);
  const [mimeType, setMimeType] = useState(null);

  useEffect(() => {
    if (image) {
      axios
        .get("http://localhost:5004/api/images/" + image)
        .then((res) => {
          setMimeType(res.mimetype);
          setData(Buffer.from(res.data.data, "binary").toString("base64"));
        })
        .catch((err) => console.log(err, "it has an error"));
    }
  }, [image]);

  return (
    <img
      width="100%"
      height="100%"
      src={
        data
          ? `data:${mimeType};base64,${data}`
          : "https://cdn.icon-icons.com/icons2/3001/PNG/512/default_filetype_file_empty_document_icon_187718.png"
      }
      alt="Multimedia"
      loading="lazy"
    />
  );
}

export default ImageMongoMultimedia;
