"use strict"

function createСlock() {
    let nowTime = new Date();
    let nowHours = nowTime.getHours();
    let nowMinutes = nowTime.getMinutes();
    let nowSeconds = nowTime.getSeconds();

    let num = 0; //число на циферблате
    let angle; //угол в радианах
    let angleDegrees = 0; //угол в градусах

    let inputElem = document.getElementById("clockD");
    let clockDiameter = Math.round(inputElem.value); // диаметр циферблата

    let circleDiameter = Math.round(clockDiameter/100*13); //диаметр круга с числом (13% от диаметра циферблата)
    let numbersSize = Math.round(clockDiameter/100*6); //размер числа на циферблате (6% от диаметра циферблата)
    let distance = Math.round(clockDiameter/100*3); //расстояние от края циферблата до кругов с числами (3% от диаметра циферблата)

    let hourHandWidth = clockDiameter/100*3; //ширина часовой стрелки (3% от диаметра циферблата)
    let hourHandHeight = clockDiameter/100*26; //длина часовой стрелки (26% от диаметра циферблата)
    let minuteHandWidth = clockDiameter/100*2; //ширина минутной стрелки (2% от диаметра циферблата)
    let minuteHandHeight = clockDiameter/100*40; //длина минутной стрелки (40% от диаметра циферблата)
    let secondHandWidth = clockDiameter/100*0.7; //ширина секундной стрелки (0.7% от диаметра циферблата)
    let secondHandHeight = clockDiameter/100*46; //длина секундной стрелки (46% от диаметра циферблата)
    let arrowCenterOffset = clockDiameter/100*4; //смещение центра стрелки (4% от нижнего края)
    let sizeDigitalTime = clockDiameter/100*10; //размер цифровых часов (10% от диаметра циферблата)

    const degreesInHour = 360/12 // на столько град. передвигается часовая стрелка за 1 час
    const degreesInMinuteForHour = 360/12/60 // на столько град. передвигается часовая стрелка за 1 минуту
    const degreesInSecondForHour = 360/12/60/60 // на столько град. передвигается часовая стрелка за 1 секунду
    const degreesInMinuteOrSecond = 360/60 // на столько град. передвигается минутная или секундная стрелка за 1 минуту или секунду
    const degreesInSecondForMinute = 360/60/60 // на столько град. передвигается минутная стрелка за 1 секунду

    //удаление поля и кнопки
    let labelElem = document.getElementById("labelСlockD");
    let buttonElem = document.getElementById("button");
    labelElem.remove();
    buttonElem.remove();

    //построение циферблата
    let clock = document.createElement("div");
    clock.className = "clock";
    clock.style.width = clockDiameter + "px";
    clock.style.height = clockDiameter + "px";
    document.body.appendChild(clock);

    const clockCenterX=clock.offsetLeft + clockDiameter/2; //координаты центра круга
    const clockCenterY=clock.offsetTop + clockDiameter/2; 

    //построение кругов с числами на циферблате
    for (let i = 0; i<12; i++) {
        angle=angleDegrees/180*Math.PI;

        let numbers = document.createElement("div");
        numbers.className="numbers";
        numbers.style.width = circleDiameter + "px";
        numbers.style.height = circleDiameter + "px";
        numbers.style.fontSize = numbersSize + "px";
        clock.appendChild(numbers);
        let textElem = document.createTextNode(num);
        numbers.appendChild(textElem);

        const numbersCenterX =
            clockCenterX+(clockDiameter/2-circleDiameter/2-distance)*Math.sin(angle);
        const numbersCenterY =
            clockCenterY-(clockDiameter/2-circleDiameter/2-distance)*Math.cos(angle);
        
        numbers.style.left = Math.round(numbersCenterX-circleDiameter/2)+'px';
        numbers.style.top = Math.round(numbersCenterY-circleDiameter/2)+'px';

        angleDegrees = angleDegrees + 30;
        num++;
    }
    clock.firstChild.innerHTML="12"; 

    //построение часовой стрелки 
    let hourHand = document.createElement("div");
    hourHand.className="hourHand";
    clock.appendChild(hourHand);
    hourHand.style.width = hourHandWidth + "px";
    hourHand.style.height = hourHandHeight + "px";
    hourHand.style.left = clockCenterX-hourHandWidth/2 +'px'; 
    hourHand.style.top = clockCenterY-hourHandHeight+arrowCenterOffset +'px';
    hourHand.style.borderRadius = hourHandWidth/2 +'px';
    hourHand.style.transformOrigin = `${hourHandWidth/2}px ${hourHandHeight-arrowCenterOffset}px`;
    if (nowHours > 12) {
        nowHours = nowHours - 12;
    }
    hourHand.style.transform=
        `rotate( ${degreesInHour*nowHours + degreesInMinuteForHour*nowMinutes + degreesInSecondForHour*nowSeconds}deg )`;
    
    //построение минутной стрелки 
    let minuteHand = document.createElement("div");
    minuteHand.className = "minuteHand";
    clock.appendChild(minuteHand);
    minuteHand.style.width = minuteHandWidth + "px";
    minuteHand.style.height = minuteHandHeight + "px";
    minuteHand.style.left = clockCenterX-minuteHandWidth/2 +'px';
    minuteHand.style.top = clockCenterY-minuteHandHeight+arrowCenterOffset +'px';
    minuteHand.style.borderRadius = minuteHandWidth/2 +'px';
    minuteHand.style.transformOrigin =`${minuteHandWidth/2}px ${minuteHandHeight-arrowCenterOffset}px`;
    minuteHand.style.transform=
        `rotate( ${degreesInMinuteOrSecond*nowMinutes + degreesInSecondForMinute*nowSeconds}deg )`;

    //построение секундной стрелки 
    let secondHand = document.createElement("div");
    secondHand.className = "secondHand";
    clock.appendChild(secondHand);
    secondHand.style.width = secondHandWidth + "px";
    secondHand.style.height = secondHandHeight + "px";
    secondHand.style.left=clockCenterX-secondHandWidth/2 +'px';
    secondHand.style.top=clockCenterY-secondHandHeight+arrowCenterOffset +'px';
    secondHand.style.borderRadius = secondHandWidth/2 +'px';
    secondHand.style.transformOrigin = `${secondHandWidth/2}px ${secondHandHeight-arrowCenterOffset}px`;
    secondHand.style.transform=
        `rotate( ${degreesInMinuteOrSecond*nowSeconds}deg )`;

    //построение цифровых часов
    let digitalTime = document.createElement("span");
    digitalTime.className="digitalTime";
    clock.appendChild(digitalTime);
    digitalTime.innerHTML=nowTime.toLocaleTimeString();
    digitalTime.style.fontSize = sizeDigitalTime + "px";
    digitalTime.style.left = clockCenterX-digitalTime.offsetWidth/2 + "px";
    digitalTime.style.top = clockCenterY-clockDiameter/4 + "px"; 

    setInterval(currentTime,1000);

    function currentTime() {
        let nowTime = new Date();
        let nowHours = nowTime.getHours();
        let nowMinutes = nowTime.getMinutes();
        let nowSeconds = nowTime.getSeconds();

        if (nowHours > 12) {
            nowHours = nowHours - 12;
        }

        hourHand.style.transform=
            `rotate( ${degreesInHour*nowHours + degreesInMinuteForHour*nowMinutes + degreesInSecondForHour*nowSeconds}deg )`;
        minuteHand.style.transform=
            `rotate( ${degreesInMinuteOrSecond*nowMinutes + degreesInSecondForMinute*nowSeconds}deg )`;
        secondHand.style.transform=
            `rotate( ${degreesInMinuteOrSecond*nowSeconds}deg )`;

        digitalTime.innerHTML=nowTime.toLocaleTimeString();

        console.log( nowTime.toLocaleTimeString() );
    }

}






