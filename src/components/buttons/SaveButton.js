import React from "react";

function SaveButton(props) {
  const { handleSaveNewField } = props;

  return (
    <button
      className="ml-1 mt-4 bg-green-400 hover:bg-green-500 duration-300 px-1 text-white w-16 py-2 rounded mr-4 ml-auto"
      onClick={handleSaveNewField}
      type="submit"
    >
      Save
    </button>
  );
}

export default SaveButton;
