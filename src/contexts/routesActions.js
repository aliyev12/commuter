export const addRoutesInfo = (state, routesInfo) => ({ ...state, routesInfo });

export const addDirectionsInfo = (state, directionsInfo) => ({
  ...state,
  directionsInfo,
});

export const addStopsInfo = (state, stopsInfo) => ({ ...state, stopsInfo });

export const addNewBusToTrack = (state, newBusInfo) => {
  const newBussesToTrack = [...state.bussesToTrack];
  // If stop ID already exists - do nothing
  const foundBusToTrack = newBussesToTrack.find(
    (x) => x.stopID === newBusInfo.stopID
  );
  if (foundBusToTrack) return { ...state };

  newBussesToTrack.push(newBusInfo);

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
