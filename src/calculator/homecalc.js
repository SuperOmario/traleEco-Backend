const calculateHomeCO2 = (berrating, homesize) => {
    var multiplier = 0;
    //sets a multiplier based on the BER Rating of house
    switch (berrating) {
        case('A1') : multiplier = 0.0053;
        case('A2') : multiplier = 0.0108;
        case('A3') : multiplier = 0.013567;
        case('B1') : multiplier = 0.016933;
        case('B2') : multiplier = 0.0217;
        case('B3') : multiplier = 0.0267;
        case('C1') : multiplier = 0.031433;
        case('C2') : multiplier = 0.036933;
        case('C3') : multiplier = 0.0422;
        case('D1') : multiplier = 0.0498;
        case('D2') : multiplier = 0.058433;
        case('E1') : multiplier = 0.067;
        case('E2') : multiplier = 0.075833;
        case('F') : multiplier = 0.0908;
        case('G') : multiplier = 0.1133;
    }
    //multiplies homesize by the multiplier we set and returns value
    const HomeCO2 = homesize * multiplier;
    return HomeCO2;
}