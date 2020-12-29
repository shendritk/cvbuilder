import React, { useState, useContext } from "react";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../utils";
import TemplateContext from "../utils/TemplateContext";
import Footer from "../home/Footer";
import Header from "../home/Header";
import TemplateOnePreview from "../previews/TemplateOnePreview";
import TemplateTwoPreview from "../previews/TemplateTwoPreview";
import ContactDetails from "./ContactDetails";
import Languages from "./language/Languages";
import Hoobies from "./hooby/Hoobies";
import Experiences from "./experience/Experiences";
import Education from "./education/Education";
import References from "./reference/References";
import Skills from "./skill/Skills";
import EventNoteIcon from "@material-ui/icons/EventNote";
import PersonIcon from "@material-ui/icons/Person";
import ReorderIcon from "@material-ui/icons/Reorder";
import LanguageIcon from "@material-ui/icons/Language";
import SchoolIcon from "@material-ui/icons/School";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import TemplateOneImage from "../assets/img/template1.png";
import TemplateTwoImage from "../assets/img/template2.png";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/SharedStyles.css";
import "../styles/extra.css";

function CreateCV(props) {
  const [currentForm, setCurrentForm] = useState(1);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [spinnerActive, setSpinnerActive] = useState(false);
  const [templateDialog, setTemplateDialog] = useState(true);
  const [template, setTemplate] = useState("");

  const categories = [
    { name: "Contact", icon: <PersonIcon /> },
    { name: "Skills", icon: <ReorderIcon /> },
    { name: "Languages", icon: <LanguageIcon /> },
    { name: "Hoobies", icon: <LocalLibraryIcon /> },
    { name: "Experiences", icon: <EventNoteIcon /> },
    { name: "Education", icon: <SchoolIcon /> },
    { name: "References", icon: <ContactMailIcon /> },
  ];

  const state = useContext(TemplateContext);
  const values = state.values;

  const validateInput = () => {
    if (values.categories.contacts[0].value === "") {
      toast.error("First name cannot be empty");
      return false;
    }

    if (values.categories.contacts[1].value === "") {
      toast.error("Last name cannot be empty");
      return false;
    }

    return true;
  };

  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    state.editCategoryItem("contacts", {
      id: name,
      name,
      value,
    });
  };

  const handleNext = () => {
    if (currentForm === categories.length) {
      // Can't go forwards anymore
      return;
    }
    setCurrentForm(currentForm + 1);
  };

  const handlePrevious = () => {
    if (currentForm === 1) {
      // Can't go backwards anymore
      return;
    }
    setCurrentForm(currentForm - 1);
  };

  const handleSwitchCategory = (category) => {
    // Find the index and go to that category
    const index = categories.indexOf(category);
    setCurrentForm(index + 1);
  };

  const rendercurrentForm = () => {
    switch (currentForm) {
      case 1:
        return (
          <ContactDetails
            handleChangeValue={handleChangeValue}
            template={template}
          />
        );

      case 2:
        return <Skills />;

      case 3:
        return <Languages />;

      case 4:
        return <Hoobies />;

      case 5:
        return <Experiences />;

      case 6:
        return <Education />;

      case 7:
        return <References />;

      default:
        return;
    }
  };

  const handleSelectTemplateOne = () => {
    setTemplate("Template One");
    state.addTemplate(1);
    setTemplateDialog(false);
  };

  const handleSelectTemplateTwo = () => {
    setTemplate("Template Two");
    state.addTemplate(2);
    setTemplateDialog(false);
  };

  const handleCreate = async () => {
    setSpinnerActive(true);
    try {
      if (!validateInput()) return;
      const res = await axios.post(`${API_URL}/api/v1/cv`, {
        values,
        template: template === "Template One" ? 1 : 2,
      });

      setDownloadUrl(res.data.url);
    } catch (err) {
      toast.error("Something went wrong while creating your cv");
    } finally {
      setSpinnerActive(false);
    }
  };

  const handleSave = async () => {
    setSpinnerActive(true);
    if (values.user.email) {
      try {
        if (!validateInput()) return;
        await axios.post(`${API_URL}/api/v1/cv/save`, {
          cv: { ...values.categories, template: values.template },
          email: values.user.email,
        });

        toast.success("CV was created successfully, check the account page.");
      } catch (err) {
        toast.error("CV couldn't be created.");
      } finally {
        setSpinnerActive(false);
      }
    } else {
      props.history.push("/login/save");
      setSpinnerActive(false);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Header />
      
      {templateDialog && (
        <div className="flex flex-col bg-gray-100 h-full justify-center items-center md:text-center">
          <h2 className="text-5xl font-bold uppercase text-green-400 lg:text-4xl sm:text-3xl sm:mt-20">
            Select a template
          </h2>
          <h3 className="text-3xl uppercase text-gray-800 lg:text-2xl sm:text-xl">
            You must select a template before you continue
          </h3>
          <div className="flex mt-16 lg:mt-8 md:mt-4 sm:flex-col overflow-x-auto px-16 py-16">
            <img
              className="mr-16 shadow-md transform scale-105 2xl:scale-90 xl:mr-1 hover:-translate-y-4 transition duration-500 ease-in-out p-1 border-1 border-gray-500"
              src={TemplateOneImage}
              alt="Template One Preview"
              onClick={handleSelectTemplateOne}
            />
            <img
              className="shadow-md transform scale-105 2xl:scale-90 hover:-translate-y-4 transition duration-500 ease-in-out p-1 border-1 border-gray-500"
              src={TemplateTwoImage}
              alt="Template Two Preview"
              onClick={handleSelectTemplateTwo}
            />
          </div>
        </div>
      )}

      {!templateDialog && (
        <div className="flex flex-col">
          <div className="mt-8 w-full text-gray-800 h-full flex 2xl:flex-col">
            <div className="w-5/12 2xl:w-screen h-full px-8 pt-16 lg:px-4 lg:py-4 flex flex-col ">
              <div className="mt-16 px-2 mx-auto mb-6">
                <h2 className="text-3xl text-center uppercase">Details</h2>
                <div className="h-2 w-8 bg-green-400" />
              </div>
              <div className="flex w-full rounded shadow-lg border border-gray-300">
                {/* LEFT */}
                <div className="w-1/4 md:w-2/5 sm:w-5/12 bg-green-400 py-8 text-gray-800">
                  {categories.map((category) => (
                    <button
                      className="w-full flex hover:text-gray-900 py-2 cursor-pointer category"
                      onClick={() => handleSwitchCategory(category)}
                      key={category.name}
                    >
                      {category.icon}
                      <h2 className="ml-4 sm:ml-1">{category.name}</h2>
                    </button>
                  ))}
                </div>
                {/* RIGHT */}
                <div className="w-3/4 md:w-3/5 py-8 sm:py-4 px-4 sm:px-2 bg-gray-100">
                  {rendercurrentForm()}
                </div>
              </div>
              <div className="flex ml-auto">
                <button
                  onClick={handlePrevious}
                  className="py-2 px-4 ml-4 mt-4 bg-green-400 hover:bg-green-500 duration-300 rounded text-white text-lg"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="py-2 px-4 ml-4 mt-4 bg-green-400 hover:bg-green-500 duration-300 rounded text-white text-lg"
                >
                  Next
                </button>
              </div>
            </div>
            <div className="w-7/12 2xl:w-screen h-full mt-16 px-8 md:px-2 flex flex-col text-sm">
              {/* CV PREVIEW */}
              <div className="mt-16 px-2 mx-auto mb-6 md:mb-4">
                <h2 className="text-3xl text-center uppercase">Preview</h2>
                <div className="h-2 w-8 bg-green-400" />
              </div>
              <div className="my-4 hidden md:inline mx-4">
                <span className="text-green-500 font-bold">Note: </span>
                Scroll vertically to view how the end result will look like.
              </div>

              {template === "Template One" && <TemplateOnePreview />}
              {template === "Template Two" && (
                <TemplateTwoPreview state={state} />
              )}

              <div className="flex justify-end items-center my-16">
                {spinnerActive ? (
                  <>
                    <button
                      disabled
                      className="bg-green-400 py-2 px-4 ml-2 hover:bg-green-500 duration-300 rounded text-white text-lg focus:outline-none"
                      onClick={handleCreate}
                    >
                      Please wait...
                    </button>
                    <button
                      onClick={handleSave}
                      disabled
                      className="bg-green-400 py-2 px-4 ml-2 hover:bg-green-500 duration-300 rounded text-white text-lg focus:outline-none"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-green-400 py-2 px-4 mx-1 hover:bg-green-500 duration-300 rounded text-white text-lg focus:outline-none"
                      onClick={handleCreate}
                    >
                      Create
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-green-400 py-2 px-4 mx-1 hover:bg-green-500 duration-300 rounded text-white text-lg focus:outline-none"
                    >
                      Save
                    </button>
                  </>
                )}
                <div className="mx-4">
                  <Loader
                    type="TailSpin"
                    color="#68d391"
                    height={40}
                    width={40}
                    visible={spinnerActive}
                  />
                </div>

                {downloadUrl && (
                  <a
                    className="bg-green-400 py-2 px-4 hover:bg-green-500 duration-300 rounded text-white text-lg focus:outline-none"
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                )}
              </div>
            </div>
          </div>
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
      )}
      <Footer />
    </div>
  );
}
export default CreateCV;
