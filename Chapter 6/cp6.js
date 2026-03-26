// Calculates the total cost of the petrol purchased and displays the result to the screen

const priceInput = document.getElementById("price");
const litersInput = document.getElementById("liters");
const calculate = document.getElementById("calculate");
const totalParagraph = document.getElementById("total");

calculate.addEventListener("click", function () {

    // Convert input values to numbers
    const price = parseFloat(priceInput.value);
    const liters = parseFloat(litersInput.value);

    // Validate that inputs are valid numbers
    if (isNaN(price) || isNaN(liters) || price < 0 || liters < 0) {
        totalParagraph.textContent = "Please enter valid positive numbers.";
        return;
    }

    // Calculate total cost
    const totalCost = price * liters;

    // Display total cost
    totalParagraph.textContent = `Total: AED${totalCost.toFixed(2)}`;
});