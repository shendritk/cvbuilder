import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import AddFieldButton from "../../buttons/AddFieldButton";
import EducationItem from "./EducationItem";
import NewEducationForm from "./NewEducationForm";
import TemplateContext from "../../utils/TemplateContext";
import "../../styles/extra.css";

function Education() {
  const defaultEducationValues = {
    startedAt: "",
    completedAt: "",
    institution: "",
    studyField: "",
    description: "",
  };

  const [addNewEducationActive, setAddNewEducationActive] = useState(false);
  const [input, setInput] = useState(defaultEducationValues);
  const [editModeActive, setEditModeActive] = useState(false);
  const [editEducationId, setEditEducationId] = useState(-1);

  const state = useContext(TemplateContext);
  const { education } = state.values.categories;

  useEffect(() => {
    if (education.length === 0) {
      handleAddNewField();
      setAddNewEducationActive(true);
    }

    // This should intentionally run only once so eslint warning can be disabled.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });

    if (editModeActive) return;

    state.setNewestCategoryItemProperty("education", name, value);
  };

  const handleAddNewField = () => {
    setAddNewEducationActive(true);
    state.addNewCategoryItem("education", defaultEducationValues);
  };

  const handleCancelNewField = () => {
    setAddNewEducationActive(false);
    setInput(defaultEducationValues);

    if (!editModeActive) {
      state.deleteNewestCategoryItem("education");
    }
  };

  const handleSaveNewField = (e) => {
    e.preventDefault();

    if (
      input.startedAt === "" &&
      input.completedAt === "" &&
      input.institution === "" &&
      input.studyField === "" &&
      input.description === ""
    ) {
      toast.error("All fields cannot be empty.");
      return;
    }

    if (editModeActive) {
      state.editCategoryItem("education", { ...input, id: editEducationId });

      setEditModeActive(false);
    }

    setInput(defaultEducationValues);
    setAddNewEducationActive(false);
  };

  const handleEditEducation = (education) => {
    setAddNewEducationActive(true);
    setInput(education);
    setEditEducationId(education.id);
    setEditModeActive(true);
  };

  const handleDeleteEducation = (educationId) => {
    // Check if user is trying to delete the field which is currently being edited.
    if (educationId === editEducationId) {
      setAddNewEducationActive(false);
      setInput(defaultEducationValues);
      setEditModeActive(false);
    }

    // Check if user is trying to delete the same field which he's also filling/adding
    if (educationId === education[education.length - 1].id) {
      setAddNewEducationActive(false);
      setInput(input);
    }

    state.deleteCategoryItem("education", educationId);
  };

  return (
    <div>
      <div className="inline-block h-auto relative text-gray-800">
        <h2 className="text-xl font-bold mt-4 mb-4">Education</h2>
      </div>

      {/* EDUCATION LIST */}
      {education.map((ed) => (
        <EducationItem
          ed={ed}
          handleDeleteEducation={handleDeleteEducation}
          handleEditEducation={handleEditEducation}
          key={ed.id}
        />
      ))}
      {/* ADD NEW REFERENCE SECTION */}
      {addNewEducationActive && (
        <NewEducationForm
          input={input}
          handleSaveNewField={handleSaveNewField}
          handleCancelNewField={handleCancelNewField}
          handleInputChange={handleInputChange}
        />
      )}
      {/* ADD FIELD BUTTON */}
      {!addNewEducationActive && (
        <AddFieldButton handleAddNewField={handleAddNewField} />
      )}
    </div>
  );
}

export default Education;
