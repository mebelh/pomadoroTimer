let timerBody = document.querySelector('.timerBody'),
    nums = document.querySelector('.nums'),
    btns = document.querySelector('.btns'),
    title = document.querySelector('title'),
    msAll = 1500000,
    // body = document.querySelector('body'),
    timerNumber = {
        hours : document.querySelector('.hours'),
        minutes : document.querySelector('.minuts'),
        seconds : document.querySelector('.seconds')
    },
    btn = {
        start: document.querySelector('.start'),
        reset: document.querySelector('.reset')
    };

timerBody.style.height = Math.floor(window.screen.height/100*20) + 'px';
timerBody.style.marginTop = Math.floor(window.screen.height/2 - +timerBody.style.height.match(/\d+/)/2) + 'px';

nums.style.marginLeft = window.screen.width/10 + 'px';
nums.style.fontSize = +timerBody.style.height.match(/\d+/)*0.9 + 'px';
nums.style.marginTop = +timerBody.style.height.match(/\d+/)*0.02 + 'px';
btn.start.style.fontSize = +timerBody.style.height.match(/\d+/)*0.4 + 'px';
btn.reset.style.fontSize = +timerBody.style.height.match(/\d+/)*0.4 + 'px';

let time, intervalId, active = false;

btn.start.addEventListener('click', ()=>{
    if(active == false){
        time = Date.parse(new Date());
        intervalId = setInterval(()=>{
            let tech = time - Date.parse(new Date()) + msAll;
            if(tech > 0){
                updadeTimer(tech);
            }else{
                resetTimer();
                title.textContent = 'breakTime!';
            }

        }, 1000);
        setTimeout(()=>{btn.start.textContent = 'stop';}, 2000);
        btn.start.className += ' stopColor';
        document.querySelector('[rel="shortcut icon"]').href = 'img/angry.ico';
        active = true;

    }else{
        resetTimer();
        setTimeout(()=>{btn.start.textContent = 'start';}, 1000);
    }
});

btn.reset.addEventListener('click', ()=>{
    clearInterval(intervalId);
    time = Date.parse(new Date());
    intervalId = setInterval(()=>{
        updadeTimer(time - Date.parse(new Date()) + msAll);
    }, 1000);
    btn.start.className += ' stopColor';
    document.querySelector('[rel="shortcut icon"]').href = 'img/angry.ico';
    active = true;
});

function updadeTimer(ms){
    timerNumber.hours.textContent = ('0' + Math.floor(ms/1000/60/60)).slice(-2) + ':';
    timerNumber.minutes.textContent = ('0' +Math.floor(ms/1000/60%60)).slice(-2) + ':';
    timerNumber.seconds.textContent = ('0' + Math.floor(ms/1000%60)).slice(-2);
    title.textContent = ('0' +Math.floor(ms/1000/60%60)).slice(-2) + ':' + ('0' + Math.floor(ms/1000%60)).slice(-2) +
    ' pomadoroTimer';
    loadProgress(100 - Math.floor(ms / msAll * 100));
}

function resetTimer(){
    btn.start.classList.remove('stopColor');
    btn.start.className += ' startColor';
    document.querySelector('[rel="shortcut icon"]').href = 'img/smyle.ico';
    active = false;
    clearInterval(intervalId);
    updadeTimer(msAll);
}


function loadProgress(val){
    timerBody.style.borderRight = Math.floor(window.screen.width/100*val) - 1 + "px #7C4353 solid";
    timerBody.style.width = (100 - val) + "%";
}
