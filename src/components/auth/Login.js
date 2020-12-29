import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import TemplateContext from "../utils/TemplateContext";
import InputText from "../inputs/InputText";
import { API_URL } from "../../utils";

function Login(props) {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const state = useContext(TemplateContext);
  const { categories } = state.values;

  useEffect(() => {
    // Check if a user is logged in
    if (props.signedUp || props.history.location.search === "?signup=true") {
      toast.success("Signed up successfully.");
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setInput({ ...input, [name]: value });
  };

  const handleDemoLogin = () => {
    setInput({
      email: "janedoe@example.com",
      password: "test1234",
    });
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    let res;
    setLoading(true);

    try {
      // Login but also save the CV that user is trying to create.
      if (props.save) {
        res = await axios.post(`${API_URL}/api/v1/login?save=true`, {
          ...input,
          cv: { ...categories, template: state.values.template },
        });
        // Login simply
      } else {
        res = await axios.post(`${API_URL}/api/v1/login`, input);
      }

      state.addUser(res.data.data.user);
      props.history.push("/dashboard");
    } catch (err) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-green-400 flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="w-1/4 relative sm:w-full sm:mx-4 bg-gray-100 flex flex-col py-4 px-2 rounded-sm text-gray-800 shadow-md items-center"
      >
        <h2 className="text-2xl font-bold">Login</h2>
        <h4
          onClick={handleDemoLogin}
          className="p-1 m-1 absolute left-0 bottom-0 cursor-pointer"
        >
          Demo Login
        </h4>
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
        <button
          type="submit"
          className="py-2 px-4 my-4 text-white bg-green-400 rounded-sm hover:bg-green-500 duration-300"
        >
          {loading ? "Logging in..." : "Login"}
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

export default Login;
