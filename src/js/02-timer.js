import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    }
    const countdown = selectedDate.getTime() - currentDate.getTime();
    updateTimer(convertMs(countdown));
    document.querySelector('[data-start]').removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);

document.querySelector('[data-start]').addEventListener('click', () => {
  const selectedDate = new Date(
    document.querySelector('#datetime-picker').value
  );
  const currentDate = new Date();
  const countdown = selectedDate.getTime() - currentDate.getTime();
  const intervalId = setInterval(() => {
    const countdown = selectedDate.getTime() - new Date().getTime();
    if (countdown < 0) {
      clearInterval(intervalId);
      updateTimer(convertMs(0));
      Notiflix.Notify.success('Countdown finished!');
    } else {
      updateTimer(convertMs(countdown));
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}
