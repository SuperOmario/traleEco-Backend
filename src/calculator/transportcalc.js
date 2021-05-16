const transportMultipliers = require("../utils/transportMultipliers.utils")

const calculateTransportCO2 = (transportValue) => {
    const {vehicle, engine, milage, fuel, passengers, maintenanceCost} = transportValue
    let transportCO2 = 0;
    if (vehicle == "Car") {
        transportCO2 = (transportMultipliers.AvgC02PerKM * milage);
        transportCO2 = transportCO2/passengers;
    }
    return transportCO2;
}

module.exports = calculateTransportCO2