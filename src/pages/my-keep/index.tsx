import React from "react";
import MainContent from "../../components/my-keep/main-content";
import TopNav from "../../components/my-keep/top-nav";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

export const KeepStateContext = createContext<any>(null);
export const KeepDispatchContext = createContext<any>(null);

const initialState: any = {
  //inital product list
  allNotes: [
    {
      title: "asdsd",
      content: "asdsadsadsdsdsda",
      labels: ["App", "Museum"],
    },
    {
      title: "appleeeee",
      content: "lrem500alrem500alrem500alrem500alrem500alrem500a",
      labels: ["Fruits", "New", "Museum"],
    },
  ],

  //to select category
  selectedCategory: "All Products",
  //
  selectedLabel: "Notes",
};

const keepStateReducer = (state: any, action: any) => {
  switch (action.type) {
    case "initialize":
      return state;
    case "service-conf-modal-status":
      return {
        ...state,
        serviceConfModalStatus: action.status,
      };
    case "add-or-remove-item":
      return {
        ...state,
        products: action.products,
        // canSaveChanges: true,
      };
    case "select-label":
      return {
        ...state,
        selectedLabel: action.selectedLabel,
        // canSaveChanges: true,
      };
    case "add-note":
      return {
        ...state,
        allNotes: [...state.allNotes, action.newNote],
      };
    default:
      return state;
  }
};

export function KeepStateProvider({ children }: { children: any }) {
  const [state, dispatch] = useReducer(keepStateReducer, initialState);

  const value: any = useMemo(() => ({ ...state }), [state]);

  return (
    <KeepStateContext.Provider value={value}>
      <KeepDispatchContext.Provider value={dispatch}>
        {children}
      </KeepDispatchContext.Provider>
    </KeepStateContext.Provider>
  );
}

export function useKeepState(): any {
  const context = useContext(KeepStateContext);
  if (context === undefined) {
    throw new Error(
      "useScheduleServicesState must be used within a ScheduleServicesStateProvider"
    );
  }
  return context;
}

export function useKeepDispatch(): any {
  const context = useContext(KeepDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useScheduleServicesDispatch must be used within a ScheduleServicesStateProvider"
    );
  }
  return context;
}

const MyKeep = () => {
  return (
    <KeepStateProvider>
      <div className="min-h-screen bg-[#202124]">
        <TopNav />
        <MainContent />
      </div>
    </KeepStateProvider>
  );
};

export default MyKeep;
