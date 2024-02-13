import React from "react";
import axios from "axios";

function UploadImageForm() {
  const [profileImg, setProfileImg] = React.useState(null);

  const onFileChange = (e) => {
    setProfileImg(e.target.files);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", profileImg[0]);
    formData.append("testImage", profileImg[0]);

    axios.post("http://localhost:5004/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="file"
              name="testImage"
              multiple
              onChange={(e) => onFileChange(e)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { UploadImageForm };
