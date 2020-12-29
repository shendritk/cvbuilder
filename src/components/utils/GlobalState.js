import React, { useState } from "react";
import TemplateContext from "./TemplateContext";
import initialState from "./state";

function GlobalState({ children }) {
  const [info, setInfo] = useState(initialState);

  const addUser = (user) => {
    setInfo({ ...info, user });
  };

  const addTemplate = (templateNumber) => {
    setInfo({ ...info, template: templateNumber });
  };

  const addNewCategoryItem = (category, objectToAdd) => {
    const length = info.categories[category].length;

    // Get the last item on the array and add 1 so each new item has a unique id.
    let id;
    if (length === 0) {
      id = 1;
    } else {
      id = info.categories[category][length - 1].id + 1;
    }

    setInfo({
      ...info,
      categories: {
        ...info["categories"],
        [category]: [...info["categories"][category], { ...objectToAdd, id }],
      },
    });
  };

  const deleteNewestCategoryItem = (category) => {
    const newCategory = info.categories[category].slice(
      0,
      info.categories[category].length - 1
    );

    setInfo({
      ...info,
      categories: {
        ...info["categories"],
        [category]: newCategory,
      },
    });
  };

  const setCategoryItemProperty = (
    category,
    property,
    propertyId,
    newPropertyValue
  ) => {
    const newCategory = info.categories[category].map((item, i) => {
      if (item.id === propertyId) {
        item[property] = newPropertyValue;
      }

      return item;
    });

    setInfo({
      ...info,
      categories: {
        ...info["categories"],
        [category]: newCategory,
      },
    });
  };

  const setNewestCategoryItemProperty = (
    category,
    property,
    newPropertyValue
  ) => {
    const newCategory = info.categories[category].map((item, i) => {
      if (i === info.categories[category].length - 1) {
        item[property] = newPropertyValue;
      }

      return item;
    });

    setInfo({
      ...info,
      categories: {
        ...info["categories"],
        [category]: newCategory,
      },
    });
  };

  const editCategoryItem = (category, newItem) => {
    setInfo({
      ...info,
      categories: {
        ...info["categories"],
        [category]: info["categories"][category].map((item) => {
          if (item.id === newItem.id) {
            return newItem;
          }
          return item;
        }),
      },
    });
  };

  const deleteCategoryItem = (category, itemId) => {
    setInfo({
      ...info,
      categories: {
        ...info["categories"],
        [category]: info["categories"][category].filter(
          (item) => item.id !== itemId
        ),
      },
    });
  };

  return (
    <TemplateContext.Provider
      value={{
        values: info,
        addTemplate,
        addUser,
        addNewCategoryItem,
        deleteNewestCategoryItem,
        setCategoryItemProperty,
        editCategoryItem,
        deleteCategoryItem,
        setNewestCategoryItemProperty,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
}

export default GlobalState;
