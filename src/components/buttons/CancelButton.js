import React from "react";

function CancelButton(props) {
  const { handleDeleteNewestField } = props;
  
  return (
    <button
      className="ml-1 mt-4 mr-2 bg-white px-1 text-green-400 hover:text-green-600 duration-300 w-16 py-2 rounded mr- border border-green-400 hover:border-green-600"
      onClick={handleDeleteNewestField}
      type="button"
    >
      Cancel
    </button>
  );
}

export default CancelButton;
