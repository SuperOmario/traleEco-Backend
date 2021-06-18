const Mutlipliers = require("../utils/foodMultipliers.utils");

//Calculates CO2 emissions from food by the tonne per year
const calculateFoodCO2 = (foodValue) => {
  const { beef, pork, chicken, fish, dairy, local, homegrown } = foodValue;
  console.log(beef, pork, chicken, fish, dairy, local, homegrown);
  const meat = beef + pork + chicken;

  let FoodCO2 = 0;

  // if vegan diet calculate vegan emissions
  if (meat + fish + dairy == 0) {
    FoodCO2 = Mutlipliers.veganMultiplier * 7;
    FoodCO2 *= 365;

    // if local food is purchased this offsets the CO2 produced by about 6%
  if (local == "Y") {
    localOffset = (FoodCO2 * 0.06).toFixed(2);
  }
  // //percentage of food which is homegrown offsets CO2 by a maximum of 6%
  if (homegrown > 0) {
    let hgOffsetPercentage = homegrown * 0.06;
    if (hgOffsetPercentage > 0.06) {
      hgOffsetPercentage = 0.06
    }
    homegrownOffset = (FoodCO2 * hgOffsetPercentage).toFixed(2);
  }
  FoodCO2 -= localOffset;
  FoodCO2 -= homegrownOffset;

    return FoodCO2.toFixed(2);
  }
  // //if not vegan, calculate based on days consuming fish and other meats
  let meatMultiplier = 0;

  const fishMultiplier = Mutlipliers.fishMultiplier;
  const vegMultiplier = Mutlipliers.vegMultiplier;
  switch (true) {
    case meat >= 2:
      meatMultiplier = Mutlipliers.meat2Multiplier;

      break;
    case meat == 1:
      meatMultiplier = Mutlipliers.meat2Multiplier;

      break;
    case meat == 0:
      break;
  }
  if (7 - (meat + fish) > 0) {
    let vegDays = 7 - (meat + fish);
    FoodCO2 = (
      (meat * meatMultiplier + fish * fishMultiplier + vegDays * vegMultiplier) *
      (365 / 7)
    ).toFixed(2);
    console.log(vegDays)
  } else {
    FoodCO2 = (
      (meat * meatMultiplier + fish * fishMultiplier) *
      (365 / 7)
    ).toFixed(2);
  }
  
  FoodCO2 = calculateOffset(FoodCO2, local, homegrown);
  return FoodCO2;
};

const calculateOffset = (FoodCO2, local, homegrown) => {
  let localOffset = 0;
  let homegrownOffset = 0;

  // if local food is purchased this offsets the CO2 produced by about 6%
  if (local == "Y") {
    localOffset = (FoodCO2 * 0.06).toFixed(2);
  }
  // //percentage of food which is homegrown offsets CO2 by a maximum of 6%
  if (homegrown > 0) {
    let hgOffsetPercentage = homegrown / 100;
    homegrownOffset = (FoodCO2 * hgOffsetPercentage).toFixed(2);
  }
  FoodCO2 -= localOffset;
  FoodCO2 -= homegrownOffset;
  return FoodCO2;
};

module.exports = calculateFoodCO2;
