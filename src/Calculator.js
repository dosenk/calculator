export default class Calculator {
    constructor() {
        // this.memoryNumber = ''
        // this.currentNumber = ''
        // this.operationMemory = ''
        // this.operationCurrent = ''
        // this.prevCurrentNumber = ''
        this.operationCounter = 0
        this.result = ''
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
                // console.log(event.target.innerText);
            }
        })
        // обработчик на математические операции
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('operator')) {
                let operation = event.target.innerText
                this.operationPress(operation)
                // console.log('| ' + this.memoryNumber + ' - memoryNumber','| ' + this.currentNumber + ' - currentNumber','| ' + this.operationMemory + '  operationMemory','| ' + operation + ' operation');
            }
        })
        // обработчик на CE и С
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('clear-btn')) {
                console.log(event.target.innerText);
            }
        })
        // обработчик на .
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('decimal')) {
                console.log(event.target.innerText);
            }
        })
    }


    // метод обработки нажатия на цифры
    numberPress(number) {
        if (this.memoryNewNumberFlag) {
            this.displayMain.value = number;
            this.memoryNewNumberFlag = false;
        } else {
            if (this.displayMain.value === '') {
                this.displayMain.value = number;
            } else {
                this.displayMain.value += number;
            }
        }
    }


    // метод обработки нажатия на математические операции
    operationPress(operation) {

        this.memoryNumber = +this.displayMain.value

        if (!this.memoryNewNumberFlag) {
            this.memoryNewNumberFlag = true
            this.prevCurrentNumber = this.currentNumber
            
            if (this.operationMemory === '+') {
                this.currentNumber += this.memoryNumber;
            } else if (this.operationMemory === '-') {
                this.currentNumber -= this.memoryNumber;
            } else if (this.operationMemory === '*') {
                this.currentNumber *= this.memoryNumber;
            } else if (this.operationMemory === '/') {
                this.currentNumber /= this.memoryNumber;
            } else if (this.operationMemory === '^') {
                this.currentNumber = Math.pow(this.currentNumber, this.memoryNumber);
            } else {
                this.currentNumber = this.memoryNumber;
            }
                this.displayMain.value = this.currentNumber
                this.drowDisplayInfo(operation, this.prevCurrentNumber)
                this.operationMemory = operation // меняем операцию
        } else if (operation !== '=') {
            this.drowDisplayInfo(operation, this.prevCurrentNumber)
            this.operationMemory = operation
        }
    }

    drowDisplayInfo(operation, prevCurrentNumber) { // отображает инфу на втором инпуте
        if (operation !== '=') {
            if (this.operationCounter === 0) this.displayInfo.value = '' // обнуляем инфо инпут если это первая операция  
            this.displayInfo.value += ' ' + this.memoryNumber + ' ' + operation
            this.operationCounter += 1
        } else {
            if (prevCurrentNumber !== '') {
                if (this.operationCounter > 1) {
                    this.displayInfo.value = this.displayInfo.value + ' ' + this.memoryNumber + ' ='
                } else {
                    this.displayInfo.value = prevCurrentNumber + ' ' + this.operationMemory + ' ' + this.memoryNumber + ' =' 
                }
                this.operationCounter = 0 // обнуляем счетчик после равно
            } 
        }
    }
}
