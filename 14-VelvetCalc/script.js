const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
const displayLabel = document.getElementById("displayLabel");
const historyList = document.getElementById("historyList");
const clearHistoryButton = document.getElementById("clearHistory");
const keys = document.querySelectorAll(".key");

let currentInput = "";
let justCalculated = false;
let history = [];

function updateDisplay() {
    expressionDisplay.textContent = currentInput || "0";
    resultDisplay.textContent = currentInput ? getPreview() : "0";
}

function getPreview() {
    try {
        const answer = calculate(currentInput);
        return Number.isFinite(answer) ? formatNumber(answer) : "—";
    } catch (error) {
        return " ";
    }
}

function formatNumber(number) {
    return Number.parseFloat(number.toPrecision(10)).toString();
}

function addValue(value) {
    const operators = ["+", "−", "×", "÷"];

    if (justCalculated && !operators.includes(value)) {
        currentInput = "";
    }

    justCalculated = false;

    if (operators.includes(value)) {
        if (currentInput === "" && value !== "−") return;

        const lastCharacter = currentInput.slice(-1);
        if (operators.includes(lastCharacter)) {
            currentInput = currentInput.slice(0, -1);
        }
    }

    if (value === ".") {
        const currentNumber = currentInput.split(/[+−×÷%]/).pop();
        if (currentNumber.includes(".")) return;
        if (currentNumber === "") value = "0.";
    }

    currentInput += value;
    displayLabel.textContent = "YOUR EXPRESSION";
    updateDisplay();
}

function clearCalculator() {
    currentInput = "";
    justCalculated = false;
    displayLabel.textContent = "YOUR EXPRESSION";
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    justCalculated = false;
    updateDisplay();
}

// A small expression parser keeps calculations predictable and safe.
function calculate(expression) {
    const cleanedExpression = expression
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .replace(/\s/g, "");

    const tokens = cleanedExpression.match(/\d*\.?\d+|[()+\-*/%]/g) || [];
    if (tokens.join("") !== cleanedExpression) {
        throw new Error("Invalid expression");
    }

    let position = 0;

    function readNumber() {
        const token = tokens[position];

        if (token === "+" || token === "-") {
            position++;
            const number = readNumber();
            return token === "-" ? -number : number;
        }

        let number;
        if (token === "(") {
            position++;
            number = readExpression();

            if (tokens[position] !== ")") {
                throw new Error("Missing bracket");
            }
            position++;
        } else if (token !== undefined && !Number.isNaN(Number(token))) {
            number = Number(token);
            position++;
        } else {
            throw new Error("Number expected");
        }

        if (tokens[position] === "%") {
            number = number / 100;
            position++;
        }

        return number;
    }

    function readTerm() {
        let value = readNumber();

        while (tokens[position] === "*" || tokens[position] === "/") {
            const operator = tokens[position++];
            const nextNumber = readNumber();
            value = operator === "*" ? value * nextNumber : value / nextNumber;
        }

        return value;
    }

    function readExpression() {
        let value = readTerm();

        while (tokens[position] === "+" || tokens[position] === "-") {
            const operator = tokens[position++];
            const nextNumber = readTerm();
            value = operator === "+" ? value + nextNumber : value - nextNumber;
        }

        return value;
    }

    const result = readExpression();

    if (position !== tokens.length || !Number.isFinite(result)) {
        throw new Error("Invalid calculation");
    }

    return result;
}

function showHistory(expression, answer) {
    const emptyMessage = historyList.querySelector(".empty-history");
    if (emptyMessage) emptyMessage.remove();

    history.unshift({ expression, answer });
    history = history.slice(0, 5);

    historyList.innerHTML = "";

    history.forEach((item) => {
        const row = document.createElement("li");
        const calculation = document.createElement("span");
        const result = document.createElement("strong");

        calculation.textContent = item.expression;
        result.textContent = item.answer;

        row.append(calculation, result);
        historyList.appendChild(row);
    });
}

function getAnswer() {
    if (!currentInput) return;

    try {
        const answer = calculate(currentInput);
        const formattedAnswer = formatNumber(answer);

        showHistory(currentInput, formattedAnswer);
        currentInput = formattedAnswer;
        resultDisplay.textContent = formattedAnswer;
        expressionDisplay.textContent = "Previous answer";
        displayLabel.textContent = "CALCULATION COMPLETE";
        justCalculated = true;
    } catch (error) {
        resultDisplay.textContent = "Check expression";
        displayLabel.textContent = "THAT DOESN'T LOOK RIGHT";
    }
}

function handleAction(action) {
    if (action === "clear") clearCalculator();
    if (action === "delete") deleteLast();
    if (action === "equals") getAnswer();
}

keys.forEach((key) => {
    key.addEventListener("click", () => {
        const action = key.dataset.action;
        const value = key.dataset.value;

        if (action) {
            handleAction(action);
        } else if (value) {
            addValue(value);
        }
    });
});

document.addEventListener("keydown", (event) => {
    const keyMap = {
        "*": "×",
        "/": "÷",
        "-": "−",
        "Enter": "=",
        "Backspace": "⌫",
        "Escape": "AC"
    };

    const key = keyMap[event.key] || event.key;

    if (/^[0-9.]$/.test(key) || ["+", "−", "×", "÷", "%"].includes(key)) {
        addValue(key);
    } else if (key === "=") {
        getAnswer();
    } else if (key === "⌫") {
        deleteLast();
    } else if (key === "AC") {
        clearCalculator();
    }
});

clearHistoryButton.addEventListener("click", () => {
    history = [];
    historyList.innerHTML = '<li class="empty-history">Your calculations will show up here.</li>';
});

updateDisplay();
