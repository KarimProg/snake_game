let state = 0, prevState=0;
let scale = 1;
let xFruit=0, yFruit=0;
let timeScale = 1;

function lostScreen()
{
    document.body.innerHTML="";
    document.body.style.display="flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.height = "100vh";
    document.body.style.margin = "0";

    const h1 = document.createElement('h1');
    h1.textContent=`You Have Lost! Score: ${score}`;
    h1.style.textAlign="center";
    h1.style.display="inline-block";
    document.body.appendChild(h1);
    console.log("Lost!");
    state = 0;

    clearInterval(mainGame);
    // while(true){
    //     Tim
    // }
}

document.addEventListener('keydown', (event) => {
    if ((event.key.toLowerCase() === 'w' || event.key === 'ArrowUp') && state != 3) {
        state=1;
    }
    else if ((event.key.toLowerCase() === 'a' || event.key === 'ArrowLeft') && state != 4)
    {
        state=2;
    }
    else if ((event.key.toLowerCase() === 's' || event.key === 'ArrowDown') && state != 1)
    {
        state=3;
    }
    else if ((event.key.toLowerCase() === 'd' || event.key === 'ArrowRight') && state != 2)
    {
        state=4;
    }
});

// document.addEventListener('keyup', (event) => {
//     if (event.key.toLowerCase() === 'w' || event.key.toLowerCase() === 'a' || event.key.toLowerCase() === 's' || event.key.toLowerCase() === 'd')
//         state=0;
// });

setInterval(()=>{
    if (state != prevState)
    {
        console.log(state);
        prevState = state;
    }
},10);

// Select the element
let element = document.getElementById('head');
// Initialize position variables
let topPositionMainHead = 20;
let leftPositionMainHead = 20;
element.style.position = 'absolute';
element.style.top= '20px';
element.style.left= '20px';
let body=[];
body.push(element);

function createNewHead(xNew, yNew)
{
    element=document.createElement("div");
    element.style.position='absolute';
    element.style.top=`${yNew}px`;
    element.style.left=`${xNew}px`;
    element.setAttribute("class","circle")
    element.setAttribute("id", `head${body.length+1}`)
    document.body.appendChild(element);
    return element;
}

// responsible for motion of snake
const mainGame = setInterval(()=>{
    topPositionMainHead = parseInt(body[body.length-1].style.top)+35;
    leftPositionMainHead = parseInt(body[body.length-1].style.left)+35;

    switch(state)
    {
        case 1:
            // topPositionMainHead -= 2*scale;
            if(topPositionMainHead>45)
            {
                body[0].remove();
                
                body[0].style.left=`${parseInt(body[body.length-1].style.left)}px`;
                body[0].style.top=`${parseInt(body[body.length-1].style.top)-15*scale}px`;
                let temp=body.shift();
                body.push(temp);
                // if(body.length==1)
                // else
                //     body[body.length-1].style.top=`${parseInt(body[body.length-2].style.top)-50}px`;

                document.body.appendChild(body[body.length-1]);
            }
            else
                lostScreen();
            break;
        case 2:
            if(leftPositionMainHead>45)
            {
                body[0].remove();
                body[0].style.left=`${parseInt(body[body.length-1].style.left)-15*scale}px`;
                body[0].style.top=`${parseInt(body[body.length-1].style.top)}px`;
                let temp=body.shift();
                body.push(temp);
                document.body.appendChild(body[body.length-1]);
            }
            else
                lostScreen();
            break;
        case 3:
            if(topPositionMainHead<830)
                {
                    body[0].remove();
                    body[0].style.left=`${parseInt(body[body.length-1].style.left)}px`;
                    body[0].style.top=`${parseInt(body[body.length-1].style.top)+15*scale}px`;
                    let temp=body.shift();
                    body.push(temp);
                    document.body.appendChild(body[body.length-1]);
                }
            else
                lostScreen();
            break;
        case 4:
            if(leftPositionMainHead<1650)
				{
                    body[0].remove();
                    body[0].style.left=`${parseInt(body[body.length-1].style.left)+15*scale}px`;
                    body[0].style.top=`${parseInt(body[body.length-1].style.top)}px`;
                    let temp=body.shift();
                    body.push(temp);
                    // if(body.length==1)
                    //     body[body.length-1].style.left=`${parseInt(body[body.length-1].style.left)+50}px`;
                    // else
                    //     body[body.length-1].style.left=`${parseInt(body[body.length-2].style.left)+50}px`;
                    
                    document.body.appendChild(body[body.length-1]);
				}
            else
                lostScreen();
            break;
    }

    let distance = Math.sqrt((leftPositionMainHead-(xFruit+25))**2 + (topPositionMainHead-(yFruit+25))**2);
    if (distance < 50)
        generateFruit();

    body[body.length-1].setAttribute("id", "head");
    body[body.length-2].setAttribute("id", "mshHead");

     // show position of head
    console.log(`${topPositionMainHead}, ${leftPositionMainHead}`);
    if (scale<2)
        scale*=1.001;
    
    checkForIntersection();
}, 40*timeScale)

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
let firstGeneration=true;
let score=-1;

function findTailPosition(){
    let xNewTail = parseInt(body[body.length-1].style.left);
    let yNewTail = parseInt(body[body.length-1].style.top);

    if (state == 1)
    {
        yNewTail += 15*scale
    }
    else if (state == 2)
    {
        xNewTail += 15*scale
    }
    else if (state == 3)
    {
        yNewTail -= 15*scale
    }
    else if (state == 4)
    {
        xNewTail -= 15*scale
    }

    return {x:xNewTail, y:yNewTail};
}

function generateFruit()
{
    if (firstGeneration){
        const fruit = document.createElement("div");
        fruit.setAttribute("id","fruit")
        document.body.appendChild(fruit);
        firstGeneration=false;
        fruit.style.position = 'absolute';
    }
    else
    {
        for(let i=0;i<10;i++)
        {
            let pos=findTailPosition();
            body.unshift(createNewHead(pos.x, pos.y));
        }
    }
    
    xFruit = getRandomInt(35, 1620);
    yFruit = getRandomInt(35, 780);
    
    if(!distanceFruitOk(xFruit, yFruit)){
        xFruit+=100;
        yFruit+=100;

    }

    document.getElementById('scoreNum').innerHTML=++score;
    fruit.style.top=`${yFruit}px`;
    fruit.style.left=`${xFruit}px`;
    timeScale/=3;
}

function distanceFruitOk(xFruitArg, yFruitArg)
{
    for(let i=0; i<body.length; i++)
    {   
        let bodyNodeYPosition = parseInt(body[i].style.top)+35;
        let bodyNodeXPosition = parseInt(body[i].style.left)+35;
        if(Math.sqrt((xFruitArg-bodyNodeXPosition)**2 + (yFruitArg-bodyNodeYPosition)**2)<5)
            return false;
    }
    return true;
}
generateFruit();

/////////////////////////////////////////////////////////////////////////////////////////
// TODO implement snake body logic

function checkForIntersection()
{
    if (body.length>=4){
        let currHeadYPosition = parseInt(body[body.length-1].style.top)+35;
        let currHeadXPosition = parseInt(body[body.length-1].style.left)+35;
        for (let i=0; i<body.length-4; i++)
        {
            let bodyNodeYPosition = parseInt(body[i].style.top)+35;
            let bodyNodeXPosition = parseInt(body[i].style.left)+35;
            if (Math.sqrt((currHeadXPosition-bodyNodeXPosition)**2 + (currHeadYPosition-bodyNodeYPosition)**2)<15)
                lostScreen();
        }
    }
}