import uniqid from "uniqid";

export const addRoutesInfo = (state, routesInfo) => ({ ...state, routesInfo });

export const addDirectionsInfo = (state, directionsInfo) => ({
  ...state,
  directionsInfo,
});

export const addStopsInfo = (state, stopsInfo) => ({ ...state, stopsInfo });

/*
    directionName: "NORTH"
    directionNum: "0"
    routeID: "W4"
    routeName: "W4 - ANACOSTIA STA - DEANWOOD STA"
    stopID: "1000772"
    stopName: "E CAPITOL ST SE + 47TH ST SE"
    stopRoutes: (7) ["96", "96*1", "96*2", "U5", "U6", "W4", "W4*1"]
    tripHeadsign: "DEANWOOD STATION"
  */

export const addNewBusToTrack = (state, newBusInfo) => {
  const newBussesToTrack = [...state.bussesToTrack];
  // If stop ID, routeID and direction already exists - do nothing
  const foundBusToTrack = newBussesToTrack.find(
    (x) =>
      x.stopID === newBusInfo.stopID &&
      x.routeID === newBusInfo.routeID &&
      x.directionNum === newBusInfo.directionNum
  );
  if (foundBusToTrack) return { ...state };

  newBussesToTrack.push({ id: uniqid(), ...newBusInfo });

  writeNewBussesToTrackToLocalStorage(newBussesToTrack);

  return { ...state, bussesToTrack: newBussesToTrack };
};

export const updateBussesToTrack = (state, bussesToTrack) => {
  writeNewBussesToTrackToLocalStorage(bussesToTrack);
  return { ...state, bussesToTrack };
};

export const deleteBusToTrack = (state, id) => {
  const newBussesToTrack = [...state.bussesToTrack].filter((b) => b.id !== id);
  writeNewBussesToTrackToLocalStorage(newBussesToTrack);
  return { ...state, bussesToTrack: newBussesToTrack };
};

export const syncBussesToTrackFromLocalStorage = (state) => {
  if (!state.bussesToTrack || !state.bussesToTrack.length) {
    try {
      const bussesToTrackFromLS = window.localStorage.getItem("bussesToTrack");
      if (bussesToTrackFromLS) {
        const bussesToTrackFromLSParsed = JSON.parse(bussesToTrackFromLS);
        if (bussesToTrackFromLSParsed && bussesToTrackFromLSParsed.length) {
          return { ...state, bussesToTrack: bussesToTrackFromLSParsed };
        }
      }
    } catch (error) {
      console.log(error);
      return { ...state };
    }
  }

  return { ...state };
};

export function writeNewBussesToTrackToLocalStorage(newBussesToTrack) {
  try {
    window.localStorage.setItem(
      "bussesToTrack",
      JSON.stringify(newBussesToTrack)
    );
  } catch (error) {
    console.log(error);
  }
}
