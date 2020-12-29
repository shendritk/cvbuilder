import React from "react";
import { motion } from "framer-motion";
import FadeOnScroll from "react-reveal/Fade";
import Header from "./Header";
import Footer from "./Footer";
import HomeImageOne from "../assets/img/home-step-1.jpg";
import HomeImageTwo from "../assets/img/home-step-2.jpg";
import HomeImageThree from "../assets/img/home-step-3.jpg";
import CreateCVPreview from "../assets/img/createcvpreview.gif";

function Home() {
  return (
    <div>
      <>
        <Header />
        <div className="flex flex-col">
          {/* MAIN SCREEN */}
          <div
            className="flex mt-16 bg-green-400 sm:flex-col sm:items-center sm:text-lg"
            style={{
              minHeight: "50vh",
            }}
          >
            <div className="w-3/5 lg:w-5/5 sm:w-5/5 flex flex-col pl-20 lg:pl-4 md:pl-1 justify-center sm:text-center">
              <h1 className="text-gray-100 uppercase text-6xl 2xl:text-5xl font-bold tracking-wide sm:my-4">
                Create your modern cv
              </h1>
              <h2 className="-mt-2 text-green-800 uppercase text-3xl 2xl:text-2xl tracking-wider">
                Simple to use while previewing it live
              </h2>
            </div>
            <div className="w-2/5 lg:w-3/5 flex items-center justify-center sm:my-8">
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                width="400"
                height="300"
                src={CreateCVPreview}
                alt={"Create CV page preview"}
                className="shadow-2xl"
              />
            </div>
          </div>
          {/* HOW IT WORKS */}
          <div className="flex flex-col py-4 text-gray-800">
            <div className="mt-16 px-2 mx-auto sm:mb-4 sm:mt-8">
              <h2 className="text-4xl text-center uppercase sm:text-3xl">
                How it works
              </h2>
              <div className="h-2 w-8 bg-green-400 mx-auto" />
            </div>
            {/* STEP ONE */}
            <FadeOnScroll>
              <div className="flex px-32 md:px-4 justify-around lg:justify-between sm:flex-col sm:mt-8 items-center sm:text-center">
                <div>
                  <h3 className="text-4xl lg:text-3xl uppercase text-green-400 font-bold">
                    Select a template
                  </h3>
                  <h4 className="text-xl lg:text-lg">
                    Select from one of our pre-defined templates.
                  </h4>
                </div>
                <img
                  src={HomeImageOne}
                  alt="Human choosing from a list illustration."
                  className="w-2/6 md:w-3/6"
                />
              </div>
            </FadeOnScroll>
            {/* STEP TWO */}
            <FadeOnScroll>
              <div
                className="flex px-32 md:px-4 justify-around lg:justify-between sm:flex-col items-center sm:text-center"
                style={{ backgroundColor: "#F3F4F6" }}
              >
                <img
                  src={HomeImageTwo}
                  alt="Human choosing from a list illustration."
                  className="w-2/6 md:w-3/6 sm:order-2"
                />
                <div className="md:ml-2 sm:mt-8">
                  <h3 className="text-4xl lg:text-3xl uppercase text-green-400 font-bold">
                    Fill the information
                  </h3>
                  <h4 className="text-xl lg:text-lg">
                    Fill the information you want to include in your CV.
                  </h4>
                </div>
              </div>
            </FadeOnScroll>

            {/* STEP THREE */}
            <FadeOnScroll>
              <div className="flex px-32 md:px-4 mb-8 justify-around lg:justify-between sm:flex-col sm:mt-8 items-center sm:text-center">
                <div>
                  <h3 className="text-4xl lg:text-3xl uppercase text-green-400 font-bold">
                    Download your CV
                  </h3>
                  <h4 className="text-xl lg:text-lg">
                    Congratulations. You can now download or save your CV.
                  </h4>
                </div>
                <img
                  src={HomeImageThree}
                  alt="Human choosing from a list illustration."
                  className="w-2/6 md:w-3/6"
                />
              </div>
            </FadeOnScroll>
          </div>
        </div>
        <Footer />
      </>
    </div>
  );
}

export default Home;
