// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");
form.addEventListener("submit", createPromise);

function createPromise (event) {
    event.preventDefault();
    console.log(event);

    const inputValue=event.target.elements;
    const delayValue = Number(inputValue.delay.value);
    const stateChosen = inputValue.state.value;
    console.log(delayValue);
    console.log(stateChosen);

    const generatedPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (stateChosen === "fulfilled") {
                resolve(delayValue);
            } else {
                reject(delayValue);
            }
            
        }, delayValue)
        
    });

    generatedPromise.
        then(value => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${value}ms`,
                position: "topRight"
            })
        })
        .catch(error => {
            iziToast.error({
                message: `❌ Rejected promise in ${error}ms`,
                position: "topRight"
         });
    });
};

