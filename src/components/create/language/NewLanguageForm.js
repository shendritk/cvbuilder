import React from "react";
import InputText from "../../inputs/InputText";
import CancelButton from "../../buttons/CancelButton";
import SaveButton from "../../buttons/SaveButton";

function NewLanguageForm(props) {
  const {
    input,
    handleSaveNewField,
    handleCancelNewField,
    handleInputChange,
  } = props;

  return (
    <form onSubmit={handleSaveNewField}>
      <div className="flex items-center">
        <InputText
          value={input.name}
          name="name"
          placeholder="English"
          label="Language"
          width="1/2"
          handleChangeValue={handleInputChange}
        />

        {/* DROPDOWN */}
        <div class="w-1/2 md:w-1/2 px-3 mb-6 md:mb-0 mt-4">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="level"
          >
            Level
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="level"
              name="level"
              value={input.level}
              onChange={handleInputChange}
            >
              <option defaultValue>Native</option>
              <option>Fluent</option>
              <option>A1</option>
              <option>A2</option>
              <option>B1</option>
              <option>B2</option>
              <option>C1</option>
              <option>C2</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

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

export default NewLanguageForm;
