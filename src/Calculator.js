export default class Calculator {
    constructor() {
        this.operationMemory = ''
        this.operationCounter = 0
        this.memoryNewNumberFlag = false;
        this.displayInfo = document.querySelector('#monitor')
        this.displayMain = document.querySelector('#display')
    }

    addListenersOnKeys() {
        // обработчик на цифры
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('number')) {
                let number = event.target.innerText
                this.numberPress(number)
            }
        })
        // обработчик на математические операции
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('operator')) {
                let operation = event.target.innerText
                this.operationPress(operation)
            }
        })
        // обработчик на CE и С
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('clear-btn')) {
                let id = event.target.innerText
                this.clear(id)
            }
        })
        // обработчик на .
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('decimal')) {
                this.decimal()
            }
        })
    }


    // метод обработки нажатия на цифры
    numberPress(number) {
        if (this.operationCounter === 0) this.displayInfo.value = ''
        if (this.memoryNewNumberFlag) {
            if (this.displayMain.value === '-') this.displayMain.value += number
            else this.displayMain.value = number;
            this.memoryNewNumberFlag = false;
        } else {
            if (this.displayMain.value === '' || this.displayMain.value === '0')  this.displayMain.value = number;
            else this.displayMain.value += number;
        }
    }


    // метод обработки нажатия на математические операции
    operationPress(operation) {
        if (operation === '-' && (this.displayMain.value === '' || this.displayMain.value === '-' || this.memoryNewNumberFlag === true)) {
            if(this.operationMemory !== '=') {
                this.displayMain.value = '-'
                return 
            }
        }

        

        if (operation === '√') { 
            if (this.displayMain.value < 0) {
                alert('Введены неверные данные')
                return
            } else if (this.displayMain.value === '-') {
                return
            }
            this.displayMain.value = Math.sqrt(this.displayMain.value)
        }

        if (!this.memoryNewNumberFlag || this.operationCounter === 0) {
            this.memoryNumber = +this.displayMain.value

            if (operation === '√' || this.displayMain.value === '-') return
            this.memoryNewNumberFlag = true
            this.prevCurrentNumber = this.currentNumber
            
            if (this.operationMemory === '+') {
                this.currentNumber += this.memoryNumber;
            } else if (this.operationMemory === '-') {
                this.currentNumber -= this.memoryNumber;
            } else if (this.operationMemory === '*') {
                this.currentNumber *= this.memoryNumber;
            } else if (this.operationMemory === '/') {
                if (this.memoryNumber === 0) {
                    alert('Введены неверные данные. Делить на ноль не предусмотрено данным калькулятором')
                    return
                }
                this.currentNumber /= this.memoryNumber;
            } else if (this.operationMemory === '^') {
                if (this.currentNumber === 0 && this.memoryNumber < 0) {
                    alert('Введены неверные данные')
                    return
                }
                this.currentNumber = Math.pow(this.currentNumber, this.memoryNumber);
            } else {
                this.currentNumber = this.memoryNumber;
            }
                if (this.operationMemory === '=' && operation === '=') this.operationMemory = '' // запрет на вывод повторного =
                if (this.operationMemory === '' && operation === '=') return                     // запрет на вывод повторного =
                if (!Number.isInteger(this.currentNumber)) {
                    if (operation === '=') this.currentNumber = +this.currentNumber.toFixed(10)
                }
                this.displayMain.value = this.currentNumber
                this.drowDisplayInfo(operation, this.prevCurrentNumber)
                this.operationMemory = operation // меняем операцию
        } 
        // else if (operation !== '=') {
        //     console.log(2);
        //     this.drowDisplayInfo(operation, this.prevCurrentNumber, true) // обрезаем 
        //     this.operationMemory = operation
        // }
    }

    drowDisplayInfo(operation, prevCurrentNumber, flag = false) { // отображает инфу на втором инпуте
        if (operation !== '=') {
            if (this.operationCounter === 0) this.displayInfo.value = '' // обнуляем инфо инпут если это первая операция  
            if (flag) {
                this.displayInfo.value = this.displayInfo.value.substr(0, this.displayInfo.value.length - 2) + ' ' + operation
            } else {
                this.displayInfo.value += ' ' + this.memoryNumber + ' ' + operation
            }
            this.operationCounter ++
        } else {
            this.memoryNewNumberFlag = true
            if (prevCurrentNumber !== '') {
                if (this.operationCounter > 1) this.displayInfo.value = this.displayInfo.value + ' ' + this.memoryNumber + ' ='
                else this.displayInfo.value = prevCurrentNumber + ' ' + this.operationMemory + ' ' + this.memoryNumber + ' =' 
                this.operationCounter = 0 // обнуляем счетчик после равно
            } 
        }
    }

    clear(id) {
        this.displayMain.value = ''
        this.memoryNewNumberFlag = false
        if (id === 'C' || this.operationMemory === '=') { // или если предыдущая операция была рано обнуляем все
            this.memoryNumber = ''
            this.currentNumber = ''
            this.operationMemory = ''
            this.displayMain.value = ''
            this.displayInfo.value = ''
            this.operationCounter = 0
        }
    }

    decimal() {
        let localDecimalMemory = this.displayMain.value
        if (this.memoryNewNumberFlag || localDecimalMemory === '' || localDecimalMemory === '-') {
          localDecimalMemory = localDecimalMemory === '-' ? '-0.' : '0.'
          this.memoryNewNumberFlag = false;
        } else {
          if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
          }
        }
        this.displayMain.value = localDecimalMemory;
    }
}
