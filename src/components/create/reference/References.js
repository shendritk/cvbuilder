import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import AddFieldButton from "../../buttons/AddFieldButton";
import NewReferenceForm from "./NewReferenceForm";
import TemplateContext from "../../utils/TemplateContext";
import ReferenceItem from "./ReferenceItem";
import "../../styles/extra.css";

function References() {
  const defaultReferencesValues = {
    fullName: "",
    profession: "",
    phoneNumber: "",
    email: "",
  };

  const [addNewReferencesActive, setAddNewReferenceActive] = useState(false);
  const [input, setInput] = useState(defaultReferencesValues);
  const [editModeActive, setEditModeActive] = useState(false);
  const [editReferenceId, setEditReferenceId] = useState(-1);

  const state = useContext(TemplateContext);
  const { references } = state.values.categories;

  useEffect(() => {
    if (references.length === 0) {
      setAddNewReferenceActive(true);
      handleAddNewField();
    }

    // This should intentionally run only once so eslint warning can be disabled.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCurrentFullNameChange = (e) => {
    setInput({ ...input, fullName: e.target.value });

    if (editModeActive) return;

    state.setNewestCategoryItemProperty(
      "references",
      "fullName",
      e.target.value
    );
  };

  const handleCurrentProfessionChange = (e) => {
    setInput({ ...input, profession: e.target.value });

    if (editModeActive) return;

    state.setNewestCategoryItemProperty(
      "references",
      "profession",
      e.target.value
    );
  };

  const handleCurrentPhoneNumberChange = (e) => {
    setInput({ ...input, phoneNumber: e.target.value });

    if (editModeActive) return;

    state.setNewestCategoryItemProperty(
      "references",
      "phoneNumber",
      e.target.value
    );
  };

  const handleCurrentEmailChange = (e) => {
    setInput({ ...input, email: e.target.value });

    if (editModeActive) return;

    state.setNewestCategoryItemProperty("references", "email", e.target.value);
  };

  const handleAddNewField = () => {
    setAddNewReferenceActive(true);
    state.addNewCategoryItem("references", defaultReferencesValues);
  };

  const handleCancelNewField = () => {
    setAddNewReferenceActive(false);
    setInput(defaultReferencesValues);

    if (!editModeActive) {
      state.deleteNewestCategoryItem("references");
    }
  };

  const handleSaveNewField = (e) => {
    e.preventDefault();

    if (
      input.fullName === "" &&
      input.profession === "" &&
      input.phoneNumber === "" &&
      input.email === ""
    ) {
      toast.error("All fields cannot be empty.");
      return;
    }

    if (editModeActive) {
      state.editCategoryItem("references", { id: editReferenceId, ...input });

      setEditModeActive(false);
    }

    setInput(defaultReferencesValues);
    setAddNewReferenceActive(false);
  };

  const handleEditReference = (reference) => {
    // Handle the case when a user tries to edit another field while the currently being added field is empty.
    // In this case that lat empty field is useless so we can delete it.
    const isLastReferenceEmpty = Object.keys(defaultReferencesValues).every(
      (field) => references[references.length - 1][field] === ""
    );

    if (isLastReferenceEmpty) {
      state.deleteNewestCategoryItem("references");
    }

    setAddNewReferenceActive(true);
    setInput(reference);
    setEditReferenceId(reference.id);
    setEditModeActive(true);
  };

  const handleDeleteReference = (referenceId) => {
    // Check if user is trying to delete the field which is currently being edited.
    if (referenceId === editReferenceId) {
      setAddNewReferenceActive(false);
      setInput(defaultReferencesValues);
      setEditModeActive(false);
    }

    // Check if user is trying to delete the same field which he's also filling/adding
    if (referenceId === references[references.length - 1].id) {
      setAddNewReferenceActive(false);
      setInput(input);
    }

    state.deleteCategoryItem("references", referenceId);
  };

  return (
    <div>
      <div className="inline-block h-auto relative text-gray-800">
        <h2 className="text-xl font-bold mt-4 mb-4">References</h2>
      </div>

      {/* REFERENCE LIST */}
      {references.map((reference) => (
        <ReferenceItem
          reference={reference}
          handleDeleteReference={handleDeleteReference}
          handleEditReference={handleEditReference}
          key={reference.id}
        />
      ))}
      {/* ADD NEW REFERENCE SECTION */}
      {addNewReferencesActive && (
        <NewReferenceForm
          input={input}
          handleSaveNewField={handleSaveNewField}
          handleCancelNewField={handleCancelNewField}
          handleCurrentFullNameChange={handleCurrentFullNameChange}
          handleCurrentProfessionChange={handleCurrentProfessionChange}
          handleCurrentPhoneNumberChange={handleCurrentPhoneNumberChange}
          handleCurrentEmailChange={handleCurrentEmailChange}
        />
      )}

      {/* ADD FIELD BUTTON */}
      {!addNewReferencesActive && (
        <AddFieldButton handleAddNewField={handleAddNewField} />
      )}
    </div>
  );
}

export default References;
