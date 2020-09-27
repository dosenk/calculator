 window.onload = () => {
  const numbers = document.querySelectorAll('.number'); // числа
  const operations = document.querySelectorAll('.operator'); // операция дел умн выч сум
  const clearBtns = document.querySelectorAll('.clear-btn'); // сe и с
  const decimalBtn = document.querySelector('#decimal'); // точка
  const result = document.querySelector('#result'); // равно
  const display = document.querySelector('#display'); // второй инпут
  const monitor = document.querySelector('#monitor'); // инпут подсказка
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

  function numberPress(number) {
    if (MemoryNewNumber) {
      display.value = number;
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

  function operationPress(op) {
    let localOperationMemory = display.value;

    if (MemoryNewNumber && op !== '=') {
      console.log(1)
      display.value = MemoryCurrentNumber;
      if (monitor.value.length === 0) {
        monitor.value = display.value + ' ' + 'op'
        display.value = ''
      }
      monitor.value = monitor.value.substr(0, monitor.value.length-2) +  op + ' '; // получаем новый знак и вводим его в новый инпут
      MemoryPendingOperation = op // присваиваем операцию в буфер для ожидания
    } else {
      MemoryNewNumber = true;
      if (op !== '=') {
        monitor.value = display.value + ' ' +  op + ' '; // добавили инфу в новый инпут
      }

      if (MemoryPendingOperation === '+') {
        monitor.value = ''
        MemoryCurrentNumber += +localOperationMemory;
      } else if (MemoryPendingOperation === '-') {
        monitor.value = ''
        MemoryCurrentNumber -= +localOperationMemory;
      } else if (MemoryPendingOperation === '*') {
        monitor.value = ''
        MemoryCurrentNumber *= +localOperationMemory;
      } else if (MemoryPendingOperation === '/') {
        monitor.value = ''
        MemoryCurrentNumber /= +localOperationMemory;
      } else {
        MemoryCurrentNumber = +localOperationMemory;
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

 }  
   