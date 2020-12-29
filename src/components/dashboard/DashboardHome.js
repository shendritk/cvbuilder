import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../utils";
import LoadingScreen from "../utils/LoadingScreen";

function DashboardHome(props) {
  const { cvs, deleteCvFromState, loading, userId } = props;

  const handleDeleteCv = async (id) => {
    try {
      await axios.post(`${API_URL}/api/v1/cv/delete/${id}`, {
        userId,
      });
      deleteCvFromState(id);
    } catch (err) {
      toast.error("An error occurred.");
    }
  };

  const renderCvs = () => {
    if (loading) {
      return <LoadingScreen />;
    } else {
      if (cvs.length === 0) {
        return (
          <div className="ml-8 mt-4 text-gray-800 text-center sm:mx-2">
            <h2 className="text-5xl font-bold md:text-4xl">
              You currently don't have any cvs.
            </h2>
            <div>
              <span className="mr-1 text-3xl">
                Start creating one by clicking
              </span>
              <Link to="/create">
                <span className="underline text-green-800 text-3xl">here</span>
              </Link>
              .
            </div>
          </div>
        );
      } else {
        return (
          <div className="mt-64 bg-gray-100">
            {cvs.map((cv, i) => (
              <div
                key={cv._id}
                className="w-7/12 sm:11/12 flex transform hover:-translate-y-2 duration-300 justify-between mx-auto my-auto text-2xl p-6 text-gray-800 bg-white border-1 border-gray-700 shadow-sm mt-4"
              >
                <div>
                  <span className="mx-2">ID: #{i + 1}</span>
                  <span className="text-green-500 font-bold">
                    {cv.firstName} {cv.lastName}
                  </span>
                </div>
                <div>
                  <div className="flex">
                    <span className="mx-2 cursor-pointer">Edit</span>
                    <span
                      onClick={() => handleDeleteCv(cv._id)}
                      className="mx-2 cursor-pointer"
                    >
                      Delete
                    </span>
                    <span className="mx-2 font-bold">
                      <a
                        href={`${API_URL}/api/v1/cv/${cv.downloadUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      }
    }
  };

  return renderCvs();
}

export default DashboardHome;
