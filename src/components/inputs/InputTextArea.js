import React from "react";

function InputTextArea(props) {
  const { value, handleChangeValue, label, name, width, placeholder } = props;
  return (
    <div className={`w-full md:w-${width} px-3 mb-6 md:mb-0`}>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-4 mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <textarea
        className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChangeValue}
        required
        rows="6"
      ></textarea>
    </div>
  );
}

export default InputTextArea;
