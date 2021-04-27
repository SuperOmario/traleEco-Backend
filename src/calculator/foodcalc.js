const Mutlipliers = require("../utils/foodMultipliers.utils");

//Calculates CO2 emissions from food by the tonne per year
const calculateFoodCO2 = (foodValue) => {
  const { beef, pork, chicken, fish, dairy, local, homegrown } = foodValue;

  const meat = beef + pork + chicken;

  let FoodCO2 = 0;
  //if vegan diet calculate vegan emissions
  if (meat + fish + dairy == 0) {
    FoodCO2 = Mutlipliers.veganMultiplier * 7;
    FoodCO2 *= 365;
    console.log("Got here 1 :", FoodCO2);
    return FoodCO2;
  }
  //if not vegan, calculate based on days consuming fish and other meats
  //maybe clean up the figures. get them from a utils file
  let meatMultiplier = 0;
  const fishMultiplier = Mutlipliers.fishMultiplier;
  const vegMultiplier = Mutlipliers.vegMultiplier;
  switch (true) {
    case meat >= 2:
      meatMultiplier = Mutlipliers.meat2multiplier;
      break;
    case meat == 1:
      meatMultiplier = Mutlipliers.meat1multiplier;
      break;
    case meat == 0:
      break;
  }
  const vegDays = 7 - meat - fish;
  FoodCO2 =
    (meat * meatMultiplier + fish * fishMultiplier + vegDays * vegMultiplier) *
    365;
  FoodCO2 = calculateOffset(FoodCO2, local, homegrown);
  console.log("Got here 2 :", FoodCO2);
  return FoodCO2;
};

const calculateOffset = (FoodCO2, local, homegrown) => {
  let localOffset = 0;
  let homegrownOffset = 0;
  //if local food is purchased this offsets the CO2 produced by about 6%
  if (local == 1) {
    localOffset = FoodCO2 * 0.06;
  }
  //percentage of food which is homegrown offsets CO2 by a maximum of 6%
  if (homegrown != 0) {
    const hgOffsetPercentage = homegrown * 0.06;
    homegrownOffset = FoodCO2 * hgOffsetPercentage;
  }
  FoodCO2 -= localOffset;
  FoodCO2 -= homegrownOffset;
  console.log("Got here 3 :", FoodCO2);
  return FoodCO2;
};

module.exports = calculateFoodCO2;
