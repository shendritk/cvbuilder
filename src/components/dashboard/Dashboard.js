import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { API_URL } from "../../utils";
import TemplateContext from "../utils/TemplateContext";
import Header from "../home/Header";
import DashboardAccount from "./DashboardAccount";
import DashboardHome from "./DashboardHome";
import DashboardTemplates from "./DashboardTemplates";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import InfoIcon from "@material-ui/icons/Info";
import PersonIcon from "@material-ui/icons/Person";

function Dashboard(props) {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["Home", "Templates", "How it works", "Account"];

  const state = useContext(TemplateContext);
  const { user } = state.values;

  useEffect(() => {
    async function getCvs() {
      const response = await axios.get(`${API_URL}/api/v1/cv/all/${user._id}`);
      setCvs(response.data.cvs);
      setLoading(false);
    }

    try {
      getCvs();
    } catch (err) {
      setLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/api/v1/logout`);
      state.addUser(null);
      props.history.push("/");
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  const handleChangeCategory = (e) => {
    setCurrentCategory(categories.indexOf(e.target.textContent));
  };

  const handleRedirectToLogin = () => {
    props.history.push("/login");
  };

  const deleteCvFromState = (id) => {
    setCvs(cvs.filter((cv) => cv._id !== id));
  };

  const renderCategory = () => {
    switch (currentCategory) {
      case 0:
        return (
          <DashboardHome
            cvs={cvs}
            loading={loading}
            userId={user._id}
            deleteCvFromState={deleteCvFromState}
          />
        );

      case 1:
        return <DashboardTemplates />;

      case 2:
        return <h2>How it works</h2>;

      case 3:
        return <DashboardAccount />;

      default:
        return;
    }
  };

  return (
    <>
      {!user && handleRedirectToLogin()}
      
      {user && (
        <div className="flex flex-col">
          <>
            <Header user={user} handleLogout={handleLogout} />
            <main className="flex sm:flex-col min-h-screen">
              {/* LEFT SIDE */}
              <ul className="mt-16 pt-4 px-8 text-xl text-gray-100 bg-green-400 px-4 md:text-2xl md:pt-4 sm:px-1 sm:mt-16 sm:pt-4">
                <li
                  onClick={handleChangeCategory}
                  className="flex items-center py-2 hover:bg-green-500 pl-2 rounded-md duration-200"
                >
                  <HomeIcon /> <span className="ml-2">Home</span>
                </li>
                <li
                  onClick={handleChangeCategory}
                  className="flex items-center py-2 hover:bg-green-500 pl-2 rounded-md duration-200"
                >
                  <ListIcon />
                  <span className="ml-2">Templates</span>
                </li>
                <Link to="/">
                  <li
                    onClick={handleChangeCategory}
                    className="flex items-center py-2 hover:bg-green-500 pl-2 rounded-md duration-200"
                  >
                    <InfoIcon />
                    <span className="ml-2">How it works</span>
                  </li>
                </Link>
                <li
                  onClick={handleChangeCategory}
                  className="flex items-center py-2 hover:bg-green-500 pl-2 rounded-md duration-200"
                >
                  <PersonIcon />
                  <span className="ml-2">Account</span>
                </li>
              </ul>

              {/* RIGHT SIDE */}
              <div className="h-screen flex-1 overflow-scroll bg-gray-100 pt-16">
                {renderCategory()}
              </div>
            </main>
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
          </>
        </div>
      )}
    </>
  );
}

export default Dashboard;
