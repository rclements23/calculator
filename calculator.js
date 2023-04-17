const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculatorKeys')
const display = document.querySelector('.calculatorDisplay')
const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1)
  const secondNum = parseFloat(n2)
  // Perform calculation and return calculated value
  if (operator === 'add') {
    return firstNum + secondNum
  }
  if (operator === 'subtract') {
    return firstNum - secondNum
  } 
  if (operator === 'multiply') {
    return firstNum * secondNum
  } 
  if (operator === 'divide') {
    return firstNum / secondNum
  } 
}


keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
      
    const key = e.target
    
    // remove .is-depressed class from all keys
    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))
    
    const action = key.dataset.action
    const keyContent = key.textContent
    // getting value of key clicked
    const displayedNum = display.textContent
    // getting value of current displayed number
    const previousKeyType = calculator.dataset.previousKeyType
    
  if (!action) {
  if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
    display.textContent = keyContent
  } else {
    display.textContent = displayedNum + keyContent
  }
  calculator.dataset.previousKeyType = 'number'
}
   if (action === 'decimal') {
     if (!displayedNum.includes('.')) {
   display.textContent = displayedNum + '.'}
     else if (previousKeyType === 'operator' || previousKeyType === 'calculate'){
       display.textContent = '0.'
     }
   calculator.dataset.previousKeyType = 'decimal'
}   
   
    if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
    ) {
    
calculator.dataset.firstValue = displayedNum
      
const firstValue = calculator.dataset.firstValue
const operator = calculator.dataset.operator
let secondValue = displayedNum

if (
  firstValue &&
  operator &&
  previousKeyType !== 'operator' &&
  previousKeyType !== 'calculate'
) {
  const calcValue = calculate(firstValue, operator, secondValue)
  display.textContent = calcValue
  
// Update calculated value as firstValue
  calculator.dataset.firstValue = calcValue
} else {
  // If there are no calculations, set displayedNum as the firstValue
  calculator.dataset.firstValue = displayedNum
}  
         
  key.classList.add('is-depressed')
  // add custom attribute
  calculator.dataset.previousKeyType = 'operator'
  calculator.dataset.operator = action

 }

    if (action === 'clear') {
      if (key.textContent === 'AC') {
        calculator.dataset.firstValue = ''
        calculator.dataset.modValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
      }
      else if (previousKeyType === 'calculate' && key.textContent === 'CE') {
        calculator.dataset.firstValue = ''
        calculator.dataset.modValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
         key.textContent = 'AC'
      }
      else {
    key.textContent = 'AC'
      }
    display.textContent = 0    
    calculator.dataset.previousKeyType = 'clear'
    }
  if (action !== 'clear') {
  const clearButton = calculator.querySelector('[data-action=clear]')
  clearButton.textContent = 'CE'
}
      
    if (action === 'calculate') {
      
    let firstValue = calculator.dataset.firstValue
    const operator = calculator.dataset.operator
    let secondValue = displayedNum
    //grabs value of diplaed number to calculate
if (firstValue) {
    if (previousKeyType === 'calculate') {
      secondValue = calculator.dataset.modValue
    }
    
display.textContent = calculate(firstValue, operator, secondValue)
  }     
calculator.dataset.modValue = secondValue  
calculator.dataset.previousKeyType = 'calculate'
    }

    }
})

