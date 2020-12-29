import React from "react";
import InputText from "../../inputs/InputText";
import CancelButton from "../../buttons/CancelButton";
import SaveButton from "../../buttons/SaveButton";

function NewHoobyForm(props) {
  const {
    currentHoobyName,
    handleSaveNewField,
    handleCancelNewField,
    handleCurrentHoobyNameChange,
  } = props;

  return (
    <form className="flex-col align-center mt-8" onSubmit={handleSaveNewField}>
      <InputText
        value={currentHoobyName}
        name="hooby"
        placeholder="Fitness"
        label="Hooby"
        width="1/2"
        handleChangeValue={handleCurrentHoobyNameChange}
      />
      {/* CANCEL-SAVE BUTTONS */}
      <div className="flex justify-end">
        <div>
          <CancelButton handleDeleteNewestField={handleCancelNewField} />
          <SaveButton handleSaveNewField={handleSaveNewField} />
        </div>
      </div>
    </form>
  );
}

export default NewHoobyForm;
