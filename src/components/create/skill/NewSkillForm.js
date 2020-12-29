import React from "react";
import Slider from "rc-slider";
import InputText from "../../inputs/InputText";
import CancelButton from "../../buttons/CancelButton";
import SaveButton from "../../buttons/SaveButton";

function NewSkillForm(props) {
  const {
    currentSkillName,
    currentSkillProgress,
    handleSaveNewField,
    handleCancelNewField,
    handleCurrentSkillNameChange,
    handleCurrentSkillProgressChange,
  } = props;

  return (
    <form
      className="flex flex-col flex-wrap -mx-3 mb-6"
      onSubmit={handleSaveNewField}
    >
      {/* SKILL NAME INPUT FIELD */}
      <InputText
        label="Skill"
        id="skill"
        name="skill"
        placeholder="Time Management"
        value={currentSkillName}
        handleChangeValue={handleCurrentSkillNameChange}
      />

      {/* SLIDER FUNCTIONALITY */}
      <h2 className="font-bold ml-4 text-xs uppercase">Progress</h2>
      <div className="flex px-4 items-center">
        <Slider
          step={10}
          defaultValue={currentSkillProgress}
          onChange={handleCurrentSkillProgressChange}
        />
        <h2 className="ml-6 text-lg font-bold">{currentSkillProgress}</h2>
      </div>

      {/* CANCEL-SAVE BUTTONS */}
      <div className="ml-auto">
        <CancelButton handleDeleteNewestField={handleCancelNewField} />
        <SaveButton handleSaveNewField={handleSaveNewField} />
      </div>
    </form>
  );
}

export default NewSkillForm;
