const multipliers = require("../utils/wasteMultipliers.utils")

const calculateRecyclingCO2 = (glass, plastic, paper, foil) => {
    //average yearly waste per person (may be needed later for rework)
    // var plasticWaste = 0.033;
    // var glassWaste = 0.00413;
    // var paperWaste = 0.01651;
    // var foilWaste = 0.0033;

    //CO2 emissions per person
    var plasticCO2 = multipliers.plasticCO2;
    var glassCO2 = multipliers.glassCO2;
    var paperCO2 = multipliers.paperCO2;
    var foilCO2 = multipliers.foilCO2;

    //CO2 reduced per tonne of recycling (This just results in zero emmissions if used so I simplified the below section - may need to be reworked)
    // var plasticCO2Reduction = 1.76;
    // var glassCO2Reduction = .33;
    // var paperCO2Reduciton = 3.78;
    // var foilCO2Reduction = 1.76;

    if (plastic == "Y") {
        plasticCO2 = 0;
    }
    if (glass == "Y") {
        glassCO2 = 0;
    }
    if (paper == "Y") {
        paperCO2 = 0;
    }
    if (foil == "Y") {
        foilCO2 = 0;
    }

    const wasteCO2 = (plasticCO2 + glassCO2 + paperCO2 + foilCO2)
    return wasteCO2;
}

exports = calculateRecyclingCO2