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

  return { ...state, bussesToTrack: newBussesToTrack };
};
