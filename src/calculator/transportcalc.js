const transportMultipliers = require("../utils/transportMultipliers.utils");

const calculateTransportCO2 = (transportValue) => {
  const { vehicle, fuel, milage, passengers } = transportValue;
  let transportCO2 = 0;
  switch (vehicle) {
    case "Car" :
      console.log("Car");
      switch (fuel) {
        case "Petrol" :
          transportCO2 = transportMultipliers.CarPetrolAvgC02PerKM * milage;
          break;
        case "Diesel" :
          transportCO2 = transportMultipliers.CarDieselAvgC02PerKM * milage;
          break;
        case "Hybrid" :
          transportCO2 = transportMultipliers.CarHybridAvgC02PerKM * milage;
          break;
      }
        transportCO2 = transportCO2 / passengers;
        return transportCO2;;
    case "Van" :
      console.log("Van");
      switch (fuel) {
        case "Petrol":
          transportCO2 = transportMultipliers.VanPetrolAvgC02PerKM * milage;
          break;
        case "Diesel" :
          transportCO2 = transportMultipliers.VanDieselAvgC02PerKM * milage;
          break;
      }
      transportCO2 = transportCO2 / passengers;
      return transportCO2;;
    case "Motorcycle":
      console.log("Motorcycle");
      switch (fuel) {
        case "Petrol":
          transportCO2 = transportMultipliers.MotorcyclePetrolAvgC02PerKM * milage;
          break;
      } 
      transportCO2 = transportCO2 / passengers;
      return transportCO2;;
  }
};

module.exports = calculateTransportCO2;
