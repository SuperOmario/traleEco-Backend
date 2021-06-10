const multipliers = require("../utils/consumerMultipliers.utils");

const calculateServicesCO2 = (serviceValues) => {
  const { office, clothing, phone, tv, internet } = serviceValues;
  console.log("the multipler for service is : ", multipliers);
  const servicesCO2 =
    ((tv * multipliers.tvCO2perHour) +
    (phone * multipliers.callCO2perMinute) +
    (internet * multipliers.internetCO2perGB) +
    (office * multipliers.paperCO2perEuro) +
    (clothing * multipliers.clothingCO2perEuro)) * 12;
  return servicesCO2;
};

module.exports = calculateServicesCO2;
