import React from "react";
import CancelButton from "../../buttons/CancelButton";
import SaveButton from "../../buttons/SaveButton";
import InputText from "../../inputs/InputText";
import InputTextArea from "../../inputs/InputTextArea";

function NewExperienceForm(props) {
  const {
    input,
    handleSaveNewField,
    handleCancelNewField,
    handleInputChange,
  } = props;

  return (
    <form className="flex-col align-center" onSubmit={handleSaveNewField}>
      <div className="flex">
        <InputText
          value={input.startedAt}
          name="startedAt"
          placeholder="01/01/2020"
          label="Started At"
          width="1/2"
          handleChangeValue={handleInputChange}
        />
        <InputText
          value={input.completedAt}
          name="completedAt"
          placeholder="01/06/2020"
          label="Completed At"
          width="1/2"
          handleChangeValue={handleInputChange}
        />
      </div>
      <div className="flex flex-col">
        <InputText
          value={input.position}
          name="position"
          placeholder="Full Stack Developer"
          label="Job position"
          width="2/2"
          handleChangeValue={handleInputChange}
        />

        <InputText
          value={input.company}
          name="company"
          placeholder="Amazon"
          label="Company"
          width="2/2"
          handleChangeValue={handleInputChange}
        />

        <InputTextArea
          value={input.description}
          name="description"
          placeholder="Write something about the experience..."
          label="Description"
          width="2/2"
          handleChangeValue={handleInputChange}
        />

        {/* SAVE-CANCEL BUTTONS */}
        <div className="ml-auto">
          <CancelButton handleDeleteNewestField={handleCancelNewField} />
          <SaveButton handleSaveNewField={handleSaveNewField} />
        </div>
      </div>
    </form>
  );
}

export default NewExperienceForm;
