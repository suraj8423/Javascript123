const btn = document.querySelector('.increament_button');

const btnPress = document.querySelector('.increament_pressed');
const count = document.querySelector('.increment_count');
const debouncedFunction = fun();

btn.addEventListener('click', fun);

function fun() {
    let timer;
    return function () {
        btnPress.innerText = parseInt(btnPress.innerText) + 1;
        clearTimeout(timer);
        timer = setTimeout(() => {
            count.innerText = parseInt(count.innerText) + 1;
        }, 500);
    }
}