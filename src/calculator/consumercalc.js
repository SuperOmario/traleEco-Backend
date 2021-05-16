const multipliers = require("../utils/consumerMultipliers.utils");

const calculateServicesCO2 = (TV, phone, internet 
    //, sms
    ) => {
    const servicesCO2 = (TV * multipliers.tvCO2perHour) + (phone * multipliers.callCO2perMinute) + (internet * multipliers.internetCO2perGB);
    //  + (sms * multipliers.SMSCO2);
    return servicesCO2;
}

const calculateShoppingCO2 = (paper, clothing) =>{
    const shoppingCO2 = (paper * multipliers.paperCO2perEuro) + (clothing * multipliers.clothingCO2perEuro);
    return shoppingCO2
}

const calculateConsumerCO2 = (serviceValues, purchaseValues) => {
    const {tv, phone, internet, sms} = serviceValues;
    const {office, clothing} = purchaseValues;
    let consumerCO2 = 0;
    consumerCO2 = calculateServicesCO2(tv, phone, internet, sms);
    consumerCO2 += calculateShoppingCO2(office, clothing);
    return consumerCO2;
}

module.exports = calculateConsumerCO2;