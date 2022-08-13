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
  products: [
    {
      name: "Potato",
      id: 1,
      price: 30,
      available: 1,
      vendor: "Himachal Pvt Ltd",
      category: "Vegetables",
      count: 0,
      imgUrl: "/potato.jpeg",
    },
    {
      name: "Banana",
      id: 2,
      price: 50,
      available: 1,
      category: "Fruits",
      vendor: "Organic farms",
      count: 0,
      imgUrl: "/banana.jpeg",
    },
    {
      name: "Drumsticks",
      id: 3,
      price: 20,
      available: 0,
      category: "Vegetables",
      vendor: "Mallikarjuna farms",
      count: 0,
      imgUrl: "/drumstick.jpeg",
    },
    {
      name: "Orange",
      id: 4,
      price: 25,
      available: 1,
      vendor: "Nagpur farms",
      category: "Fruits",
      count: 0,
      imgUrl: "/orange.jpeg",
    },
  ],

  //to select category
  selectedCategory: "All Products",
  //
  currentLabel: "Notes",
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
    case "change-category":
      return {
        ...state,
        selectedCategory: action.selectedCategory,
        // canSaveChanges: true,
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

export function useProductState(): any {
  const context = useContext(KeepStateContext);
  if (context === undefined) {
    throw new Error(
      "useScheduleServicesState must be used within a ScheduleServicesStateProvider"
    );
  }
  return context;
}

export function useProductDispatch(): any {
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
