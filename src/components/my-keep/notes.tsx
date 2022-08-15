import React, { useEffect, useRef, useState } from "react";
import { useKeepDispatch, useKeepState } from "../../pages/my-keep";
import Popup from "../common/popup";
import AddNote from "./add-note";
import Note from "./note";
import Cross from "../../../public/my-keep/trash-solid.svg";
import PinEmpty from "../../../public/my-keep/pin-39.svg";
import PinFull from "../../../public/my-keep/pin-38.svg";
import CloseBtn from "../../../public/my-keep/close.svg";

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

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [labelTemp, setLabelTemp] = useState("");
  const [labels, setLabels] = useState<any>([]);

  const [isPinned, setIsPinned] = useState(false);

  const [isHoveringPin, setIsHoveringPin] = useState(false);

  const [noteAddedNotif, setNoteAddedNotif] = useState(false);

  const dispatch = useKeepDispatch();

  const clear = () => {
    setTitle("");
    setContent("");
    setLabelTemp("");
    if (selectedLabel !== "Notes") {
      setLabels([selectedLabel]);
    } else {
      setLabels([]);
    }
    setIsPinned(false);
  };

  const addNewNote = () => {
    let newNote: any = {};
    if (title !== "" || content !== "") {
      newNote["title"] = title;
      newNote["content"] = content;
      newNote["labels"] = labels;
      newNote["isPinned"] = isPinned;
      newNote["createdAt"] = new Date();
      dispatch({ type: "add-note", newNote });
      clear();
      setNoteAddedNotif(true);
    }
  };

  useEffect(() => {
    if (noteAddedNotif) {
      setTimeout(() => {
        setNoteAddedNotif(false);
      }, 3000);
    }
  }, [noteAddedNotif]);

  const addNewLabel = () => {
    let flag = true;
    for (let i = 0; i < labels.length; i++) {
      if (labels[i] === labelTemp) {
        flag = false;
      }
    }
    if (labelTemp !== "" && flag) {
      setLabels([...labels, labelTemp]);
      setLabelTemp("");
    }
  };

  const editNote = () => {
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const removeLabel = (label: string) => {
    if (label !== selectedLabel) {
      setLabels(
        labels.filter((item: string) => {
          return item != label;
        })
      );
    }
  };

  // useEffect(() => {
  //   clear();
  // }, [selectedLabel]);

  useEffect(() => {
    if (selectedLabel !== "Notes") {
      setLabels([selectedLabel]);
    }
  }, [selectedLabel]);

  return (
    <div className="md:col-span-9 col-span-10 md:p-15 pl-12 pr-16 py-15">
      {/* ADD NOTE */}
      <AddNote />
      {/* DISPLAY NOTES */}
      <div className="grid grid-cols-12 pt-30">
        <div className="md:col-span-8 md:col-start-3 col-span-full">
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
          {otherNotes.length > 0 && (
            <>
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
            </>
          )}
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
            className="md:col-span-8 md:col-start-3 col-start-2 col-span-10 rounded-8 bg-[#202124] shadow-26 shadow-[#000]"
          >
            <div className="p-15 border-b border-[#8a8a8a] flex items-center justify-between">
              <div className="text-16 text-[#F1F1F1] font-600">Edit</div>

              <CloseBtn className="w-16 min-w-16 h-16 hover:text-[#F1F1F1] text-[#b0b0b0]" />
            </div>
            <div className="flex flex-col px-15">
              <div className="px-15 py-10 flex items-center">
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                  type="text"
                  className="bg-inherit outline-none w-full h-min caret-[#ffffff] text-[#f1f1f1] text-18 placeholder:text-[#aeaeae] placeholder:font-600"
                  placeholder="Title"
                />
                <div
                  onClick={() => {
                    setIsPinned(!isPinned);
                  }}
                  onMouseOver={() => {
                    setIsHoveringPin(true);
                  }}
                  onMouseOut={() => {
                    setIsHoveringPin(false);
                  }}
                  className={`cursor-pointer relative w-28 h-28 min-w-28 rounded-full p-8 hover:bg-[#3a3a3a] ml-8 ${
                    isPinned ? "" : ""
                  } flex items-center justify-center`}
                >
                  {isPinned ? (
                    <PinEmpty className="min-w-20 w-20 h-20 text-[#757575]" />
                  ) : (
                    <PinFull className="min-w-20 w-20 h-20 text-[#757575]" />
                  )}
                  {isHoveringPin && (
                    <div
                      className={`absolute top-30 rounded-4 border z-2 border-[#696969] bg-[#000000] w-80 px-8 py-2 text-center text-[#f1f1f1] text-12`}
                    >
                      {isPinned ? "Unpin note" : "Pin note"}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-15 py-12  overflow-auto">
                <textarea
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  value={content}
                  className="bg-inherit outline-none w-full caret-[#ffffff] text-[#f1f1f1] text-16 placeholder:text-[#aeaeae] placeholder:font-600"
                  placeholder="Take a note..."
                />
              </div>
              {!!labels.length && (
                <div className="flex items-center px-15 gap-x-8 gap-y-8 flex-wrap">
                  {labels.map((item: any) => {
                    return (
                      <div
                        onClick={() => {
                          removeLabel(item);
                        }}
                        key={item}
                        className="cursor-pointer border flex items-center justify-center space-x-4 border-[#525355] rounded-full px-8 text-[#f1f1f1] text-12 pb-3"
                      >
                        <div>{item}</div>
                        {item !== selectedLabel && (
                          <div className="mt-3 w-10">
                            <Cross className="w-10 min-w-10 h-10 hover:text-[#F1F1F1] text-[#b0b0b0]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="px-15 py-10 flex items-center">
                <input
                  onChange={(e) => {
                    setLabelTemp(e.target.value);
                  }}
                  value={labelTemp}
                  type="text"
                  className="bg-inherit outline-none w-full caret-[#ffffff] text-[#f1f1f1] text-14 placeholder:text-[#aeaeae] placeholder:font-600"
                  placeholder="Add a label..."
                />
                <div
                  onClick={() => {
                    addNewLabel();
                  }}
                  className="cursor-pointer px-10 py-8 text-[#f1f1f1] border border-[#525355] hover:bg-[#575759] rounded-4 text-12 min-w-78 mr-8"
                >
                  Add Label
                </div>
                <div
                  onClick={() => {
                    editNote();
                  }}
                  className="relative cursor-pointer px-10 py-8 text-[#f1f1f1] border hover:bg-[#575759] border-[#525355] rounded-4 text-12 min-w-96"
                >
                  Save Changes
                  {noteAddedNotif && (
                    <div className="absolute top-40 rounded-4 border border-[#696969] bg-[#000000] w-80 px-8 py-2 text-center text-[#f1f1f1] text-12">
                      Note Added!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Notes;
