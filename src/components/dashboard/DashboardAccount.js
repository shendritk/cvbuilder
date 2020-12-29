import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../utils";
import InputText from "../inputs/InputText";

function DashboardAccount() {
  const [input, setInput] = useState({
    oldPassword: "",
    newPassword: "",
    newConfirmPassword: "",
  });

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${API_URL}/api/v1/user/changePassword`, {
        ...input,
        email: "janedoe4@example.com",
      });
      toast.success("Password changed successfully");
    } catch (err) {
      toast.error("Couldn't update the password");
    }
  };

  return (
    <form onSubmit={handleChangePassword} className="w-1/3 mt-8 ml-4">
      <InputText
        value={input.oldPassword}
        name="oldPassword"
        placeholder="********"
        label="Old Password"
        width="1/2"
        handleChangeValue={handleInputChange}
        type="password"
      />
      <InputText
        value={input.newPassword}
        name="newPassword"
        placeholder="********"
        label="New Password"
        width="1/2"
        type="password"
        handleChangeValue={handleInputChange}
      />
      <InputText
        value={input.newConfirmPassword}
        name="newConfirmPassword"
        placeholder="********"
        label="Confirm Password"
        width="1/2"
        type="password"
        handleChangeValue={handleInputChange}
      />
      <div className="flex justify-end ">
        <button
          type="submit"
          className="px-2 py-1 bg-green-400 rounded-sm text-white mr-4 focus:outline-none hover:bg-green-500 duration-200 uppercase"
        >
          Save Password
        </button>
      </div>
    </form>
  );
}

export default DashboardAccount;
