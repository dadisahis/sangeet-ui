import React, { createContext, useReducer } from "react";

export const INITIAL_STATE = [
  {
    _id: 0,
    trackObject: null,
    name: null,
    artists: [],
    albums: [],
    genre: [],
    total_plays: null,
    duration: null,
  },
];

export const trackContext = createContext(INITIAL_STATE);

const TrackReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_TRACK":
      const trackList = JSON.parse(
        localStorage.getItem("recentlyPlayed") || "[]"
      );
      if (trackList.length >= 10) {
        trackList.splice(0, 2);
      }
      trackList.push(action.payload);
      // localStorage.setItem("recentlyPlayed", JSON.stringify(trackList));
      return action.payload;
    case "ADD_TO_QUEUE":
      return action.payload;
    case "PLAY_NEXT":
      return action.payload;
    default:
      return state;
  }
};
export const TrackContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TrackReducer, INITIAL_STATE);
  return (
    <trackContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </trackContext.Provider>
  );
};
