const transportMultipliers = require("../utils/transportMultipliers.utils");

const calculateTransportCO2 = (transportValue) => {
  const { vehicle, fuel, milage, passengers } = transportValue;
  let transportCO2 = 0;
  switch (vehicle) {
    case "Car":
      console.log("Got here 1 @: ");
      switch (fuel) {
        case "Petrol":
          transportCO2 = transportMultipliers.CarPetrolAvgC02PerKM * milage;
          console.log("Got here 2 @: ", transportCO2);
          break;
        case "Diesel":
          transportCO2 = transportMultipliers.CarDieselAvgC02PerKM * milage;
          break;
        case "Hybrid":
          transportCO2 = transportMultipliers.CarHybridAvgCO2PerKM * milage;
          break;
        case "Electric":
          return 0;
      }
      if (passengers == 0) {
        return transportCO2;
      }
      transportCO2 = transportCO2 / passengers;

      console.log("Got here 3 @: ", transportCO2);
      return transportCO2;
    case "Van":
      switch (fuel) {
        case "Petrol":
          transportCO2 = transportMultipliers.VanPetrolAvgCO2PerKM * milage;
          break;
        case "Diesel":
          transportCO2 = transportMultipliers.VanDieselAvgCO2PerKM * milage;
          break;
        case "Electric":
          return 0;
      }
      if (passengers == 0) {
        return transportCO2;
      }
      transportCO2 = transportCO2 / passengers;
      return transportCO2;
    case "Motorbike":
      switch (fuel) {
        case "Petrol":
          transportCO2 =
            transportMultipliers.MotorcyclePetrolAvgCO2PerKM * milage;
          break;
      }
      if (passengers == 0) {
        return transportCO2;
      }
      transportCO2 = transportCO2 / passengers;
      return transportCO2;
    case "Bicycle":
      return 0;
    case "None":
      return 0;
  }
};

module.exports = calculateTransportCO2;
