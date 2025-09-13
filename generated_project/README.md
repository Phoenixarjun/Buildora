# Colorful Calculator

## Brief Description
The **Colorful Calculator** is a simple web‑based calculator that not only performs basic arithmetic operations but also adds a splash of color to the user experience. It features a clean, responsive UI styled with CSS variables, allowing easy customization of its vibrant theme.

---

## Tech Stack
- **HTML** – Structure of the calculator UI.
- **CSS** – Styling, layout, and theming (uses CSS variables for easy color changes).
- **JavaScript** – Core calculation logic, button handling, and keyboard shortcuts.

---

## Features
- Basic arithmetic: addition, subtraction, multiplication, division.
- Clear (`C`) and backspace (`←`) functionality.
- Keyboard support for numbers, operators, `Enter` (equals), `Esc` (clear) and `Backspace`.
- Responsive design that works on desktop and mobile browsers.
- Customizable color scheme via CSS variables.
- Simple, single‑page implementation with no external dependencies.

---

## Setup Instructions
1. **Clone the repository**
   ```bash
   git clone <repository‑url>
   cd <repository‑folder>
   ```
2. **Open the calculator**
   - Locate the `index.html` file in the project root.
   - Open it directly in any modern web browser (Chrome, Firefox, Edge, Safari, etc.).
3. **Optional: Use a live‑server**
   - For a development environment with hot‑reloading, you can serve the project using a simple live‑server (e.g., `npm install -g live-server` then `live-server`).
   - This is not required for the calculator to work; opening `index.html` is sufficient.

---

## Usage Guide
- **Button Layout**
  - Numbers `0‑9` are arranged in a grid.
  - Operators: `+`, `‑`, `*`, `/`.
  - `=` computes the result.
  - `C` clears the current expression.
  - `←` (backspace) deletes the last character.
- **Keyboard Shortcuts**
  - Digits `0‑9` → input numbers.
  - `+`, `-`, `*`, `/` → operators.
  - `Enter` or `=` → evaluate.
  - `Esc` → clear.
  - `Backspace` → delete last character.
- **Clear / Backspace**
  - **Clear (`C`)** resets the entire expression and display.
  - **Backspace (`←`)** removes the most recent character, allowing quick corrections without resetting the whole calculation.

---

## Development Notes
- **Color Customization**
  - Open `style.css`.
  - Locate the `:root` selector where CSS variables are defined (e.g., `--primary-color`, `--bg-color`).
  - Modify these values to change the calculator’s theme.
- **Core Logic**
  - The main JavaScript functionality resides in `script.js`.
  - It handles button clicks, keyboard events, expression parsing, and display updates.
- **Extending Functionality**
  - To add more operations (e.g., exponentiation, modulo), update the UI in `index.html` to include new buttons, then extend the event handling and evaluation logic in `script.js`.
  - Ensure any new CSS classes or variables are added to `style.css` for consistent styling.

---

## License
[Insert License Here]

---

*This README provides an overview for developers and contributors. The file does not affect the execution of the Colorful Calculator.*
