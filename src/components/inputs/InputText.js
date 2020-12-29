import React from "react";

function InputText(props) {
  const { value, handleChangeValue, label, name, placeholder, type, mb } = props;
  return (
    <div className={`w-full px-3 mb-${mb || 6} md:mb-0 mt-4`}>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:border-gray-300"
        id={name}
        name={name}
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={handleChangeValue}
      />
    </div>
  );
}

export default InputText;
