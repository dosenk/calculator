export default class Calculator {
    constructor() {
        // this.memoryNumber = ''
        // this.currentNumber = ''
        this.operationMemory = ''
        // this.operationCurrent = ''
        // this.prevCurrentNumber = ''
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
                let id = event.target.innerText
                this.clear(id)
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
        console.log(this.memoryNewNumberFlag);
        if (this.operationCounter === 0)  {
            this.displayInfo.value = ''
        }
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

        if (!this.memoryNewNumberFlag || this.operationCounter === 0) {
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

                if (this.operationMemory === '=' && operation === '=') this.operationMemory = '' // запрет на вывод повторного =
                if (this.operationMemory === '' && operation === '=') return                     // запрет на вывод повторного =

                this.displayMain.value = this.currentNumber
                this.drowDisplayInfo(operation, this.prevCurrentNumber)
                
                this.operationMemory = operation // меняем операцию
        } else if (operation !== '=') {
            console.log(2);
            this.drowDisplayInfo(operation, this.prevCurrentNumber, true)
            this.operationMemory = operation
        }
    }

    drowDisplayInfo(operation, prevCurrentNumber, flag = false) { // отображает инфу на втором инпуте
        if (operation !== '=') {
            if (this.operationCounter === 0) this.displayInfo.value = '' // обнуляем инфо инпут если это первая операция  
            if (flag) {
                this.displayInfo.value = this.displayInfo.value.substr(0, this.displayInfo.value.length - 2) + ' ' + operation
            } else {
                console.log('asdasdasdasdads');
                this.displayInfo.value += ' ' + this.memoryNumber + ' ' + operation
            }
            this.operationCounter += 1
        } else {
            this.memoryNewNumberFlag = true
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

    clear(id) {
        this.displayMain.value = ''
        this.memoryNewNumberFlag = true

        if (id === 'C' || this.operationMemory === '=') { // или если предыдущая операция была рано обнуляем все
            this.memoryNumber = ''
            this.currentNumber = ''
            this.operationMemory = ''
            this.displayMain.value = ''
            this.displayInfo.value = ''
        }
    }
}
