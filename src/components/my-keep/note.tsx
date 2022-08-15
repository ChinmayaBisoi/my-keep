import React, { useState } from "react";
import Popup from "../common/popup";
import GenericElement from "./generic-element";
import PinEmpty from "../../../public/my-keep/pin-39.svg";
import PinFull from "../../../public/my-keep/pin-38.svg";
import Trash from "../../../public/my-keep/trash-solid.svg";

const Note = ({
  note,
  handleOnClick,
}: {
  note: any;
  handleOnClick: () => void;
}) => {
  // const [isPinned, setIs]
  const [isHoveringPin, setIsHoveringPin] = useState(false);
  return (
    <div className="flex rounded-8 border border-[#525355] hover:border-[#626365] hover:shadow-26 hover:shadow-[#000]">
      <div
        onClick={handleOnClick}
        className="min-h-80 flex flex-col cursor-pointer text-[#f1f1f1] w-full"
      >
        {!!note.title && (
          <div className="px-15 py-10 text-16 font-500">{note.title}</div>
        )}
        {!!note.content && (
          <div className="px-15 py-12 text-14 ">{note.content}</div>
        )}
        {!!note.labels.length && (
          <div className="flex flex-wrap items-center px-15 py-8 gap-x-8 gap-y-8">
            {note.labels.map((item: any) => {
              return (
                <div
                  key={item}
                  className="border border-[#525355] rounded-full px-8 text-[#f1f1f1] text-12 pb-3"
                >
                  {item}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between items-center py-4 pr-4">
        <div
          onMouseOver={() => {
            setIsHoveringPin(true);
          }}
          onMouseOut={() => {
            setIsHoveringPin(false);
          }}
          className={`relative cursor-pointer w-28 h-28 min-w-28 rounded-full p-8 hover:bg-[#3a3a3a] ml-8 ${
            note.isPinned ? "" : ""
          } flex items-center justify-center`}
        >
          {note.isPinned ? (
            <PinEmpty className="min-w-20 w-20 h-20 text-[#757575]" />
          ) : (
            <PinFull className="min-w-20 w-20 h-20 text-[#757575]" />
          )}
          {isHoveringPin && (
            <div
              className={`absolute top-30 rounded-4 border z-2 border-[#696969] bg-[#000000] w-80 px-8 py-2 text-center text-[#f1f1f1] text-12`}
            >
              {note.isPinned ? "Unpin note" : "Pin note"}
            </div>
          )}
        </div>
        <div className="cursor-pointer w-28 h-28 min-w-28 rounded-full p-8 hover:bg-[#3a3a3a] ml-8 flex items-center justify-center">
          <Trash className="min-w-16 w-16 h-16 text-[#757575]" />
        </div>
      </div>
    </div>
  );
};

export default Note;
