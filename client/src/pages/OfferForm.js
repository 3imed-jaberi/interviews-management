import React from "react";
import { useFormik } from 'formik';
import ImageUpload from "../components/ImageUpload";
import { Input } from '../components/Input'
import { createOffer } from "../services/offer.service";

function OfferForm() {

  const {
    values,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    onSubmit: async values => {
      const [ok] = await createOffer(values)

      if (ok) {
        // TODO: redirect
      }

      // TODO: handle error
    }
  })

  return (
    <div className="card mt-3 mb-6 shadow-sm">
      <div className="card-body">
        {/* {!!this.state.error && <div className="alert alert-danger">{this.state.error}</div>} */}
        <form onSubmit={handleSubmit}>
          <Input label='Title:' name="title" type="text" value={values.title} onChange={handleChange} />
          <Input label='Description:' name="description" type="textarea" value={values.description} onChange={handleChange} />
          <button
            type="submit"
            className="btn btn-primary btn-big btn-block"
            disabled={false}
          >
            Publish Now!
          </button>
        </form>
      </div>
    </div>
  )
}

export default OfferForm
