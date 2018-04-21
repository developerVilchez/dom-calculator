//Variables globales
// El scope y el hoisting de las variables : const: cuando no cambia!
const divContainerButtons = document.querySelector('.container-botones');
let inputShowValue = document.querySelector('input[type="text"]')
let txtInputValue = '';
let expressionMath = [];
let ulContainer = document.querySelector('#memory');

// Manejador de eventos del click

let handlerEventClick = function (e) {
  if (e.target.value === undefined) {
    e.target.value = ' ';
  }
  txtInputValue += e.target.value;
  inputShowValue.value = txtInputValue;

  if (e.target.value === '=') {
    let evalExpression = eval(txtInputValue.substring(0, txtInputValue.indexOf('=')));
    expressionMath.push(txtInputValue + evalExpression);
    localStorage.setItem('dataMath', JSON.stringify(expressionMath));
    inputShowValue.value = evalExpression;
    txtInputValue = '';
    showOperationsStack();
  }

  if (e.target.value === 'C') {
    console.log(txtInputValue);
    inputShowValue.value = '0';
    localStorage.clear();
    ulContainer.textContent = '';
  }
}

let showOperationsStack = function () {
  ulContainer.textContent = '';
  let expresionMathLE = JSON.parse(localStorage.getItem('dataMath'));
  console.log(expresionMathLE)
  if (localStorage.length > 0) {
    expresionMathLE.map(function (e, i) {
      let liElement = document.createElement('li');
      liElement.setAttribute('id', i);
      let liTextContent = document.createTextNode(e);
      liElement.appendChild(liTextContent);
      ulContainer.insertBefore(liElement, ulContainer.firstElementChild);
    })
  }
}


divContainerButtons.addEventListener('click', handlerEventClick);
document.addEventListener('DOMContentLoaded', showOperationsStack);



