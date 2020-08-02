document.getElementById("submit-btn").addEventListener("click", calculateInput);

function calculateInput() {
	document.getElementById("result").innerHTML = "";
	document.getElementById("total").innerHTML = "";
	document.getElementById("error").innerHTML = "";

	var totalGrams = document.getElementById("total-grams").value;
	var numberOfBags = document.getElementById("number-of-bags").value;
	var scoopSize = document.getElementById("scoop-size").value;

	if (totalGrams && numberOfBags && scoopSize) {
		var answer = "";
		var total = "";
		var error = "";
		totalGrams = parseFloat(totalGrams);
		numberOfBags = parseInt(numberOfBags);
		scoopSize = parseFloat(scoopSize);

		if (totalGrams == numberOfBags && scoopSize != 1) {
			error = "Error: maximum scoop size must be 1";
			return document.getElementById("error").innerHTML = error;
		}

		if (numberOfBags * scoopSize > totalGrams) {
			error = "Error: total grams must be greater than bags x scoop size";
			return document.getElementById("error").innerHTML = error;
		}

		var numberOfScoops = Math.ceil(totalGrams / scoopSize);
		var bagsAdditionalScoopsNeeded = numberOfScoops - numberOfBags;

		if (bagsAdditionalScoopsNeeded <= numberOfBags) {
			var remainder = Math.ceil(totalGrams / scoopSize) - numberOfBags;
			var result = { numberTimes: 1, remainder: remainder };
			if (result.remainder > 0) {
				answer = "<p>2 pulls for " + remainder + " bags</p> <p>1 pull for " + (numberOfBags - result.remainder) + " bags</p>";
				total = "<p>Total &#8776; " + parseFloat((2 * remainder * scoopSize) + ((numberOfBags - result.remainder) * scoopSize)).toFixed(2) + " grams</p>";
			}
			else {
				answer = "<p>1 pull for " + (numberOfBags - result.remainder) + " bags</p>";
				total = "<p>Total &#8776; " + parseFloat((numberOfBags - result.remainder) * scoopSize).toFixed(2) + " grams</p>";
			}
		}
		else {
			var result = bagsAdditionalScoopsNeededFunction(numberOfBags, bagsAdditionalScoopsNeeded);
			if (result.remainder > 0) {
				answer = "<p>" + (result.numberTimes + 2) + " pulls for " + result.remainder + " bags</p>" + "<p>" + (result.numberTimes + 1) + " pulls for " + (numberOfBags - result.remainder) + " bags</p>";
				total = "<p>Total &#8776; " + parseFloat(((result.numberTimes + 2) * result.remainder * scoopSize) + ((result.numberTimes + 1) * (numberOfBags - result.remainder) * scoopSize)).toFixed(2) + " grams</p>"
			}
			else {
				answer = "<p>" + (result.numberTimes + 1) + " pulls for " + (numberOfBags - result.remainder) + " bags</p>"
				total = "<p>Total &#8776; " + parseFloat((result.numberTimes + 1) * (numberOfBags - result.remainder) * scoopSize).toFixed(2) + " grams</p>";
			}
		}

		document.getElementById("result").innerHTML = answer;
		document.getElementById("total").innerHTML = total;
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
	return { numberTimes: count, remainder: bagsAdditionalScoopsNeeded };
}