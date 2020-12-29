import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function LanguageItem(props) {
  const { handleDeleteLanguage, handleEditLanguage, language } = props;

  const handleDeleteIconClick = () => {
    handleDeleteLanguage(language.id);
  };

  const handleEditIconClick = () => {
    handleEditLanguage(language);
  };

  return (
    <div
      className="language flex w-1/3 md:w-2/3 mb-2 relative rounded-sm"
      key={language.name}
    >
      <div className="language__icons">
        <DeleteIcon onClick={handleDeleteIconClick} />
        <EditIcon onClick={handleEditIconClick} />
      </div>
      <div className="language__level w-1/3 bg-green-400 px-2 py-1 text-white text-bold flex justify-center items-center">
        {language.level}
      </div>
      <div className="language__name px-2 py-1 w-full bg-white shadow-sm border border-gray-200">
        {language.name}
      </div>
    </div>
  );
}

export default LanguageItem;
