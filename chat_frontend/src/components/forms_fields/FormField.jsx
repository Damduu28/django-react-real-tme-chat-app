import React from "react";

const FormField = ({ title, name, type, holder, register, isPwd }) => {
  return (
    <div className="form__field">
      <label htmlFor={name}>{title}</label>
      <input
        id={name}
        type={type}
        placeholder={holder}
        {...register(`${name}`, {
          required: `Please enter your ${title}.`,
        })}
      />
      {isPwd && <i className="fas fa-eye"></i>}
      {/* <p className="error_msg">{errors.name && errors.name?.message}</p> */}
    </div>
  );
};

export default FormField;
