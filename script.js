 window.onload = () => {
  const numbers = document.querySelectorAll('.number'); // числа
  const operations = document.querySelectorAll('.operator'); // операция дел умн выч сум
  const clearBtns = document.querySelectorAll('.clear-btn'); // сe и с
  const decimalBtn = document.querySelector('#decimal'); // точка
  const result = document.querySelector('#result'); // равно
  const display = document.querySelector('#display'); // второй инпут
  const monitor = document.querySelector('#monitor'); // инпут подсказка
  const sqtrBtn = document.querySelector('#sqrt')
  const powBtn = document.querySelector('#pow')
  let MemoryCurrentNumber = '';
  let MemoryNewNumber = false;
  let MemoryPendingOperation = '';

  for (var i = 0; i < numbers.length; i++) {
    var number = numbers[i];
    number.addEventListener('click', function (e) {
      numberPress(e.target.textContent);
    });
  }

  for (var i = 0; i < operations.length; i++) {
    var operationBtn = operations[i];
    operationBtn.addEventListener('click', function (e) {
      operationPress(e.target.textContent);
    });
  }

  for (var i = 0; i < clearBtns.length; i++) {
    var clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function (e) {
      clear(e.target.textContent);
    });
  }

  decimalBtn.addEventListener('click', decimal);
  sqtrBtn.addEventListener('click', sqtr);

  function numberPress(number) {
    if (MemoryNewNumber) {
      if (display.value === '-') display.value += number;
      else display.value = number
      MemoryNewNumber = false;
    } else {
      if (display.value === '0') {
        display.value = number;
      } else {
        display.value += number;
      }
    }
    // monitor.value += number
  }

// основные операции калькуоятора *************************************************

  function operationPress(op) {
    let localOperationMemory = display.value;

    if (display.value === '') {
      if (op === '-') {
        console.log(+localOperationMemory);
        MemoryCurrentNumber = '-'
        display.value = MemoryCurrentNumber;
        return
      } 
    }

    if (MemoryNewNumber && op !== '=') {
      console.log(1)

      display.value = MemoryCurrentNumber;

      if (monitor.value.length === 0) {
        monitor.value = display.value + ' ' + op
        display.value = ''
      }

      if (monitor.value.substr(-2, 1) === '=') {
        monitor.value = MemoryCurrentNumber + ' ' + op + ' '
        display.value = ''
      } else if (monitor.value.substr(-2, 1) === '+') {
        monitor.value = monitor.value.substr(0, monitor.value.length-2) + op + ' '; // получаем новый знак и вводим его в новый инпут
        if (op !== '=') MemoryPendingOperation = op // присваиваем операцию в буфер для ожидания
      }
      

    } else {
      console.log(display.value, 'display.value')

      MemoryNewNumber = true;

      if (op !== '=') {
        // console.log(3)
        monitor.value = display.value + ' ' +  op + ' '; // добавили инфу в новый инпут
      }
      
      let oldNumber = MemoryCurrentNumber

      if (MemoryPendingOperation === '-') {
        MemoryCurrentNumber -= +localOperationMemory;
        monitor.value = MemoryCurrentNumber + ' ' + op + ' '
      } else if (MemoryPendingOperation === '*') {
        MemoryCurrentNumber *= +localOperationMemory;
        monitor.value = MemoryCurrentNumber + ' ' + op + ' '
      } else if (MemoryPendingOperation === '/') {
        MemoryCurrentNumber /= +localOperationMemory;
        monitor.value = MemoryCurrentNumber + ' ' + op + ' '
      } else if (MemoryPendingOperation === '^') {
        MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, +localOperationMemory);
        monitor.value = MemoryCurrentNumber + ' ' + op + ' '
      } else if (MemoryPendingOperation === '+') {
        MemoryCurrentNumber += +localOperationMemory;
        monitor.value = MemoryCurrentNumber + ' ' + op + ' '
      } else {
        MemoryCurrentNumber = +localOperationMemory;
      }

      if (op === '=') {
        monitor.value = oldNumber + ' ' + MemoryPendingOperation + ' ' + localOperationMemory + ' = '
        display.value = MemoryCurrentNumber
        // MemoryPendingOperation = op;
        // return
      } 

      display.value = MemoryCurrentNumber;
      MemoryPendingOperation = op;
      
    }
  }

  function decimal(argument) {
    let localDecimalMemory = display.value;

    if (MemoryNewNumber) {
      localDecimalMemory = '0.';
      MemoryNewNumber = false;
    } else {
      if (localDecimalMemory.indexOf('.') === -1) {
        localDecimalMemory += '.';
      }
    }
    display.value = localDecimalMemory;
  }

  function clear(id) {
    if (id === 'ce') {
      display.value = '';
      MemoryNewNumber = true;
    } else if (id === 'c') {
      display.value = '';
      MemoryNewNumber = true;
      MemoryCurrentNumber = 0;
      MemoryPendingOperation = '';
      monitor.value = ''
    }
  }

    function sqtr() {
    display.value = Math.sqrt(display.value)
    MemoryCurrentNumber = monitor.value
    MemoryNewNumber = false
  }
 }  
   