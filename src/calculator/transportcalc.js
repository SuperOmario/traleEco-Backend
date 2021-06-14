const transportMultipliers = require("../utils/transportMultipliers.utils");

const calculateTransportCO2 = (transportValue) => {
  const { vehicle, fuel, milage, passengers } = transportValue;
  let transportCO2 = 0;
  switch (vehicle) {
    case "Car" :
      switch (fuel) {
        case "Petrol" :
          transportCO2 = transportMultipliers.CarPetrolAvgC02PerKM * milage;
          break;
        case "Diesel" :
          transportCO2 = transportMultipliers.CarDieselAvgC02PerKM * milage;
          break;
        case "Hybrid" :
          transportCO2 = transportMultipliers.CarHybridAvgCO2PerKM * milage;
          break;
      }
        transportCO2 = transportCO2 / passengers;
        return transportCO2;;
    case "Van" :
      switch (fuel) {
        case "Petrol":
          transportCO2 = transportMultipliers.VanPetrolAvgCO2PerKM * milage;
          break;
        case "Diesel" :
          transportCO2 = transportMultipliers.VanDieselAvgCO2PerKM * milage;
          break;
      }
      console.log(transportCO2)
      transportCO2 = transportCO2 / passengers;
      return transportCO2;
    case "Motorbike":
      switch (fuel) {
        case "Petrol":
          transportCO2 = transportMultipliers.MotorcyclePetrolAvgCO2PerKM * milage;
          break;
      } 
      transportCO2 = transportCO2 / passengers;
      return transportCO2;
    case "Bicycle" :
      return 0;
  }

};

module.exports = calculateTransportCO2;
