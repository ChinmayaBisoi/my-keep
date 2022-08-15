import React, { useEffect, useRef, useState } from "react";
import { useKeepState } from "../../pages/my-keep";
import Popup from "../common/popup";
import AddNote from "./add-note";
import Note from "./note";

const Notes = () => {
  const [showPopup, setShowPopup] = useState(false);

  const { allNotes, selectedLabel } = useKeepState();
  const filteredNotes =
    selectedLabel === "Notes"
      ? allNotes
      : allNotes.filter((item: any) => {
          for (let i = 0; i < item.labels.length; i++) {
            if (item.labels[i] === selectedLabel) {
              return item;
            }
          }
        });

  const handleOnNoteClick = () => {
    setShowPopup(true);
  };

  const pinnedNotes = filteredNotes.filter((item: any) => {
    if (item.isPinned) {
      return item;
    }
  });

  const otherNotes = filteredNotes.filter((item: any) => {
    if (!item.isPinned) {
      return item;
    }
  });

  return (
    <div className="col-span-9 p-15">
      {/* ADD NOTE */}
      <AddNote />
      {/* DISPLAY NOTES */}
      <div className="grid grid-cols-12 pt-30">
        <div className="col-span-8 col-start-3">
          {pinnedNotes.length > 0 && (
            <>
              <div className="text-12 tracking-[0.1rem] font-600 text-[#a7abac] px-15 py-8 uppercase">
                Pinned
              </div>
              <div className="flex flex-col space-y-10 pb-40">
                {pinnedNotes.map((note: any) => {
                  return (
                    <Note
                      key={note.title + note.content}
                      note={note}
                      handleOnClick={handleOnNoteClick}
                    />
                  );
                })}
              </div>
            </>
          )}
          <div className="text-12 tracking-[0.1rem] font-600 text-[#a7abac] px-15 py-8 uppercase">
            {selectedLabel}
          </div>
          <div className="flex flex-col space-y-10">
            {otherNotes.map((note: any) => {
              return (
                <Note
                  key={note.title + note.content}
                  note={note}
                  handleOnClick={handleOnNoteClick}
                />
              );
            })}
          </div>
        </div>
      </div>
      {showPopup && (
        <Popup
          close={() => {
            setShowPopup(false);
          }}
          className="grid grid-cols-12"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="col-span-8 col-start-3 rounded-8 bg-[#202124] shadow-26 shadow-[#000]"
          >
            <div className="p-15 border-b border-[#8a8a8a]">
              <div className="text-16 text-[#F1F1F1] font-600">Edit</div>
              {/* <GenericElement
              leftIcon={
                <Cross className="transform rotate-45 w-16 min-w-16 h-16 text-[#8a8a8a]" />
              }
              rightIcon={<Tick className="w-16 min-w-16 h-16 text-[#8a8a8a]" />}
            /> */}
            </div>
            <div className="flex justify-end">
              <div
                onClick={() => {
                  setShowPopup(false);
                }}
                className="py-10 my-2 px-15 text-16 text-[#F1F1F1] font-600 cursor-pointer"
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

export default Notes;
