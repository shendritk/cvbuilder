import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../utils";
import InputText from "../inputs/InputText";

function SignUp(props) {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setInput({ ...input, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/v1/signup`, input);
      props.history.push("/login?signup=true");
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-green-400 flex justify-center items-center">
      <form
        onSubmit={handleSignUp}
        className="w-1/3 sm:w-full sm:mx-4 bg-gray-100 flex flex-col py-4 px-2 rounded-sm text-gray-800 shadow-md items-center"
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <div className="flex w-full sm:flex-col">
          <InputText
            value={input.firstName}
            label="First Name"
            name="firstName"
            placeholder="Jane"
            handleChangeValue={handleInputChange}
            width="1/2"
            mb={1}
          />
          <InputText
            value={input.lastName}
            label="Last Name"
            name="lastName"
            placeholder="Doe"
            handleChangeValue={handleInputChange}
            width="1/2"
            mb={1}
          />
        </div>
        <InputText
          value={input.email}
          label="Email"
          name="email"
          placeholder="janedoe@example.com"
          handleChangeValue={handleInputChange}
          width="1/2"
          mb={1}
        />

        <InputText
          value={input.password}
          label="Password"
          name="password"
          placeholder="************"
          handleChangeValue={handleInputChange}
          width="1/2"
          type="password"
          mb={1}
        />
        <InputText
          value={input.confirmPassword}
          label="Confirm Password"
          name="confirmPassword"
          placeholder="************"
          handleChangeValue={handleInputChange}
          width="1/2"
          type="password"
          mb={1}
        />
        <button
          type="submit"
          className="py-2 px-4 mt-4 text-white bg-green-400 rounded-sm hover:bg-green-500 duration-300"
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </form>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default SignUp;
