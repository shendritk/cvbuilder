import React, { useContext } from "react";
import InputText from "../inputs/InputText";
import InputTextArea from "../inputs/InputTextArea";
import TemplateContext from "../utils/TemplateContext";

function ContactDetails(props) {
  const { handleChangeValue, template } = props;
  const state = useContext(TemplateContext);
  const { contacts } = state.values.categories;

  return (
    <form className="w-full max-w-lg bg-white px-8 md:px-2 pt-4 md:pt-2 pb-2 bg-gray-100">
      <h2 className="text-xl font-bold mt-4 mb-4">Contact Details</h2>
      <div className="flex -mx-3 sm:flex-col">
        <InputText
          value={contacts[0].value}
          label="First Name"
          name="firstName"
          placeholder="Jane"
          handleChangeValue={handleChangeValue}
        />
        <InputText
          value={contacts[1].value}
          label="Last Name"
          name="lastName"
          placeholder="Doe"
          handleChangeValue={handleChangeValue}
        />
      </div>
      <div className="flex -mx-3">
        <InputText
          value={contacts[2].value}
          label="Profession"
          name="profession"
          placeholder="Support Assistant"
          handleChangeValue={handleChangeValue}
        />
      </div>

      <div className="flex flex-col -mx-3 mb-2">
        <InputText
          value={contacts[5].value}
          label="Country"
          name="country"
          placeholder="Texas"
          handleChangeValue={handleChangeValue}
        />
        <div className="flex sm:flex-col">
          <InputText
            value={contacts[4].value}
            label="City"
            name="city"
            placeholder="Houston"
            handleChangeValue={handleChangeValue}
          />
          <InputText
            value={contacts[6].value}
            label="Zip Code"
            name="zipCode"
            placeholder="80362"
            handleChangeValue={handleChangeValue}
          />
        </div>
        <div className="w-full flex md:flex-col">
          <InputText
            value={contacts[7].value}
            label="Phone Number"
            name="phoneNumber"
            placeholder="906-584-6971"
            handleChangeValue={handleChangeValue}
          />
          <InputText
            value={contacts[9].value}
            label="Website"
            name="website"
            placeholder="www.example.com"
            handleChangeValue={handleChangeValue}
          />
        </div>
        <div className="w-full">
          <InputText
            value={contacts[8].value}
            label="Email"
            name="email"
            placeholder="janedoe@example.com"
            handleChangeValue={handleChangeValue}
          />
        </div>
        {template === "Template Two" && (
          <div className="w-full">
            <InputTextArea
              value={contacts[10].value}
              label="Profile"
              name="profile"
              placeholder="Write something about yourself"
              handleChangeValue={handleChangeValue}
            />
          </div>
        )}

        <h4 className="text-xs text-gray-400 mt-8 ml-2">
          <span className="text-green-400">Note:</span> Leave empty the fields
          you don't want to include on your CV.
        </h4>
      </div>
    </form>
  );
}

export default ContactDetails;
