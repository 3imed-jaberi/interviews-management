import React from 'react';
import classNames from "classnames";

export const Input = ({ label, type, error, ...props }) => {
  const classes = classNames('form-control', { 'is-invalid': error });
  return (
    <div className="form-group">
      {label !== null && label !== '' && <label>{label}</label>}
      {type !== 'textarea' && <input {...props} type={type} className={classes} />}
      {type === 'textarea' && <textarea {...props} className={classes} />}
      {error && <small className="form-text text-danger">{error}</small>}
    </div>
  )
}