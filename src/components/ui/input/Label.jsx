const Label = ({ name, children }) => {
  return (
    <label
      className="block capitalize mb-1 text-gray-500 font-medium"
      htmlFor={name}
    >
      {children}
    </label>
  );
};

export default Label;
