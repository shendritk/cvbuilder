import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function ReferenceItem(props) {
  const { reference, handleDeleteReference, handleEditReference } = props;

  const handleDeleteIconClick = () => {
    handleDeleteReference(reference.id);
  };

  const handleEditIconClick = () => {
    handleEditReference(reference);
  };

  return (
    <div className="reference relative text-center flex flex-col inline-block bg-white rounded shadow-md overflow-hidden w-1/3 xl:w-2/3 mt-4 items-center">
      <div className="reference__icons experience__icons">
        <DeleteIcon onClick={handleDeleteIconClick} />
        <EditIcon onClick={handleEditIconClick} />
      </div>

      <span className="bg-green-400 w-full text-center text-white">
        {reference.fullName}
      </span>
      <span>{reference.profession}</span>
      <span>{reference.phoneNumber}</span>
    </div>
  );
}

export default ReferenceItem;
