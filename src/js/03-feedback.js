import throttle from "lodash.throttle";

const feedbackFormEl = document.querySelector('.feedback-form');

const STORAGE_KEY = "feedback-form-state";
const formData = {};

fillInForm();

feedbackFormEl.addEventListener('input', throttle(onTextInput, 1000));

feedbackFormEl.addEventListener('submit', onFormSubmit);

function onTextInput(event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
    event.preventDefault();
    event.target.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(formData);
}

function fillInForm() {
    const savedText = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedText) {
        const emailEl = document.querySelector('[type="email"]');
        const textareaEl = document.querySelector('[name="message"]');
        emailEl.value = savedText.email;
        textareaEl.value = savedText.message;
    }    
};