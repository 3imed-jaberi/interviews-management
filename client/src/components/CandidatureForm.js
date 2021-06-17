import React, { useState } from "react"
import { createCandidature, updateCandidature } from "../services/candidature.service";
import ImageUpload from "./ImageUpload";

function CandidatureForm() {
  const [file, setFile] = useState()

  function _onChange(event) {
    console.log(event.target);
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    setFile(file)
  }

  async function _onSubmit() {
    const [ok, data] = await createCandidature({ status: "PENDIING " })
    if (ok) {
      const myFormData = new FormData();
      myFormData.set('file', file)
      const [ok] = await updateCandidature(data.id, myFormData)
      if (ok) {
        // redirect with toast ..
      }

      // faild toast ..
    }

  }
  return (
    <div className="card mb-3 mt-3 shadow-sm">
      <div className="card-body">
        <form onSubmit={_onSubmit}>
          <ImageUpload onChange={_onChange} />
          <button
            type="submit"
            className="btn btn-primary btn-big btn-block"
            disabled={true}
          >
            Add Candidature
          </button>
        </form>
      </div>
    </div>
  );
}

export default CandidatureForm
