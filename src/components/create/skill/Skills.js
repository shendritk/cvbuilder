import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import AddFieldButton from "../../buttons/AddFieldButton";
import SkillItem from "./SkillItem";
import TemplateContext from "../../utils/TemplateContext";
import NewSkillForm from "./NewSkillForm";
import "rc-slider/assets/index.css";
import "../../styles/extra.css";

function Skills() {
  const [addNewSkillActive, setAddNewSkillActive] = useState(false);
  const [currentSkillName, setCurrentSkillName] = useState("");
  const [currentSkillProgress, setCurrentSkillProgress] = useState(0);
  const [editModeActive, setEditModeActive] = useState(false);
  const [editSkillId, setEditSkillId] = useState(-1);

  const state = useContext(TemplateContext);
  const { skills } = state.values.categories;

  useEffect(() => {
    if (skills.length === 0) {
      handleAddNewField();
      setAddNewSkillActive(true);
    }

    // This should intentionally run only once so eslint warning can be disabled.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCurrentSkillNameChange = (e) => {
    setCurrentSkillName(e.target.value);

    if (editModeActive) return;

    state.setNewestCategoryItemProperty("skills", "name", e.target.value);
  };

  const handleCurrentSkillProgressChange = (value) => {
    setCurrentSkillProgress(value);

    if (editModeActive) return;

    state.setNewestCategoryItemProperty("skills", "progress", value);
  };

  const handleAddNewField = () => {
    setAddNewSkillActive(true);
    state.addNewCategoryItem("skills", { name: "", progress: 0 });
  };

  const handleCancelNewField = () => {
    setCurrentSkillName("");
    setAddNewSkillActive(false);
    setCurrentSkillProgress(0);

    if (!editModeActive) {
      state.deleteNewestCategoryItem("skills");
    }
  };

  const handleSaveNewField = (e) => {
    e.preventDefault();

    if (currentSkillName.length < 3) {
      toast.error("Skill name must be longer than 3 characters");
      return;
    }

    if (currentSkillProgress === 0) {
      toast.error("Slider value must be larger than 0");
      return;
    }

    if (editModeActive) {
      state.editCategoryItem("skills", {
        id: editSkillId,
        name: currentSkillName,
        progress: currentSkillProgress,
      });

      setEditModeActive(false);
    }

    setCurrentSkillName("");
    setAddNewSkillActive(false);
    setCurrentSkillProgress(0);
  };

  const handleEditSkill = (skill) => {
    // Handle the case when a user tries to edit another field while the currently being added field is emtpy.
    // In this case that lat empty field is useless so we can delete it.
    if (skills[skills.length - 1].name === "") {
      state.deleteNewestCategoryItem("skills");
    }

    setAddNewSkillActive(true);
    setCurrentSkillName(skill.name);
    setCurrentSkillProgress(skill.progress);
    setEditSkillId(skill.id);
    setEditModeActive(true);
  };

  const handleDeleteSkill = (skillId) => {
    // Check if we are trying to delete the field which is currently being edited.
    if (editSkillId === skillId) {
      setAddNewSkillActive(false);
      setCurrentSkillName("");
      setCurrentSkillProgress(0);
      setEditModeActive(false);
    }

    // Check if we are trying to delete the same field which we are also filling/adding
    if (skillId === skills[skills.length - 1].id) {
      setAddNewSkillActive(false);
      setCurrentSkillName("");
      setCurrentSkillProgress(0);
    }

    state.deleteCategoryItem("skills", skillId);
  };

  return (
    <div>
      <div className="w-1/3 md:w-2/3 h-auto">
        <div className="text-xl font-bold mt-4 mb-8">Skills</div>

        {skills.map((skill) => (
          <SkillItem
            handleDeleteSkill={handleDeleteSkill}
            handleEditSkill={handleEditSkill}
            skill={skill}
            key={skill.id}
          />
        ))}

        {!addNewSkillActive && (
          <AddFieldButton handleAddNewField={handleAddNewField} />
        )}
      </div>

      {addNewSkillActive && (
        <NewSkillForm
          currentSkillName={currentSkillName}
          currentSkillProgress={currentSkillProgress}
          handleSaveNewField={handleSaveNewField}
          handleCancelNewField={handleCancelNewField}
          handleCurrentSkillNameChange={handleCurrentSkillNameChange}
          handleCurrentSkillProgressChange={handleCurrentSkillProgressChange}
        />
      )}
    </div>
  );
}

export default Skills;
