/* SECOND STEP- create a calculator class (a template that creates obejcts)
    and set the constructor to take in the previous and the current text
    elements.
*/

class Calculator {
    constructor(previousOperandTextElement,currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)

    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '' ) return 
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+' :
                computation = prev + current
                break
            case '-' :
                computation = prev - current
                break
            case '*' :
                computation = prev * current
                break
            case '÷' :
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = parseFloat(stringNumber.split('.')[1])
        let integerDisplay = isNaN(integerDigits) ? "" : integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        let decimalDisplay = (isNaN(decimalDigits) || decimalDigits === null) ? "" : decimalDigits;
        if(decimalDisplay === ""){
            return integerDisplay;
        }else{
            return `${integerDisplay}.${decimalDisplay}`;
        }
    }
    

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

/* FIRST STEP convert all of the html elements into JS variables- 
    linked using the data attributes (the querySelectorAll selects the 
    retrieval data based on the string contained in the brackets! ) 
*/

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


/* THIRD STEP- create a new calculator object (by calling the class)
    and inputting the operators
*/

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

/* FOURTH STEP- for each of the number buttons (as retrieved by the
    querySelectorAll) append the numbers in the calculator and 
    call the update display with the addEventListener()
    method everytime a number is clicked 
*/

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })

equalsButton.addEventListener('click', button =>  {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button =>  {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>  {
    calculator.delete()
    calculator.updateDisplay()
})