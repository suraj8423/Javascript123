const btn = document.querySelector('.increament_button');

const btnPress = document.querySelector('.increament_pressed');
const count = document.querySelector('.increment_count');

const throttlingFunction = function () {
    let lastExecuted = 0;
    return function() {
        const now = new Date().getTime();
        if( now - lastExecuted >= 5000){
            count.innerText = parseInt(count.innerText) + 1;
            lastExecuted = now;
        }
    }
}
const throttledFunction = throttlingFunction();

btn.addEventListener('click', () => {
    btnPress.innerText = parseInt(btnPress.innerText) + 1;
    throttledFunction();
});

// btn.addEventListener('click', () => {
//     btnPress.innerText = parseInt(btnPress.innerText) + 1;
//     debouncedFunction();
// });