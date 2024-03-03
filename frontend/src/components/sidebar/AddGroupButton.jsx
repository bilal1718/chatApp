import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import AddGroupForm from './AddGroupForm.jsx';

const AddGroupButton = () => {
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = (groupTitle) => {
    // Handle the form submission, e.g., send the data to the server
    console.log('Group Title:', groupTitle);
    // Close the form after submission
    setShowForm(false);
  };
  const onClose=()=>{
    setShowForm(false);
  }

  return (
    <div>
      <FiPlus className='mx-2 w-6 h-6 text-white cursor-pointer' onClick={() => setShowForm(true)} />
      {showForm && <AddGroupForm
      onSubmit={handleFormSubmit}
      onClose={onClose}
      />}
    </div>
  );
};

export default AddGroupButton;
