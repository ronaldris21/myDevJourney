import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

function ImageMongoComponent({image}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5004")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err, "it has an error"));
  }, []);




  return (
    <div className="App">
      <h1>Image uploading react</h1>
      {data?.map((singleData) => {
        const mimeType = singleData.img.contentType;
        const base64String = Buffer.from(singleData.img.data, 'binary').toString('base64');
        return (
            <img
              src={`data:${mimeType};base64,${base64String}`}
              alt={singleData.name}
              width="300"
              loading="lazy"
              key={singleData._id}
            ></img>
        );
      })}
    </div>
  );
}

export default ImageMongoComponent;
