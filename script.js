// Get references to DOM elements
const historyDisplayElement = document.getElementById('history-display');
const currentDisplayElement = document.getElementById('current-display');
const buttons = document.querySelectorAll('.calculator-button');
const mathFactButton = document.getElementById('mathFactButton');
const mathFactDisplay = document.getElementById('mathFactDisplay');
const explainCalculationButton = document.getElementById('explainCalculationButton');
const explanationDisplay = document.getElementById('explanationDisplay');

// State variables for the calculator
let currentInput = '0';
let previousInput = '';
let operator = null;
let waitingForSecondOperand = false; // Flag to indicate if we're ready for a new number after an operator
let expressionHistory = ''; // New variable for the history display

/**
 * Updates the calculator display areas.
 * @param {string} currentVal - The value for the current input/result display.
 * @param {string} historyVal - The value for the history display.
 */
function updateDisplays(currentVal, historyVal) {
    currentDisplayElement.textContent = currentVal;
    historyDisplayElement.textContent = historyVal;
}

/**
 * Clears all LLM-powered displays.
 */
function clearLlmDisplays() {
    mathFactDisplay.classList.add('hidden');
    mathFactDisplay.classList.remove('animate-fade-in');
    explanationDisplay.classList.add('hidden');
    explanationDisplay.classList.remove('animate-fade-in');
}

/**
 * Handles number button clicks.
 * Appends digits to the current input or starts a new input if waiting for a new operand.
 * @param {string} number - The digit or decimal point pressed.
 */
function inputNumber(number) {
    console.log('Input number:', number); // Debugging log
    if (waitingForSecondOperand) {
        currentInput = number;
        waitingForSecondOperand = false;
        // If starting a new number after an equals, clear the full history
        if (operator === null && previousInput === '') {
            expressionHistory = '';
        } else if (operator) {
            // If starting a new number after an operator, the history should already be set
        }
    } else {
        // Prevent multiple decimal points
        if (number === '.' && currentInput.includes('.')) {
            return;
        }
        // Replace '0' if it's the only digit, unless the number is '.'
        currentInput = (currentInput === '0' && number !== '.') ? number : currentInput + number;
    }
    updateDisplays(currentInput, expressionHistory);
    clearLlmDisplays();
}

/**
 * Handles operator button clicks.
 * Performs calculation if an operator is already set and moves current input to previous input.
 * @param {string} nextOperator - The operator symbol (+, -, ×, ÷).
 */
function inputOperator(nextOperator) {
    console.log('Input operator:', nextOperator); // Debugging log
    const inputValue = parseFloat(currentInput);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator; // Allow changing operator before second operand
        expressionHistory = `${previousInput} ${operator}`; // Update history with new operator
        updateDisplays(currentInput, expressionHistory);
        return;
    }

    if (previousInput === '') {
        previousInput = inputValue;
        expressionHistory = `${currentInput} ${nextOperator}`;
    } else if (operator) {
        const result = calculate(previousInput, inputValue, operator);
        if (isNaN(result) || !isFinite(result)) {
            updateDisplays('Error', '');
            clearAll(); // Clear state on error
            return;
        }
        previousInput = result;
        expressionHistory = `${result} ${nextOperator}`;
    }

    operator = nextOperator;
    waitingForSecondOperand = true;
    updateDisplays(previousInput.toString(), expressionHistory);
    clearLlmDisplays();
}

/**
 * Performs the calculation based on the stored operator.
 * @param {number} firstOperand - The first number in the operation.
 * @param {number} secondOperand - The second number in the operation.
 * @param {string} op - The operator (+, -, *, /).
 * @returns {number} The result of the calculation.
 */
function calculate(firstOperand, secondOperand, op) {
    console.log(`Calculating: ${firstOperand} ${op} ${secondOperand}`); // Debugging log
    switch (op) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '×':
        case '*': // For keyboard input
            return firstOperand * secondOperand;
        case '÷':
        case '/': // For keyboard input
            if (secondOperand === 0) {
                return NaN; // Division by zero
            }
            return firstOperand / secondOperand;
        default:
            return secondOperand; // Should not happen if operator is always valid
    }
}

/**
 * Handles the equals button click.
 * Performs the final calculation and resets the operator.
 */
function handleEquals() {
    console.log('Equals button pressed'); // Debugging log
    if (operator === null || waitingForSecondOperand) {
        return; // Nothing to calculate yet
    }

    const inputValue = parseFloat(currentInput);
    const result = calculate(previousInput, inputValue, operator);

    if (isNaN(result) || !isFinite(result)) {
        updateDisplays('Error', '');
        clearAll(); // Clear state on error
        return;
    }

    // When equals is pressed, show the full expression in history and result in current
    expressionHistory = `${previousInput} ${operator} ${currentInput} =`;
    currentInput = result.toString();
    updateDisplays(currentInput, expressionHistory);

    previousInput = ''; // Reset previous input after calculation
    operator = null; // Reset operator
    waitingForSecondOperand = true; // Ready for a new calculation
    clearLlmDisplays();
}

/**
 * Clears all calculator state and resets the display to '0'.
 */
function clearAll() {
    console.log('Clear button pressed'); // Debugging log
    currentInput = '0';
    previousInput = '';
    operator = null;
    waitingForSecondOperand = false;
    expressionHistory = ''; // Clear history
    updateDisplays('0', ''); // Update both displays
    clearLlmDisplays();
}

