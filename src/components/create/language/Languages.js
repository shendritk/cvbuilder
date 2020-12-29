import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import AddFieldButton from "../../buttons/AddFieldButton";
import LanguageItem from "./LanguageItem";
import TemplateContext from "../../utils/TemplateContext";
import NewLanguageForm from "./NewLanguageForm";
import "../../styles/extra.css";

function Languages() {
  const defaultLanguageValues = { name: "", level: "Native" };
  const [addNewLanguageActive, setAddNewLanguageActive] = useState(false);
  const [input, setInput] = useState(defaultLanguageValues);
  const [editModeActive, setEditModeActive] = useState(false);
  const [editLanguageId, setEditLanguageId] = useState(-1);

  const state = useContext(TemplateContext);
  const { languages } = state.values.categories;

  useEffect(() => {
    if (languages.length === 0) {
      handleAddNewField();
      setAddNewLanguageActive(true);
    }

    // This should intentionally run only once so eslint warning can be disabled.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });

    if (editModeActive) return;

    state.setNewestCategoryItemProperty("languages", name, value);
  };

  const handleAddNewField = () => {
    setAddNewLanguageActive(true);
    state.addNewCategoryItem("languages", defaultLanguageValues);
  };

  const handleCancelNewField = () => {
    setAddNewLanguageActive(false);
    setInput(defaultLanguageValues);

    if (!editModeActive) {
      state.deleteNewestCategoryItem("languages");
    }
  };

  const handleSaveNewField = (e) => {
    e.preventDefault();

    if (input.name.length < 3) {
      toast.error("Language name cannot be empty");
      return;
    }

    if (editModeActive) {
      state.editCategoryItem("languages", { id: editLanguageId, ...input });

      setEditModeActive(false);
    }

    setInput(defaultLanguageValues);
    setAddNewLanguageActive(false);
  };

  const handleEditLanguage = (language) => {
    // Handle the case when a user tries to edit another field while the currently being added field is emtpy.
    // In this case that lat empty field is useless so we can delete it.
    if (languages[languages.length - 1].name === "") {
      state.deleteNewestCategoryItem("languages");
    }

    setAddNewLanguageActive(true);
    setInput({ name: language.name, level: language.level });
    setEditLanguageId(language.id);
    setEditModeActive(true);
  };

  const handleDeleteLanguage = (languageId) => {
    // Check if we are trying to delete the field which is currently being edited.
    if (languageId === editLanguageId) {
      setAddNewLanguageActive(false);
      setInput(defaultLanguageValues);
      setEditModeActive(false);
    }

    // Check if we are trying to delete the same field which we are also filling/adding
    if (languageId === languages[languages.length - 1].id) {
      setAddNewLanguageActive(false);
      setInput(defaultLanguageValues);
    }

    state.deleteCategoryItem("languages", languageId);
  };

  return (
    <div>
      <div className="inline-block h-auto relative text-gray-800">
        <h2 className="text-xl font-bold mt-4 mb-8">Languages</h2>
      </div>

      {/* LANGUAGES LIST */}
      {languages.map((language) => (
        <LanguageItem
          handleDeleteLanguage={handleDeleteLanguage}
          handleEditLanguage={handleEditLanguage}
          language={language}
          key={language.id}
        />
      ))}

      {/* ADD NEW LANGUAGE SECTION */}
      {addNewLanguageActive && (
        <NewLanguageForm
          input={input}
          handleSaveNewField={handleSaveNewField}
          handleCancelNewField={handleCancelNewField}
          handleInputChange={handleInputChange}
        />
      )}

      {/* ADD FIELD BUTTON */}
      {!addNewLanguageActive && (
        <AddFieldButton handleAddNewField={handleAddNewField} />
      )}
    </div>
  );
}

export default Languages;
