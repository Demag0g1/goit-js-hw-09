import Notiflix from 'notiflix';

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(event.target.elements.delay.value);
  const step = parseInt(event.target.elements.step.value);
  const amount = parseInt(event.target.elements.amount.value);

  Notiflix.Loading.dots('Please wait...');

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const promiseDelay = delay + i * step;

    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  Notiflix.Loading.remove(500);
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
