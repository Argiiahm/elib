import { ArrowLeft } from 'lucide-react';

const ButtonBack = () => {
  return (
    <button
      onClick={() => window.history.back()}
      to="/elib/books"
      className="flex items-center gap-2 mb-6 text-zinc-500 hover:text-zinc-600 cursor-pointer"
    >
      <ArrowLeft />
      <span>Back</span>
    </button>
  );
};

export default ButtonBack;
