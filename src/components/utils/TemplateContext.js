import React from "react";

const defaultValue = {
  categories: [
    {
      category: "Contact",
      values: [
        { fieldName: "Address", value: "" },
        { fieldName: "Phone", value: "" },
        { fieldName: "Email", value: "" },
        { fieldName: "Website", value: "" },
      ],
    },

    { category: "Skills", values: [] },
    { category: "Languages", values: [] },
    { category: "Hoobies", values: [] },
    { category: "Experience", values: [] },
    { category: "Education", values: [] },
    { category: "References", values: [] },
  ],
};

const TemplateContext = React.createContext(defaultValue);

export default TemplateContext;
