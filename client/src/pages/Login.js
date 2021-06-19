import React from 'react';
import { useHistory } from 'react-router-dom'
import { Input } from '../components/Input';
import { useFormik } from 'formik';
import { login } from '../services/user.service';

function Login() {

  const history = useHistory();

  const {
    values,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async values => {
      const [ok, data] = await login(values)

      if (ok) {
        localStorage.setItem('x-token', data.token)
        history.push('/offers')
        return
      }
    }
  });

  return (
    <div className="text-center">
      {/* {error && <div className="alert alert-danger">{error}</div>} */}
      <form className="mt-4" onSubmit={handleSubmit}>
        <Input name="username" label="Username" type="text" value={values.username} onChange={handleChange} />
        <Input name="password" label="Password" type="password" value={values.password} onChange={handleChange} />
        <button
          type="submit"
          className="btn btn-primary btn-big btn-block"
        >
          Log in
        </button>
      </form>
    </div>
  )
}

export default Login;
