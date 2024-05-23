const FormField = ({ type, placeholder, name, register, error }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="form-control"
      />
      {error && <div className="text-danger">{error.message}</div>}
    </>
  );
};

export default FormField;
