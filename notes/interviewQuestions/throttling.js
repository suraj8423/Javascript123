const btn = document.querySelector('.increament_button');
const btnPress = document.querySelector('.increament_pressed');
const count = document.querySelector('.increment_count');


const explicitThrotalling = function (cb,delay){
    let lastcall = 0;
    return function (...args) {
        const currentTime = new Data().getTime();
        if((currentTime - lastcall) < delay){
            return;
        }
        return cb(...args);
    }
}

const throttlingFunction = (func,delay) => {
    return _.throttle(func,delay);
}

const increamentCount = throttlingFunction(() => {
    count.innerText = parseInt(count.innerText) + 1;
},500)

btn.addEventListener('click', () => {
    const temp = btnPress.innerText;
    btnPress.innerText = parseInt(temp) + 1;    
    increamentCount();
})