import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btn = document.querySelector("button");
const dateInput = document.querySelector("#datetime-picker");
const daysBox = document.querySelector("[data-days]");
const hoursBox = document.querySelector("[data-hours]");
const minBox = document.querySelector("[data-minutes]");
const secBox = document.querySelector("[data-seconds]");


btn.addEventListener("click", startTimer);

let userSelectedDate = null;
let timerIsActive = false;
btn.disabled = true;

const options = {
  enableTime: true,// включає timepicker bool
  time_24hr: true, // показує 24 режим без АМ/ЗЬ
    defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
    validateDate(selectedDates[0]);
  },
};
const fpPickerField = flatpickr("#datetime-picker", options);


function validateDate(date) {
    if (date > new Date()) {
        btn.disabled = false; 
        userSelectedDate = date;
    } 
    else {
        iziToast.error ({
            message: "Please choose a date in the future",
            position: "topRight",});
        btn.disabled = true;
    } 
};

function startTimer(click) {
    if (timerIsActive) {
        return;
    }
    
    timerIsActive = true;
    btn.disabled = true;
    dateInput.disabled = true;
    
   let intId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = userSelectedDate.getTime() - currentTime; 
        const timeValue = convertMs(deltaTime);

        if (deltaTime <= 0) {
            clearInterval(intId);
            timerUpdate({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            dateInput.disabled = false;
            timerIsActive = false;
            return;
      }  
        timerUpdate(timeValue);
    }, 1000)
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function properFormat(value) {
    return value.toString().padStart(2, "0");
    
};

function timerUpdate(value) {
    daysBox.textContent = properFormat(value.days);
    hoursBox.textContent = properFormat(value.hours);
    minBox.textContent = properFormat(value.minutes);
    secBox.textContent = properFormat(value.seconds);
}; 

