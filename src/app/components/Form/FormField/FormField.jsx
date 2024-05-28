const FormField = ({ type, placeholder, name, register, error, disabled }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`form-control ${error ? "is-invalid" : ""} ${
          disabled ? "disabled" : ""
        } `}
        disabled={disabled}
      />
      {error && <div className="text-danger">{error.message}</div>}
    </>
  );
};

export default FormField;
