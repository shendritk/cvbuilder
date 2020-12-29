import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function HoobyItem(props) {
  const { handleDeleteHooby, handleEditHooby, hooby } = props;

  const handleDeleteIconClick = () => {
    handleDeleteHooby(hooby.id);
  };

  const handleEditIconClick = () => {
    handleEditHooby(hooby);
  };

  return (
    <div className="hooby relative w-full mb-2 px-2 py-1 w-full bg-white shadow-sm border-l-4 border-green-400 rounded-sm">
      <div className="hooby__icons">
        <DeleteIcon onClick={handleDeleteIconClick} />
        <EditIcon onClick={handleEditIconClick} />
      </div>

      <span className="hooby_name">{hooby.name}</span>
    </div>
  );
}

export default HoobyItem;
