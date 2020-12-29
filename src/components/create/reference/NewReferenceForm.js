import React from "react";
import SaveButton from "../../buttons/SaveButton";
import CancelButton from "../../buttons/CancelButton";
import InputText from "../../inputs/InputText";

function NewReferenceForm(props) {
  const {
    input,
    handleSaveNewField,
    handleCancelNewField,
    handleCurrentFullNameChange,
    handleCurrentProfessionChange,
    handleCurrentPhoneNumberChange,
    handleCurrentEmailChange,
  } = props;

  return (
    <form className="flex-col align-center" onSubmit={handleSaveNewField}>
      <div className="flex">
        <InputText
          value={input.fullName}
          name="fullName"
          placeholder="Jeffery Martin"
          label="Full Name"
          width="1/2"
          handleChangeValue={handleCurrentFullNameChange}
        />
        <InputText
          value={input.profession}
          name="profession"
          placeholder="Chief Executive Officer"
          label="Profession"
          width="1/2"
          handleChangeValue={handleCurrentProfessionChange}
        />
      </div>
      <div className="flex flex-col">
        <InputText
          value={input.phoneNumber}
          name="phoneNumber"
          placeholder="631-951-5828"
          label="Phone Number"
          width="2/2"
          handleChangeValue={handleCurrentPhoneNumberChange}
        />

        <InputText
          value={input.email}
          name="email"
          placeholder="Stanford University"
          label="Email"
          width="2/2"
          handleChangeValue={handleCurrentEmailChange}
        />

        {/* CANCEL - SAVE BUTTONS */}
        <div className="ml-auto">
          <CancelButton handleDeleteNewestField={handleCancelNewField} />
          <SaveButton handleSaveNewField={handleSaveNewField} />
        </div>
      </div>
    </form>
  );
}

export default NewReferenceForm;
