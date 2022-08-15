import React from "react";
import { useKeepDispatch, useKeepState } from "../../pages/my-keep";

const Label = ({ title, icon }: { title: string; icon: JSX.Element }) => {
  const { selectedLabel } = useKeepState();
  const dispatch = useKeepDispatch();
  return (
    <div
      onClick={() => {
        dispatch({ type: "select-label", selectedLabel: title });
      }}
      className={`pl-24 flex space-x-32 items-center py-12 rounded-r-full cursor-pointer ${
        selectedLabel === title ? "bg-[#41331c]" : "hover:bg-[#4a4a4a]"
      }`}
    >
      {!!icon && icon}
      <div className="text-14 text-[#f1f1f1] md:block hidden">{title}</div>
    </div>
  );
};

export default Label;
