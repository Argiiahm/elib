import { Search } from 'lucide-react';
import Button from '../../button/Button';
import Input from '../../input/Input';

const InputSearch = ({ value, onChange, handleSearch, placeholder }) => {
  return (
    <form onSubmit={handleSearch}>
      <div className="w-full max-w-[500px] flex items-center gap-2 border border-gray-200 px-4 py-2 focus:outline-0 rounded-full">
        <Search className="text-gray-400" size={18} />
        <Input
          type="text"
          className="w-full max-w-[500px] focus:outline-0"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <Button
          customStyle="flex items-center gap-2 bg-orange-500 text-white rounded-full px-4"
          type="submit"
        >
          <Search size={18} />
          <span>Search</span>
        </Button>
      </div>
    </form>
  );
};

export default InputSearch;
