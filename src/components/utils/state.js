const initialState = {
  user: null,
  template: 0,
  categories: {
    contacts: [
      { id: "firstName", value: "" },
      { id: "lastName", value: "" },
      { id: "profession", value: "" },
      { id: "address", value: "" },
      { id: "city", value: "" },
      { id: "country", value: "" },
      { id: "zipCode", value: "" },
      { id: "phoneNumber", value: "" },
      { id: "email", value: "" },
      { id: "website", value: "" },
      {
        id: "profile",
        value: "",
      },
    ],
    skills: [],
    languages: [],
    hoobies: [],
    experiences: [],
    education: [],
    references: [],
  },
};

export default initialState;
