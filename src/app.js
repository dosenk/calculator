import Calculator from './Calculator.js';

window.onload = () => {

  let calculator = new Calculator()
  calculator.addListenersOnKeys()



  let wraper = document.querySelector('.helper')
  let result = document.querySelector('#helper_result')
  let input = document.querySelectorAll('input')
  wraper.addEventListener('click', (event) => {
    let counter = 0
    input.forEach((item) => {
      if (item.checked) counter++
    })
    result.innerText = counter * 2
  })

 
}   