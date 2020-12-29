import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function EducationItem(props) {
  const { ed, handleDeleteEducation, handleEditEducation } = props;

  const handleDeleteIconClick = () => {
    handleDeleteEducation(ed.id);
  };

  const handleEditIconClick = () => {
    handleEditEducation(ed);
  };

  return (
    <div className="education relative flex flex-col text-center inline-block bg-white rounded shadow-md overflow-hidden w-1/3 xl:w-2/3 mt-4 items-center">
      <div className="education__icons experience__icons">
        <DeleteIcon onClick={handleDeleteIconClick} />
        <EditIcon onClick={handleEditIconClick} />
      </div>

      <span className="bg-green-400 w-full text-center text-white">{`${ed.startedAt} - ${ed.completedAt}`}</span>
      <span>{ed.studyField}</span>
      <span>{ed.institution}</span>
    </div>
  );
}

export default EducationItem;
