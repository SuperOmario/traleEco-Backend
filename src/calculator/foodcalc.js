//Calculates CO2 emissions from food by the tonne per year
const calculateFoodCO2 = (beef, pork, chicken, fish, dairy, ) => {
    const meat = beef + pork + chicken;
    var FoodCO2 = 0;
    //if vegan diet calculate vegan emissions
    if (meat + fish + dairy == 0) {
        FoodCO2 = 1.05485 * 7;
        FoodCO2 *= 365;
        return FoodCO2;
    }
    //if not vegan, calculate based on days consuming fish and other meats 
    //maybe clean up the figures. get them from a utils file
    var meatMultiplier = 0;
    const fishMultiplier = 1.42715;
    const vegMultiplier = 1.39065;
    switch (true) {
        case (meat >= 2) :
            meatMultiplier = 2.62435;
            break;   
        case (meat == 1) :
            meatMultiplier = 2.05495;
            break;
        case (meat == 0) :
            break;
    }
    const vegDays = 7 - meat - fish;
    FoodCO2 = ((meat * meatMultiplier) + (fish * fishMultiplier) + (vegDays * vegMultiplier)) * 365
    return FoodCO2;
}

const calculateOffset = (FoodCO2, local, homegrown) => {
    var localOffset = 0;
    var homegrownOffset = 0;
    //if local food is purchased this offsets the CO2 produced by about 6%
    if (local == 1) {
       localOffset = FoodCO2 * .06; 
    }
    //percentage of food which is homegrown offsets CO2 by a maximum of 6%
    //unsure of figures being passed through by frontend. Must get these off Emily
    if (homegrown != 0) {
        const hgOffsetPercentage = homegrown * .06;
        homegrownOffset = FoodCO2 * hgOffsetPercentage;
    }
    FoodCO2 -= localOffset;
    FoodCO2 -= homegrownOffset;
    return FoodCO2;
}