const calculateFoodCO2 = require("./foodcalc");
const calculateHomeCO2 = require("./homecalc");
const calculateTransportCO2 = require("./transportcalc");
const calculateServicesCO2 = require("./consumercalc");

const calculateCarbonFootprint = ({
  foodValues,
  homeValues,
  serviceValues,
  transportValues
}) => {
  const foodCO2 = calculateFoodCO2(foodValues);
  const homeCO2 = calculateHomeCO2(homeValues); 
  const transportCO2 = calculateTransportCO2(transportValues);
  const serviceCO2 = calculateServicesCO2(serviceValues);
  const totalCO2 = foodCO2 + homeCO2 + transportCO2 + serviceCO2;
  const CarbonFootprint = { FoodCarbon : foodCO2, HomeCarbon : homeCO2, ServicesCarbon : serviceCO2, TransportCarbon : transportCO2, TotalCarbon : totalCO2}
  console.log(CarbonFootprint);
  return CarbonFootprint;
};

module.exports = calculateCarbonFootprint;
