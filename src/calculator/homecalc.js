const multipliers = require("../utils/homeMultipliers.utils");
const recyclingmultipliers = require("../utils/wasteMultipliers.utils");

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



const calculateRecyclingCO2 = (glass, plastic, paper, cans) => {
  //average yearly waste per person (may be needed later for rework)
  // var plasticWaste = 0.033;
  // var glassWaste = 0.00413;
  // var paperWaste = 0.01651;
  // var cansWaste = 0.0033;

  //CO2 emissions per person
  var plasticCO2 = recyclingmultipliers.plasticCO2;
  var glassCO2 = recyclingmultipliers.glassCO2;
  var paperCO2 = recyclingmultipliers.paperCO2;
  var cansCO2 = recyclingmultipliers.cansCO2;

  //CO2 reduced per tonne of recycling (This just results in zero emmissions if used so I simplified the below section - may need to be reworked)
  // var plasticCO2Reduction = 1.76;
  // var glassCO2Reduction = .33;
  // var paperCO2Reduciton = 3.78;
  // var cansCO2Reduction = 1.76;

  if (plastic == "Y") {
    plasticCO2 = 0;
  }
  if (glass == "Y") {
    glassCO2 = 0;
  }
  if (paper == "Y") {
    paperCO2 = 0;
  }
  if (cans == "Y") {
    cansCO2 = 0;
  }

  const wasteCO2 = plasticCO2 + glassCO2 + paperCO2 + cansCO2;
  return wasteCO2;
};

  HomeCO2 += calculateRecyclingCO2(glass, plastic, paper, cans);
  return HomeCO2;

}

module.exports = calculateHomeCO2;
