const calculateFoodCO2 = require("../calculator/foodcalc");
const calculateHomeCO2 = require("../calculator/homecalc");
const calculateRecyclingCO2 = require("../calculator/recyclingcalc");

const calculateCarbonFootprint = ({
    fish,
    beef,
    chicken,
    pork,
    dairy,
    // waste,
    homegrown,
    // seasonal,
    local,
    // mainVehicle,
    // Car,
    // fuelType,
    // Diesel,
    // milage,
    // engineSize,
    // averageNoOfPassengers,
    // regularMaintenance,
    // phone,
    // internet,
    // tvContract,
    // other,
    // furnitureAppliances,
    // paperOffice,
    // clothing,
    // entertainment,
    // medical,
    // pets,
    // primaryHeating,
    berRating,
    homeSize,
    // electricity,
    // greenElectricity,
    recyclePlastic,
    recycleGlass,
    recyclePaper,
    recycleCans,
    // user_idUser
}) => {
    const foodCO2 = calculateFoodCO2(fish, beef, chicken, pork, dairy, local, homegrown);
    const homeCO2 = calculateHomeCO2(berRating, homeSize) + calculateRecyclingCO2(recycleCans, recycleGlass, recyclePaper, recyclePlastic);
    const totalCO2 = foodCO2 + homeCO2;
    console.log(totalCO2);
    return totalCO2;
}

exports = calculateCarbonFootprint