import React from "react";
import TemplateOneImage from "../assets/img/template1.png";
import TemplateTwoImage from "../assets/img/template2.png";

function DashboardTemplates() {
  return (
    <div className="flex flex-col pt-16 justify-center items-center mt-4">
      <img
        className="mr-16 shadow-md lg:scale-75 transform scale-105 hover:-translate-y-4 transition duration-500 ease-in-out p-1 border-1 border-gray-500"
        src={TemplateOneImage}
        alt="Template One Preview"
      />
      <img
        className="shadow-md mt-20 -ml-16 lg:scale-75 transform scale-105 hover:-translate-y-4 transition duration-500 ease-in-out p-1 border-1 border-gray-500"
        src={TemplateTwoImage}
        alt="Template Two Preview"
      />
    </div>
  );
}

export default DashboardTemplates;
