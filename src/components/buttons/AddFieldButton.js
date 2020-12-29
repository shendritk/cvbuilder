import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function AddFieldButton(props) {
  const { handleAddNewField } = props;
  
  return (
    <div
      className="flex items-center w-32 mt-8 hover:bg-green-500 duration-300 py-2 px-2 rounded-full bg-green-400"
      onClick={handleAddNewField}
      style={{ color: "#f7fafc" }}
      type="button"
    >
      <AddCircleIcon />
      <button className="ml-2 border-none focus:outline-none">Add field</button>
    </div>
  );
}

export default AddFieldButton;
