const multipliers = require("../utils/consumerMultipliers.utils");

const calculateServicesCO2 = (serviceValues) => {
    const { paper, clothing, phone, tv, internet} = servicesValues
    const servicesCO2 = (tv * multipliers.tvCO2perHour) + (phone * multipliers.callCO2perMinute) + (internet * multipliers.internetCO2perGB) + (paper * multipliers.paperCO2perEuro) + (clothing * multipliers.clothingCO2perEuro);
    return servicesCO2;
}

module.exports = calculateServicesCO2;