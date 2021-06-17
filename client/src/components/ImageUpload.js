import React from 'react';
import "./ImageUpload.css";

function ImageUpload({ onChange }) {
  return (
    <div className="form-group nice-input-upload">
      <input type="file"
        onChange={onChange}
        className="form-control-file text-primary font-weight-bold"
        data-title="Click me or drag and drop file"
      />
    </div>
  )
}

export default ImageUpload;


