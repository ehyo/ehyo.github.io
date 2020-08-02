document.getElementById("submit-btn").addEventListener("click", calculateInput);

function calculateInput() {
    document.getElementById("result").innerHTML = "";
    var totalGrams = document.getElementById("total-grams").value;
    var numberOfBags = document.getElementById("number-of-bags").value;
    var scoopSize = document.getElementById("scoop-size").value;

    if (totalGrams && numberOfBags && scoopSize) {
        var answer = "";
        totalGrams = parseFloat(totalGrams);
        numberOfBags = parseInt(numberOfBags);
        scoopSize = parseFloat(scoopSize);
    
        var numberOfScoops = Math.ceil(totalGrams / scoopSize);
        var bagsAdditionalScoopsNeeded = numberOfScoops - numberOfBags;
    
        if (bagsAdditionalScoopsNeeded <= numberOfBags) {
            var remainder = Math.ceil(totalGrams / scoopSize) - numberOfBags;
            var result = {numberTimes: 1, remainder: remainder};
            if (result.remainder > 0){
                answer = "<p>2 pulls for " + remainder + " bags</p> <p>1 pull for " + (numberOfBags - result.remainder) + " bags</p>";
            }
            else {
                answer = "<p>1 pull for " + (numberOfBags) + " bags</p>";
            }
        }
        else {
           var result = bagsAdditionalScoopsNeededFunction(numberOfBags, bagsAdditionalScoopsNeeded);
           if (result.remainder > 0) {
            answer = "<p>" + (result.numberTimes + 2) + " pulls for " + result.remainder + " bags</p>" + "<p>" + (result.numberTimes + 1) + " pulls for " + (numberOfBags - result.remainder) + " bags</p>";
    
           }
           else {
            answer = "<p>" + (result.numberTimes + 1) + " pulls for " + (numberOfBags - result.remainder) + " bags</p>"
           }
           
        }

        document.getElementById("result").innerHTML = answer;
    }
}

function bagsAdditionalScoopsNeededFunction(numberOfBags, bagsAdditionalScoopsNeeded) {
    var i = bagsAdditionalScoopsNeeded;
    var count = 0;
    for (i = 0; i <= bagsAdditionalScoopsNeeded; i--) {
        count++;
        bagsAdditionalScoopsNeeded = bagsAdditionalScoopsNeeded - numberOfBags;
        if (bagsAdditionalScoopsNeeded < numberOfBags)
            break;
    }
    return {numberTimes: count, remainder: bagsAdditionalScoopsNeeded};
}