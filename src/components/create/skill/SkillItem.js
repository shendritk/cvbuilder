import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function SkillItem(props) {
  const { handleDeleteSkill, handleEditSkill, skill } = props;

  const handleDeleteIconClick = () => {
    handleDeleteSkill(skill.id);
  };

  const handleEditIconClick = () => {
    handleEditSkill(skill);
  };

  return (
    <div className="skill relative mb-2 px-2 py-1 w-full bg-white shadow-sm border-l-4 border-green-400 rounded-sm">
      <div className="skill__icons">
        <DeleteIcon onClick={handleDeleteIconClick} />
        <EditIcon onClick={handleEditIconClick} />
      </div>

      <span>{skill.name} : </span>
      <span className="text-green-500">{skill.progress}%</span>
    </div>
  );
}

export default SkillItem;
