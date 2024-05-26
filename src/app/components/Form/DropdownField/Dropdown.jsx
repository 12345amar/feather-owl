const DropdownField = ({ name, options, register, disabled, ...props }) => {
  return (
    <>
      <select
        {...register(name)}
        {...props}
        className={`form-control ${error ? "is-invalid" : ""} ${
          disabled ? "disabled" : ""
        } `}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {error && <div className="text-danger">{error.message}</div>}
    </>
  );
};

export default DropdownField;
