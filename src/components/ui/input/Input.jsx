const Input = ({ name, type = 'text', onChange, placeholder, ...props }) => {
  return (
    <input
      className="border border-gray-200 focus:outline-0 px-2 py-1 w-full placeholder:text-gray-300"
      id={name}
      type={type}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;
