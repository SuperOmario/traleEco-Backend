const multipliers = require("../utils/homeMultipliers.utils");
const calculateRecyclingCO2 = require("../calculator/recyclingcalc");

const calculateHomeCO2 = (homeValues) => {
  const {
    brating,
    homesize,
    glass,
    plastic,
    paper,
    recycleCans: cans,
  } = homeValues;
  var multiplier = 0;
  //sets a multiplier based on the BER Rating of house
  switch (brating) {
    case "A1":
      multiplier = multipliers.A1Multiplier;
      break;
    case "A2":
      multiplier = multipliers.A2Multiplier;
      break;
    case "A3":
      multiplier = multipliers.A3Multiplier;
      break;
    case "B1":
      multiplier = multipliers.B1Multiplier;
      break;
    case "B2":
      multiplier = multipliers.B2Multiplier;
      break;
    case "B3":
      multiplier = multipliers.B3Multiplier;
      break;
    case "C1":
      multiplier = multipliers.C1Multiplier;
      break;
    case "C2":
      multiplier = multipliers.C2Multiplier;
      break;
    case "C3":
      multiplier = multipliers.C3Multiplier;
      break;
    case "D1":
      multiplier = multipliers.D1Multiplier;
      break;
    case "D2":
      multiplier = multipliers.D2Multiplier;
      break;
    case "E1":
      multiplier = multipliers.E1Multiplier;
      break;
    case "E2":
      multiplier = multipliers.E2Multiplier;
      break;
    case "F":
      multiplier = multipliers.FMultiplier;
      break;
    case "G":
      multiplier = multipliers.GMultiplier;
      break;
  }
  //multiplies homesize by the multiplier we set and returns value
  let HomeCO2 = homesize * multiplier;
  HomeCO2 += calculateRecyclingCO2(glass, plastic, paper, cans);
  return HomeCO2;
};

module.exports = calculateHomeCO2;
