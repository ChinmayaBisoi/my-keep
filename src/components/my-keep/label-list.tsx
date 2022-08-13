import React, { useState } from "react";
import Bell from "../../../public/my-keep/bell-regular.svg";
import Bulb from "../../../public/my-keep/bulb-business.svg";
import Label from "./label";
import Cross from "../../../public/my-keep/close.svg";
import Popup from "../common/popup";
import GenericElement from "./generic-element";
import Tick from "../../../public/my-keep/check-solid.svg";

const LabelList = () => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="col-span-3 flex flex-col pt-8">
      <div
        onClick={() => {
          setShowPopup(true);
        }}
        className="pl-26 mr-20 flex space-x-26 items-center py-12 rounded-r-full bg-[#3a3a3a] cursor-pointer hover:bg-[#4a4a4a]"
      >
        <Cross className="transform rotate-45 w-20 min-w-20 h-20 text-[#F1F1F1]" />
        <div className="text-20 text-[#f1f1f1]">Create New</div>
      </div>
      <Label
        title={"Notes"}
        icon={<Bulb className="w-24 min-w-24 h-24 text-[#F1F1F1]" />}
      />
      <Label
        title={"Notes"}
        icon={<Bulb className="w-24 min-w-24 h-24 text-[#F1F1F1]" />}
      />
      <Label
        title={"Notes"}
        icon={<Bulb className="w-24 min-w-24 h-24 text-[#F1F1F1]" />}
      />
      {!!showPopup && (
        <Popup
          close={() => {
            setShowPopup(false);
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-300 bg-[#313235] shadow-9 shadow-[#000]"
          >
            <div className="p-15 border-b border-[#8a8a8a]">
              <div className="text-16 text-[#F1F1F1] font-600">Create New</div>
              <GenericElement
                leftIcon={
                  <Cross className="transform rotate-45 w-16 min-w-16 h-16 text-[#8a8a8a]" />
                }
                rightIcon={
                  <Tick className="w-16 min-w-16 h-16 text-[#8a8a8a]" />
                }
              />
            </div>
            <div className="flex justify-end px-15">
              <div
                onClick={() => {
                  setShowPopup(false);
                }}
                className="py-12 text-16 text-[#F1F1F1] font-600"
              >
                Done
              </div>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default LabelList;
