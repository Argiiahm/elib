import FormModal from "../../../../components/FormModal";

const ReturnedFormModal = ({ isOpen, setIsOpen, selectedBorrow }) => {
  return (
    <FormModal title="Returned Book" description={`Returned a book ${selectedBorrow?.book.title}`} isOpen={isOpen}>

    </FormModal>
  )
};

export default ReturnedFormModal;
