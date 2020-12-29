import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import AddFieldButton from "../../buttons/AddFieldButton";
import HoobyItem from "./HoobyItem";
import TemplateContext from "../../utils/TemplateContext";
import NewHoobyForm from "./NewHoobyForm";
import "../../styles/extra.css";

function Hoobies() {
  const [addNewHoobyActive, setAddNewHoobyActive] = useState(false);
  const [currentHoobyName, setCurrentHoobyName] = useState("");
  const [editModeActive, setEditModeActive] = useState(false);
  const [editHoobyId, setEditHoobyId] = useState(-1);

  const state = useContext(TemplateContext);
  const { hoobies } = state.values.categories;

  useEffect(() => {
    if (hoobies.length === 0) {
      setAddNewHoobyActive(true);
      handleAddNewField();
    }

    // This should intentionally run only once so eslint warning can be disabled.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCurrentHoobyNameChange = (e) => {
    setCurrentHoobyName(e.target.value);

    if (editModeActive) return;

    state.setNewestCategoryItemProperty("hoobies", "name", e.target.value);
  };

  const handleAddNewField = () => {
    setAddNewHoobyActive(true);

    state.addNewCategoryItem("hoobies", { name: "" });
  };

  const handleCancelNewField = () => {
    setCurrentHoobyName("");
    setAddNewHoobyActive(false);

    if (!editModeActive) {
      state.deleteNewestCategoryItem("hoobies");
    }
  };

  const handleSaveNewField = (e) => {
    e.preventDefault();

    if (currentHoobyName.length < 3) {
      toast.error("Skill name must be longer than 3 characters");
      return;
    }

    if (editModeActive) {
      state.editCategoryItem("hoobies", {
        id: editHoobyId,
        name: currentHoobyName,
      });

      setEditModeActive(false);
    }

    setCurrentHoobyName("");
    setAddNewHoobyActive(false);
  };

  const handleEditHooby = (hooby) => {
    // Handle the case when a user tries to edit another field while the currently being added field is emtpy.
    // In this case that lat empty field is useless so we can delete it.
    if (hoobies[hoobies.length - 1].name === "") {
      state.deleteNewestCategoryItem("hoobies");
    }

    setAddNewHoobyActive(true);
    setCurrentHoobyName(hooby.name);
    setEditHoobyId(hooby.id);
    setEditModeActive(true);
  };

  const handleDeleteHooby = (hoobyId) => {
    // Check if we are trying to delete the field which is currently being edited.
    if (hoobyId === editHoobyId) {
      setAddNewHoobyActive(false);
      setCurrentHoobyName("");
      setEditModeActive(false);
    }

    // Check if we are trying to delete the same field which we are also filling/adding
    if (hoobyId === hoobies[hoobies.length - 1].id) {
      setAddNewHoobyActive(false);
      setCurrentHoobyName("");
    }

    state.deleteCategoryItem("hoobies", hoobyId);
  };

  return (
    <div>
      <div className="inline-block h-auto relative text-gray-800">
        <h2 className="text-xl font-bold mt-4 mb-8">Hoobies</h2>
      </div>

      {/* HOOBIES LIST */}
      <div className="w-1/4 md:w-3/4">
        {hoobies.map((hooby) => (
          <HoobyItem
            handleDeleteHooby={handleDeleteHooby}
            handleEditHooby={handleEditHooby}
            hooby={hooby}
            key={hooby.id}
          />
        ))}
      </div>

      {/* ADD NEW HOOBY SECTION */}
      {addNewHoobyActive && (
        <NewHoobyForm
          currentHoobyName={currentHoobyName}
          handleSaveNewField={handleSaveNewField}
          handleCancelNewField={handleCancelNewField}
          handleCurrentHoobyNameChange={handleCurrentHoobyNameChange}
        />
      )}

      {/* ADD FIELD BUTTON */}
      {!addNewHoobyActive && (
        <AddFieldButton handleAddNewField={handleAddNewField} />
      )}
    </div>
  );
}

export default Hoobies;
