import { X } from 'lucide-react';

const FormModal = ({
  title,
  description,
  isOpen,
  onClose,
  onSubmit,
  children,
  loading,
  mode,
}) => {
  if (!isOpen) return null;
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={onSubmit}
            className="w-full max-w-lg rounded-lg bg-white shadow-xl"
          >
            <div className="flex flex-col p-5">
              <div className="ml-3 flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-800">
                    {title}
                  </h1>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {description}
                  </p>
                </div>
                <button type="button" onClick={onClose}>
                  <X className="text-gray-400 cursor-pointer" />
                </button>
              </div>

              {/* Form Fields*/}
              <div className="mx-3 my-4">{children}</div>

              <div className="mt-5 flex items-center justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="ml-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 cursor-pointer"
                >
                  {mode === 'delete'
                    ? loading
                      ? 'Deleting...'
                      : 'Delete'
                    : loading
                      ? 'Saving...'
                      : 'Save'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default FormModal;
