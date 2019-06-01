const getConditionText = (condition) => {
    switch (condition) {
        case 1000:
            return "new";
        case 1500:
            return "new other" ;
        case 1750:
            return "new with defects";
        case 2000:
            return "manufacturer refurbished";
        case 2500:
            return "Seller refurbished";
        case 3000:
            return "used";
        case 4000:
            return "very good";
        case 5000:
            return "good";
        case 6000:
            return "acceptable";
        case 7000:
            return "for parts or not working";
    }
}

module.exports.getConditionText = getConditionText