import React from "react";

const Label = ({ title, icon }: { title: string; icon: JSX.Element }) => {
  return (
    <div className="pl-24 flex space-x-32 items-center py-12 rounded-r-full">
      {!!icon && icon}
      <div className="text-14 text-[#f1f1f1]">{title}</div>
    </div>
  );
};

export default Label;
