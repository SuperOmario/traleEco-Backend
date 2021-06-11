const calculateFoodCO2 = require("./foodcalc");
const calculateHomeCO2 = require("./homecalc");
const calculateTransportCO2 = require("./transportcalc");
const calculateServicesCO2 = require("./consumercalc");

const calcUpdate = (foodValue, homeValues, serviceValues, transportValues) => {
  const foodCO2 = foodValue;
  const homeCO2 = homeValues;
  const serviceCO2 = serviceValues;
  const transportCO2 = transportValues;

  const totalCO2 = foodCO2 + homeCO2 + transportCO2 + serviceCO2;
  const CarbonFootprint = {
    FoodCarbon: foodCO2,
    HomeCarbon: homeCO2,
    ServicesCarbon: serviceCO2,
    TransportCarbon: transportCO2,
    TotalCarbon: totalCO2,
  };
  return CarbonFootprint;
};

module.exports = calcUpdate;
