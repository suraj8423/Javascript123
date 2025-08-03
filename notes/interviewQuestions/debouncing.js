const btn = document.querySelector('.increament_button');
const btnPress = document.querySelector('.increament_pressed');
const count = document.querySelector('.increment_count');

// ----------------------------------------- explicit implementation of debouncing -----------------------------

const explicitDebouncing = function (fn,delay) {
    let timer;
    return function(...arg){
      if(timer) clearTimeout(timer);
      timer = setTimeout(() => {
          fn(...arg);
      },delay);
    }
}

const debouncingFunction = (func,delay) => {
    return explicitDebouncing(func,delay);
    // return _.debounce(func,delay);
}

const increamentCount = debouncingFunction(() => {
    count.innerText = parseInt(count.innerText) + 1;
},500)

btn.addEventListener('click', () => {
    const temp = btnPress.innerText;
    btnPress.innerText = parseInt(temp) + 1;    
    increamentCount();
});







