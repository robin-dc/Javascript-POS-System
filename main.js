// 1. List of Foods with 3 categories : Food , Beverages, Desert
// 2. Pick a category
// 3. Pick your choice and quantity
// 4. a. Order again, b.Pay
// 5. If a then go to step 2
// 6. If b then go to payment
// 7. Receipt
// 8. Prompt thank you for ordering, your number is __

const prompt = require("prompt-sync")();

const categories = {
    FOODS: {
            BURGER: 35,
            FRIES: 20,
            PASTA: 50,
            CHICKEN : 50
            },

    BEVERAGES: {
                COKE: 20,
                SPRITE: 20,
                ROYAL: 20,
                WATER: 0
                },

    DESSERT: {
                SUNDAE: 30,
                FLOAT: 30,
                PIE: 50,
                FLURRY: 35
            },
    // 'MIX n MATCH':{                  // YOU CAN ADD THIS TO SEE THE DYNAMIC FEATURE
    //                 A1: 75,
    //                 B1: 75,
    //                 C1: 75,
    //             }
}

const categoryKeys = Object.keys(categories); // array of keys for category
const categoryValues = Object.values(categories); // array of values for category

let choiceLength = 0;
let choiceObject;
let total = 0;
let receipt = [];
let generatedNumbers = [];


const randomNumberGenerator = () => {
    const randomNumber = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

    if (generatedNumbers.includes(randomNumber)) {
        return randomNumberGenerator();
    }

    generatedNumbers.push(randomNumber);
    return randomNumber;
}

const menuListGenerator = (chosen) => {
    let menu = ""
    for(const key of categoryKeys) {
        if(chosen == key){
            const choices = categories[chosen]
            const choiceKeys = Object.keys(choices);
            const choiceValues = Object.values(choices);

            for(let i = 0; i < choiceKeys.length; i++) {
                let key = choiceKeys[i];
                let value = choiceValues[i];

                menu += `${i+1}. ${key}: ₱${value}\t\t`
            }
            console.log(menu)
            choiceLength = choiceKeys.length
            choiceObject = choices
            // console.log(choiceObject)
            // console.log(choiceLength)
        }
    }
}

const categoryListGenerator = () => {
    let category = ""

    for(let i = 0; i < categoryKeys.length; i++) {
        const key = categoryKeys[i];
        category += `${i+1}. ${key}\t\t`
    }
    console.log(category)
}

const receiptGenerator = (change, payment) => {
    let text = "";

    for(let i = 0; i < receipt.length; i ++){
        text += `${receipt[i]}\n`;
    }
    console.log("");
    console.log("======================================================");
    console.log("");
    console.log("QUANTITY\tORDER\t\tPRICE\t\tTOTAL");
    console.log(text);
    console.log("");
    console.log(`TOTAL ......................................... ₱${total}`);
    console.log(`PAYMENT ....................................... ₱${payment}`);
    console.log(`CHANGE ........................................ ₱${change}`);
    console.log("");
    console.log("");
    console.log(`Thank you for ordering, your number is ${randomNumberGenerator()}.`)
    console.log("");
    console.log("======================================================");

}
const categoryMethod = () =>{
    console.log("");
    console.log("====================== WELCOME TO MC DONALDS ======================");
    console.log("");
    console.log("CATEGORIES TO CHOOSE FROM:");
    console.log("");
    categoryListGenerator();

    while(true){
        console.log("");
        const chosenCategory = prompt("Enter your chosen category: ");
        const numberChosenCategory = parseFloat(chosenCategory);

        if(isNaN(numberChosenCategory) || numberChosenCategory <= 0 || numberChosenCategory > categoryKeys.length){
            console.log("Invalid category, Enter Again.")
        }
        else{
            return categoryKeys[numberChosenCategory-1];
        }
    }
}

const chosenMethod = (category) => {
    console.log("");
    console.log(`====================== ${category} CATEGORY ======================`);
    console.log("");
    menuListGenerator(category);

    while(true){
        console.log("");
        const chosen = prompt("Enter your choice: ");
        const numberChosen = parseFloat(chosen);

        if(isNaN(numberChosen) || numberChosen <= 0 || numberChosen > choiceLength) {
            console.log("Invalid choice, Enter Again.")
        }
        else{
            return numberChosen-1;
        }
    }
}
const quantityMethod = (choice) => {

    while(true){
        const quantity = prompt("Enter your quantity: ");
        const numberQuantity = parseFloat(quantity);

        if(isNaN(numberQuantity) || numberQuantity <= 0) {
            console.log("Invalid quantity, Enter Again.")
        }
        else{
            const choiceValues = Object.values(choiceObject) // array of choice values
            const choiceKeys = Object.keys(choiceObject) // array of choice keys

            price = numberQuantity * choiceValues[choice];
            total += price;

            console.log("Total: ", total);

            receipt.push(`${numberQuantity}\t\t${choiceKeys[choice]}\t\t₱${choiceValues[choice]}\t\t₱${price}`)

            reOrderMethod()
            return total;
        }
    }
}

const paymentMethod = (total) =>{
    console.log("");
    console.log("====================== PAYMENT ======================");

    while(true){
        console.log("");
        console.log(`THE TOTAL AMOUNT OF ORDER IS ${total}, PLEASE PAY ACCORDINGLY`);
        console.log("");
        const payment = prompt("Enter payment amount: ");
        const numberPayment = parseFloat(payment);

        if(isNaN(numberPayment) || numberPayment <= 0 || numberPayment < total){
            console.log("Invalid amount, Enter Again.")
        }
        else{
            console.log("");
            console.log(`You pay ${numberPayment}`);
            const change = numberPayment - total;
            receiptGenerator(change, numberPayment);
            return;
        }
    }
}

const process = () => {
    const categoryChosen = categoryMethod()
    const chosenFood = chosenMethod(categoryChosen)
    const quantity = quantityMethod(chosenFood)
}


function reOrderMethod() {
    console.log("");
    console.log("======================================================");
    console.log("");
    console.log(`1. ORDER AGAIN \t\t 2. CONTINUE TO PAY`);

    while(true){
        console.log("");
        const command = prompt("Enter command: ");
        const numberCommand = parseFloat(command);

        if(isNaN(numberCommand) || numberCommand <= 0 || numberCommand > 3) {
            console.log("Invalid command, Enter Again.")
        }
        else{
            switch(numberCommand){
                case 1: return process();
                case 2: return paymentMethod(total);
            }
        }
    }
}

process();


// ARRAY REFERENCE FOR MENU LIST

// const FOODS = ["BURGER", "FRIES", "SPAGHETTI", "CHICKEN"];
// const BEVERAGES = ["COKE", "SPRITE", "ROYAL", "WATER"];
// const DESSERT = ["SUNDAE", "FLOAT", "APPLE PIE", "MCFLURRY"];
