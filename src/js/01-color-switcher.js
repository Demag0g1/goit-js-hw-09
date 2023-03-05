const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
btnStop.disabled = true;
let setColor = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', () => {
  btnStart.disabled = true;
  btnStop.disabled = false;

  setColor = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
});

btnStop.addEventListener('click', () => {
  clearInterval(setColor);
  btnStop.disabled = true;
  btnStart.disabled = false;
});
