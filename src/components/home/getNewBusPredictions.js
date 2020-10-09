export const getNewBusPredictions = (busData) => {
  const newBusPredictions = [];

  if (busData && busData.length && Array.isArray(busData)) {
    busData.forEach((item) => {
      const { predictions, trackedBusInfo } = item;
      const newPrediction = {
        predictionExists: false,
        routeID: trackedBusInfo.routeID,
        minutes: 0,
        stopName: predictions.StopName,
        direction: `${trackedBusInfo.directionName} → ${trackedBusInfo.tripHeadsign}`,
      };

      predictions.Predictions.forEach((pred) => {
        if (
          trackedBusInfo.routeID.split("*")[0].split("/")[0] === pred.RouteID &&
          trackedBusInfo.directionNum === pred.DirectionNum
        ) {
          newPrediction.predictionExists = true;
          newPrediction.minutes = pred.Minutes;
          newPrediction.direction = pred.DirectionText;
        }
      });

      newBusPredictions.push(newPrediction);
    });
  }

  return newBusPredictions;
};
