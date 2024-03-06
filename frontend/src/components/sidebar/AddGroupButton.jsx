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
      <button type="button" class="text-white
       bg-gradient-to-r from-blue-500 via-blue-600
        to-blue-700 hover:bg-gradient-to-br focus:ring-4 
        focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg
         shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium 
      rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 " onClick={() => setShowForm(true)}>Add Group</button>
      {showForm && <AddGroupForm
      onSubmit={handleFormSubmit}
      onClose={onClose}
      />}
    </div>
  );
};

export default AddGroupButton;
