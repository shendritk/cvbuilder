import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import AddFieldButton from "../../buttons/AddFieldButton";
import ExperienceItem from "./ExperienceItem";
import TemplateContext from "../../utils/TemplateContext";
import NewExperienceForm from "./NewExperienceForm";
import "../../styles/extra.css";

function Experience() {
  const defaultExperienceValues = {
    startedAt: "",
    completedAt: "",
    company: "",
    position: "",
    description: "",
  };

  const [addNewExperienceActive, setAddNewExperienceActive] = useState(false);
  const [input, setInput] = useState(defaultExperienceValues);
  const [editModeActive, setEditModeActive] = useState(false);
  const [editExperienceId, setEditExperienceId] = useState(-1);

  const state = useContext(TemplateContext);
  const { experiences } = state.values.categories;

  useEffect(() => {
    if (experiences.length === 0) {
      handleAddNewField();
      setAddNewExperienceActive(true);
    }

    // This should intentionally run only once so eslint warning can be disabled.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });

    if (editModeActive) return;

    state.setNewestCategoryItemProperty("experiences", name, value);
  };

  const handleAddNewField = () => {
    setAddNewExperienceActive(true);
    state.addNewCategoryItem("experiences", defaultExperienceValues);
  };

  const handleCancelNewField = () => {
    setAddNewExperienceActive(false);
    setInput(defaultExperienceValues);

    if (!editModeActive) {
      state.deleteNewestCategoryItem("experiences");
    }
  };

  const handleSaveNewField = (e) => {
    e.preventDefault();

    if (
      input.startedAt === "" &&
      input.completedAt === "" &&
      input.position === "" &&
      input.company === "" &&
      input.description === ""
    ) {
      toast.error("All fields cannot be empty.");
      return;
    }

    if (editModeActive) {
      state.editCategoryItem("experiences", { id: editExperienceId, ...input });

      setEditModeActive(false);
    }

    setInput(defaultExperienceValues);
    setAddNewExperienceActive(false);
  };

  const handleEditExperience = (experience) => {
    // Handle the case when a user tries to edit another field while the currently being added field is empty.
    // In this case that lat empty field is useless so we can delete it.
    const isLastExperienceEmpty = Object.keys(defaultExperienceValues).every(
      (field) => experiences[experiences.length - 1][field] === ""
    );

    if (isLastExperienceEmpty) {
      state.deleteNewestCategoryItem("experiences");
    }

    setAddNewExperienceActive(true);
    setInput(experience);
    setEditExperienceId(experience.id);
    setEditModeActive(true);
  };

  const handleDeleteExperience = (experienceId) => {
    // Check if user is trying to delete the field which is currently being edited.
    if (experienceId === editExperienceId) {
      setAddNewExperienceActive(false);
      setInput(defaultExperienceValues);
      setEditModeActive(false);
    }

    // Check if user is trying to delete the same field which he's also filling/adding
    if (experienceId === experiences[experiences.length - 1].id) {
      setAddNewExperienceActive(false);
      setInput(input);
    }

    state.deleteCategoryItem("experiences", experienceId);
  };

  return (
    <div>
      <div className="inline-block h-auto relative text-gray-800">
        <h2 className="text-xl font-bold mt-4 mb-4">Experience</h2>
      </div>
      {/* EXPERIENCES LIST */}
      {experiences.map((experience) => (
        <ExperienceItem
          handleDeleteExperience={handleDeleteExperience}
          handleEditExperience={handleEditExperience}
          experience={experience}
          key={experience.id}
        />
      ))}

      {/* ADD NEW EXPERIENCE SECTION */}
      {addNewExperienceActive && (
        <NewExperienceForm
          input={input}
          handleSaveNewField={handleSaveNewField}
          handleCancelNewField={handleCancelNewField}
          handleInputChange={handleInputChange}
        />
      )}

      {/* ADD FIELD BUTTON */}
      {!addNewExperienceActive && (
        <AddFieldButton handleAddNewField={handleAddNewField} />
      )}
    </div>
  );
}

export default Experience;
