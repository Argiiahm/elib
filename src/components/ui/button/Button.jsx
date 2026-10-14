const Button = ({
  onClick,
  type = 'button',
  customStyle,
  children,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 ${customStyle ? customStyle : 'w-full bg-orange-500 text-white rounded-md'} cursor-pointer`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
