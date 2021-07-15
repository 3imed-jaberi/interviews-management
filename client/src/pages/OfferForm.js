import React from "react";
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Input } from '../components/Input'
import { createOffer } from "../services/offer.service";

function OfferForm() {
  const history = useHistory()

  React.useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user-payload'))
    const role = userData.roles[0]
    if (role !== 'ROLE_ADMIN') {
      history.push('/offers')
    }
  })

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
      const [ok, data] = await createOffer(values)
      console.log({ ok });
      if (ok) {
        console.log({ ok, data });

        // history.push(`/offer/${data.id}`)
      }

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
