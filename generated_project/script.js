// script.js
// Core calculator logic as per specification

// Wait for the DOM to be fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', () => {
    // -------------------- DOM References --------------------
    const display = document.getElementById('display'); // display element
    const buttons = document.querySelectorAll('.btn'); // all calculator buttons

    // -------------------- State Management --------------------
    const calcState = {
        currentInput: '',          // string representation of what the user is typing
        previousValue: null,       // numeric value stored before an operator is pressed
        operator: null,            // '+', '-', '*', '/' etc.
        resultDisplayed: false    // true when the currentInput holds a computed result
    };

    // -------------------- Utility Functions --------------------
    /**
     * Updates the calculator display. Handles overflow by truncating
     * the string to a reasonable length (12 characters) and ensures a
     * fallback of "0" when there is no input.
     */
    function updateDisplay() {
        let text = calcState.currentInput || '0';
        // If the result is too long, show a trimmed version with ellipsis
        const maxLen = 12;
        if (text.length > maxLen) {
            // Keep the most significant part (left side) for numbers
            text = text.slice(0, maxLen) + '…';
        }
        display.textContent = text;
    }

    /** Reset all calculator state to its initial values */
    function clearAll() {
        calcState.currentInput = '';
        calcState.previousValue = null;
        calcState.operator = null;
        calcState.resultDisplayed = false;
        updateDisplay();
    }

    /** Remove the last character from the current input */
    function backspace() {
        if (calcState.resultDisplayed) {
            // If a result is shown, backspace should clear it first
            clearAll();
            return;
        }
        if (calcState.currentInput.length > 0) {
            calcState.currentInput = calcState.currentInput.slice(0, -1);
            updateDisplay();
        }
    }

    /** Perform a basic arithmetic operation */
    function performOperation(a, b, op) {
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b === 0) return 'Error';
                return a / b;
            default:
                return 'Error';
        }
    }

    /** Show an error message briefly then clear the calculator */
    function showError() {
        display.textContent = 'Error';
        // Reset after a short delay (1.2 seconds)
        setTimeout(() => {
            clearAll();
        }, 1200);
    }

    // -------------------- Input Handlers --------------------
    /** Handle digit and decimal point input */
    function handleDigit(value) {
        // If a result is currently displayed, start a new calculation
        if (calcState.resultDisplayed) {
            calcState.currentInput = '';
            calcState.resultDisplayed = false;
        }
        if (value === '.') {
            // Prevent multiple decimals in the same number
            if (!calcState.currentInput.includes('.')) {
                calcState.currentInput = calcState.currentInput || '0'; // ensure leading zero
                calcState.currentInput += '.';
            }
        } else {
            // Append digit (avoid leading zeros like "00")
            if (calcState.currentInput === '0') {
                calcState.currentInput = value; // replace leading zero
            } else {
                calcState.currentInput += value;
            }
        }
        updateDisplay();
    }

    /** Handle operator button press (+, -, *, /) */
    function handleOperator(op) {
        // If we already have a pending operation and a new number entered, compute intermediate result first
        if (calcState.operator && calcState.currentInput !== '') {
            const intermediate = performOperation(
                calcState.previousValue,
                parseFloat(calcState.currentInput),
                calcState.operator
            );
            if (intermediate === 'Error') {
                showError();
                return;
            }
            calcState.previousValue = intermediate;
        } else if (calcState.currentInput !== '') {
            calcState.previousValue = parseFloat(calcState.currentInput);
        }
        calcState.operator = op;
        calcState.currentInput = '';
        calcState.resultDisplayed = false;
        updateDisplay();
    }

    /** Execute the calculation when '=' is pressed */
    function handleEquals() {
        if (!calcState.operator || calcState.previousValue === null || calcState.currentInput === '') {
            // Nothing to compute
            return;
        }
        const a = calcState.previousValue;
        const b = parseFloat(calcState.currentInput);
        const result = performOperation(a, b, calcState.operator);
        if (result === 'Error') {
            showError();
            return;
        }
        calcState.currentInput = String(result);
        calcState.previousValue = null;
        calcState.operator = null;
        calcState.resultDisplayed = true;
        updateDisplay();
    }

    // -------------------- Event Listeners --------------------
    // Button click handling
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            if (!value) return; // safety
            if (value >= '0' && value <= '9' || value === '.') {
                handleDigit(value);
            } else if (['+', '-', '*', '/'].includes(value)) {
                handleOperator(value);
            } else if (value === '=') {
                handleEquals();
            } else if (value === 'C') {
                clearAll();
            } else if (value === '←') {
                backspace();
            }
            // Any other control values can be added here in the future
        });
    });

    // Keyboard support
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        // Map keyboard keys to calculator actions
        if (/[0-9]/.test(key)) {
            event.preventDefault();
            handleDigit(key);
        } else if (key === '.' || key === ',') { // allow comma as decimal on some keyboards
            event.preventDefault();
            handleDigit('.');
        } else if (['+', '-', '*', '/'].includes(key)) {
            event.preventDefault();
            handleOperator(key);
        } else if (key === 'Enter' || key === '=') {
            event.preventDefault();
            handleEquals();
        } else if (key === 'Backspace') {
            event.preventDefault();
            backspace();
        } else if (key === 'Delete') {
            event.preventDefault();
            clearAll();
        } else if (key === 'Escape') {
            event.preventDefault();
            clearAll();
        }
    });

    // Initialize display
    clearAll();
});
