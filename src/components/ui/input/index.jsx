import Input from './Input';
import Label from './Label';

const InputForm = ({ name, type, placeholder, error, ...props }) => {
  return (
    <div className="mb-4">
      <Label name={name}>{name}*</Label>
      {error && <p className="text-red-400 text-sm mb-1">{error.message}</p>}
      <Input name={name} type={type} placeholder={placeholder} {...props} />
    </div>
  );
};

export default InputForm;
