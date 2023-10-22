const colors = []


function getColorInput(color) {
  const r = new Decimal(parseInt(color.substr(1,2), 16)).dividedBy(255).toFixed(2)
  const g = new Decimal(parseInt(color.substr(3,2), 16)).dividedBy(255).toFixed(2)
  const b = new Decimal(parseInt(color.substr(5,2), 16)).dividedBy(255).toFixed(2)

  return {
      r,
      g,
      b
  }
}

function renderData(){
  const dataElement = document.getElementById('data');
  dataElement.innerHTML = JSON.stringify(colors, null, 2);
}

function addColor(outputEntry){
  const color = document.getElementById('color').value;

  const newColor = {
    input: getColorInput(color),
    output: {[outputEntry]: 1}
  }
  colors.push(newColor)
  renderData()
}

function checkColor(){
  const redNewronal = new brain.NeuralNetwork()
  redNewronal.train(colors);
  const color = document.getElementById('color').value;
  const resultado = brain.likely(getColorInput(color), redNewronal);
  alert(`El color ${color} es ${resultado}`)
}

document.addEventListener('DOMContentLoaded', function() {
  renderData()

  document.getElementById('oscuro').addEventListener('click', function() {
    addColor('oscuro')
  });

  document.getElementById('claro').addEventListener('click', function() {
    addColor('claro')
  });

  document.getElementById('check').addEventListener('click', checkColor);
});
