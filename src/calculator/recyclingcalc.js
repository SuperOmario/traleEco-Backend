const multipliers = require("../utils/wasteMultipliers.utils");

const calculateRecyclingCO2 = (glass, plastic, paper, cans) => {
  //average yearly waste per person (may be needed later for rework)
  // var plasticWaste = 0.033;
  // var glassWaste = 0.00413;
  // var paperWaste = 0.01651;
  // var cansWaste = 0.0033;

  //CO2 emissions per person
  var plasticCO2 = multipliers.plasticCO2;
  var glassCO2 = multipliers.glassCO2;
  var paperCO2 = multipliers.paperCO2;
  var cansCO2 = multipliers.cansCO2;

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

module.exports = calculateRecyclingCO2;
