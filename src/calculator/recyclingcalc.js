const calculateRecyclingCO2 = (glass, plastic, paper, foil) => {
    //average yearly waste per person
    var plasticWaste = 0.033;
    var glassWaste = 0.00413;
    var paperWaste = 0.01651;
    var foilWaste = 0.0033;

    //CO2 emissions per person
    var plasticCO2 = 0.05808;
    var glassCO2 = 0.0013629;
    var paperCO2 = 0.0624078;
    var foilCO2 = 0.05808;

    //CO2 reduced per tonne of recycling
    var plasticCO2Reduction = 1.76;
    var glassCO2Reduction = .33;
    var paperCO2Reduciton = 3.78;
    var foilCO2Reduction = 1.76;

    //this is just a complicated way of saying the carbon emissions are 0
    //I feel this is wrong though so I haven't hard coded it. We need to figure out what the missing step is
    if (plastic) {
        plasticCO2 -= (plasticWaste * plasticCO2Reduction);
    }
    if (glass) {
        glassCO2 -= (glassWaste * glassCO2Reduction);
    }
    if (paper) {
        paperCO2 -= (paperWaste * paperCO2Reduciton);
    }
    if (foil) {
        foilCO2 -= (foilWaste * foilCO2Reduction);
    }
}