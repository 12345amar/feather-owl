const DropdownField = ({
  name,
  options,
  register,
  disabled,
  error,
  ...props
}) => {
  return (
    <>
      <select
        {...register(name)}
        {...props}
        className={`form-control p-3  ${error ? "is-invalid" : ""} ${
          disabled ? "disabled" : ""
        } `}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-dark">
            {option.text}
          </option>
        ))}
      </select>
      {error && <div className="text-danger">{error.message}</div>}
    </>
  );
};

export default DropdownField;
