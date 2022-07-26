import throttle from "lodash.throttle";

const feedbackFormEl = document.querySelector('.feedback-form');

const STORAGE_KEY = "feedback-form-state";
const formData = {};
fillInForm();

feedbackFormEl.addEventListener('input', throttle(onTextInput, 1000));

feedbackFormEl.addEventListener('submit', onFormSubmit);

function onTextInput(event) {
    let savedText = localStorage.getItem(STORAGE_KEY);
    savedText = savedText ? JSON.parse(savedText) : {}
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedText));
}

function onFormSubmit(event) {
    event.preventDefault();
    event.target.reset();
    console.log(formData)
    localStorage.removeItem(STORAGE_KEY);
}

function fillInForm() {
    const savedText = localStorage.getItem(STORAGE_KEY);
    if (savedText) {
        const parsedSavedText = JSON.parse(savedText)
        Object.entries(parsedSavedText).forEach(([name, value]) => {
            feedbackFormEl.elements[name].value = value;
        });
    };
};