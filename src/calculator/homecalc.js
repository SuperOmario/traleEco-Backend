const calculateHomeCO2 = (berrating, homesize) => {
    var multiplier = 0;
    //sets a multiplier based on the BER Rating of house
    switch (berrating) {
        case('A1') : 
            multiplier = 0.0053;
            break;
        case('A2') : 
            multiplier = 0.0108;
            break;
        case('A3') :
            multiplier = 0.013567;
            break;
        case('B1') : 
            multiplier = 0.016933;
            break;
        case('B2') : 
            multiplier = 0.0217;
            break;
        case('B3') : 
            multiplier = 0.0267;
            break;
        case('C1') : 
            multiplier = 0.031433;
            break;
        case('C2') : 
            multiplier = 0.036933;
            break;
        case('C3') : 
            multiplier = 0.0422;
            break;
        case('D1') : 
            multiplier = 0.0498;
            break;
        case('D2') : 
            multiplier = 0.058433;
            break;
        case('E1') : 
            multiplier = 0.067;
            break;
        case('E2') : 
            multiplier = 0.075833;
            break;
        case('F') : 
            multiplier = 0.0908;
            break;
        case('G') : 
            multiplier = 0.1133;
            break;
    }
    //multiplies homesize by the multiplier we set and returns value
    const HomeCO2 = homesize * multiplier;
    return HomeCO2;
}