import React from "react";
import LabelList from "./label-list";
import Notes from "./notes";

const MainContent = () => {
  return (
    <div className="grid grid-cols-12">
      <LabelList />
      <Notes />
    </div>
  );
};

export default MainContent;
