"use client";

import { createContext, useContext, useReducer, useState } from "react";
import ResourcesEyebrow from "./ResourcesEyebrow";
import ResourcesCardItemsContainer from "./ResourcesCardItemsContainer";
import ResourcesCardItemA from "./ResourcesCardItemA";
import ResourcesCardPaginationContainer from "./ResourcesCardPaginationContainer";
import { CHANGED, DECREMENT, INCREMENT, SHOW } from "@/utils/helperClasses";
import { useSmoothScroller } from "../LenisScrollContext";
import ResourcesCardItemB from "./ResourcesCardItemB";

const INITIAL_REDUCER = {
  isShowAll: false,
  totalLength: null,
  initial: 0,
  final: 3,
  incrementValue: 6,
  balanceValue: null,
  loading: false,
};

const FILTER_VALUES = {
  month: null,
  year: null,
};

const ResourceCardContext = createContext({
  slice: [],
  currentData: [],
  handleSetCurrentData: (data) => {},
  handleFilterChange: (data) => {},
  showAllReducer: (data) => {},
  incrementPagination: () => {},
  decrementPagination: () => {},
  handleSetMonth: (month) => {},
  handleSetYear: (year) => {},
  filterValues: FILTER_VALUES,
  isLoading: false,
  state: INITIAL_REDUCER,
});

export function useResourcesCardContext() {
  const ctx = useContext(ResourceCardContext);

  if (!ctx) throw new Error("Can only be used under <ResourcesCard>");

  return ctx;
}

function reducer(state, action) {
  if (action.type === INCREMENT) {
    const balance = state.totalLength - state.final;

    if (balance > 6) {
      return {
        ...state,
        initial: state.final,
        final: state.final + state.incrementValue,
      };
    } else {
      return {
        ...state,
        initial: state.final,
        final: state.totalLength,
      };
    }
  }

  if (action.type === DECREMENT) {
    const initialValue = state.initial - state.incrementValue;

    if (initialValue > 0) {
      return {
        ...state,
        initial: initialValue,
        final: state.initial,
      };
    } else {
      return {
        ...state,
        initial: 0,
        final: state.incrementValue,
      };
    }
  }

  if (action.type === CHANGED) {
    const dataLength = action.payload.data.length;

    if (dataLength > 3) {
      const balanceValue = dataLength - 6;
      let finalValue;

      if (balanceValue > 0) {
        finalValue = state.incrementValue;
      }

      return {
        ...state,
        isShowAll: true,
        initial: 0,
        final: finalValue,
        totalLength: dataLength,
      };
    }

    return {
      ...state,
      isShowAll: true,
      initial: 0,
      final: dataLength,
      totalLength: dataLength,
    };
  }

  if (action.type === SHOW) {
    const dataLength = action.payload.data.length;

    if (dataLength > 3) {
      const balanceValue = dataLength - 6;
      let finalValue;

      if (balanceValue > 0) {
        finalValue = state.incrementValue;
      }

      return {
        ...state,
        isShowAll: true,
        initial: 0,
        final: finalValue,
        totalLength: dataLength,
      };
    }
    return {
      ...state,
      isShowAll: true,
      final: dataLength,
    };
  }
}

export default function ResourcesCard({ children, slice, className }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_REDUCER);
  const [isLoading, setIsLoading] = useState(false);
  const [filterValues, setFilterValues] = useState(FILTER_VALUES);
  const [currentData, setCurrentData] = useState([]);

  const { viewAllScroll } = useSmoothScroller();

  function incrementPagination() {
    paginationIsLoading();
    dispatch({ type: INCREMENT });
  }

  function decrementPagination() {
    paginationIsLoading();
    dispatch({ type: DECREMENT });
  }

  function paginationIsLoading() {
    setIsLoading((prevState) => !prevState);
    setTimeout(() => {
      setIsLoading((prevState) => !prevState);
    }, 2000);
  }

  function showAllReducer(data) {
    dispatch({ type: SHOW, payload: { data } });
  }

  function handleSetMonth(month) {
    setFilterValues((prevState) => ({ ...prevState, month }));
  }

  function handleSetYear(year) {
    setFilterValues((prevState) => ({ ...prevState, year }));
  }

  function handleSetCurrentData(data) {
    setCurrentData(() => data);
  }

  function handleFilterChange(data) {
    dispatch({ type: CHANGED, payload: { data } });
  }

  const ctxValues = {
    slice,
    incrementPagination,
    decrementPagination,
    showAllReducer,
    state,
    isLoading,
    viewAllScroll,
    handleSetMonth,
    handleSetYear,
    filterValues,
    currentData,
    handleSetCurrentData,
    handleFilterChange,
  };

  return (
    <ResourceCardContext.Provider value={ctxValues}>
      <ul className={`${className} space-y-14 `}>{children}</ul>
    </ResourceCardContext.Provider>
  );
}

ResourcesCard.Eyebrow = ResourcesEyebrow;
ResourcesCard.ItemsContainer = ResourcesCardItemsContainer;
ResourcesCard.ItemA = ResourcesCardItemA;
ResourcesCard.ItemB = ResourcesCardItemB;
ResourcesCard.PaginationContainer = ResourcesCardPaginationContainer;
