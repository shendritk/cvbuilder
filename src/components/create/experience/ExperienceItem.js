import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function ExperienceItem(props) {
  const { handleDeleteExperience, handleEditExperience, experience } = props;

  const handleDeleteIconClick = () => {
    handleDeleteExperience(experience.id);
  };

  const handleEditIconClick = () => {
    handleEditExperience(experience);
  };

  return (
    <div className="experience relative flex flex-col text-center inline-block bg-white rounded shadow-md overflow-hidden w-1/3 xl:w-2/3 mt-4 items-center">
      <div className="experience__icons">
        <DeleteIcon onClick={handleDeleteIconClick} />
        <EditIcon onClick={handleEditIconClick} />
      </div>

      <div className="experience__duration bg-green-400 w-full text-center text-white">{`${experience.startedAt} - ${experience.completedAt}`}</div>
      <span>{experience.position}</span>
      <span>{experience.company}</span>
    </div>
  );
}

export default ExperienceItem;