/**
 * Handles the backspace action, removing the last character from the current input.
 */
function handleBackspace() {
    console.log('Backspace button pressed'); // Debugging log
    if (currentInput === 'Error' || currentInput === '0') {
        return; // Do nothing if display shows error or is already zero
    }

    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplays(currentInput, expressionHistory); // Update both displays
    clearLlmDisplays();
}

/**
 * Fetches an interesting math fact about the current number using the Gemini API.
 */
async function getMathFact() {
    console.log('Get Math Fact button pressed'); // Debugging log
    const number = currentInput;

    if (number === 'Error' || isNaN(parseFloat(number))) {
        mathFactDisplay.textContent = "Cannot get fact for invalid input.";
        mathFactDisplay.classList.remove('hidden');
        mathFactDisplay.classList.add('animate-fade-in');
        return;
    }

    // Clear previous fact and show loading state
    mathFactDisplay.textContent = ""; // Clear content immediately
    mathFactDisplay.classList.remove('animate-fade-in'); // Remove to re-trigger animation
    mathFactDisplay.classList.remove('hidden'); // Ensure it's visible
    explanationDisplay.classList.add('hidden'); // Hide explanation if visible

    // Add a slight delay before adding loading text and animation to ensure animation restarts
    setTimeout(() => {
        mathFactDisplay.textContent = "Getting a cool math fact...";
        mathFactDisplay.classList.add('animate-fade-in');
    }, 10);

    let chatHistory = [];
    const prompt = `Tell me an interesting math fact about the number ${number}. Keep it concise, around 1-2 sentences.`;
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = { contents: chatHistory };
    const apiKey = "AIzaSyCw6pPfe6BKUd_B_R4RnM97AfVq2QCLGgs"; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error Response:", errorData);
            throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorData.error ? errorData.error.message : 'Unknown API error'}`);
        }

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text;
            mathFactDisplay.textContent = text;
        } else {
            mathFactDisplay.textContent = "Could not retrieve a math fact. Unexpected response format.";
            console.warn("Unexpected API response format:", result);
        }
    } catch (error) {
        console.error("Error fetching math fact:", error);
        mathFactDisplay.textContent = `Error fetching fact: ${error.message}. Please try again.`;
    }
}

/**
 * Fetches an explanation of the current calculation using the Gemini API.
 */
async function explainCalculation() {
    console.log('Explain Calculation button pressed'); // Debugging log

    const currentResult = currentInput;
    const fullExpression = expressionHistory;

    if (fullExpression === '' || fullExpression.endsWith('=')) {
        explanationDisplay.textContent = "Perform a calculation first (e.g., 5 + 3 = ).";
        explanationDisplay.classList.remove('hidden');
        explanationDisplay.classList.add('animate-fade-in');
        return;
    }

    // Show loading state
    explanationDisplay.textContent = ""; // Clear content immediately
    explanationDisplay.classList.remove('animate-fade-in'); // Remove to re-trigger animation
    explanationDisplay.classList.remove('hidden'); // Ensure it's visible
    mathFactDisplay.classList.add('hidden'); // Hide math fact if visible

    setTimeout(() => {
        explanationDisplay.textContent = "Thinking about the steps...";
        explanationDisplay.classList.add('animate-fade-in');
    }, 10);

    let chatHistory = [];
    const prompt = `Explain the following calculation in simple terms, focusing on the steps: "${fullExpression} ${currentResult}". Keep the explanation concise, around 2-3 sentences.`;
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = { contents: chatHistory };
    const apiKey = "AIzaSyCw6pPfe6BKUd_B_R4RnM97AfVq2QCLGgs"; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error Response:", errorData);
            throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorData.error ? errorData.error.message : 'Unknown API error'}`);
        }

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text;
            explanationDisplay.textContent = text;
        } else {
            explanationDisplay.textContent = "Could not retrieve an explanation. Unexpected response format.";
            console.warn("Unexpected API response format:", result);
        }
    } catch (error) {
        console.error("Error fetching explanation:", error);
        explanationDisplay.textContent = `Error fetching explanation: ${error.message}. Please try again.`;
    }
}

// Add event listeners to all calculator buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (value) {
            inputNumber(value);
        } else if (action) {
            switch (action) {
                case 'clear':
                    clearAll();
                    break;
                case 'divide':
                case 'multiply':
                case 'subtract':
                case 'add':
                    inputOperator(button.textContent); // Use button text for operator symbol
                    break;
                case 'equals':
                    handleEquals();
                    break;
                case 'backspace': // Handle backspace action
                    handleBackspace();
                    break;
            }
        }
    });
});

// Add event listener for the new Math Fact button
mathFactButton.addEventListener('click', getMathFact);

// Add event listener for the new Explain Calculation button
explainCalculationButton.addEventListener('click', explainCalculation);

// Bonus Feature: Keyboard input support
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9' || key === '.') {
        inputNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault(); // Prevent default browser actions for operators
        inputOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault(); // Prevent form submission or other default actions
        handleEquals();
    } else if (key === 'Backspace') {
        event.preventDefault(); // Prevent browser back navigation
        handleBackspace(); // Call the new backspace handler
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearAll();
    }
});

// Initialize display on load
updateDisplays('0', ''); // Initialize both displays 