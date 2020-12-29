import React from "react";

function LoadingScreen() {
  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col items-center justify-center animate-pulse">
      <div className="circle w-16 h-16 bg-green-400 text-white flex text-3xl font-bold items-center justify-center rounded-full">
        <span>CV</span>
      </div>
      <h2>Please wait...</h2>
    </div>
  );
}

export default LoadingScreen;
