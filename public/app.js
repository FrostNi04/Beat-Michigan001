let receivedMsg;

window.addEventListener('load', function () {
})

// Live Clock Function
let span = document.getElementById('span');
function time() {
    let d = new Date();
    let s = d.getSeconds();
    let m = d.getMinutes();
    let h = d.getHours();

    span.textContent =
        ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
}

setInterval(time, 1000);

//Open and connect socket
let socket = io();
//Listen for confirmation of connection
socket.on('connect', function () {
    console.log("Connected");
});


/* --- Code to RECEIVE a socket message from the server --- */
//P5 CODE STARTS HERE
let soundfx;


function preload() {
    soundfx = loadSound('Assets/Audio/WE ARE.mp3');
}

function setup() {
    let cnv = createCanvas(windowWidth, 768);
    cnv.parent('canvas-container');
    fill(255, 255, 255)
    let dMsg = "Our Shared Thoughts";
    text(dMsg, 1 / 2 * windowWidth, 1 / 2 * 768)
    textSize(50);
    //Listen for messages named 'msg' from the server
    socket.on('msg', function (data) {
        console.log("Message arrived!");
        console.log(data);
        greet(data);
        //Create a message string and page element
        receivedMsg = data.name + ": " + data.msg + " and Michigan still sucks!";

    });
}


//Draw the reveieved Message
function greet(receivedMsg) {
    let skMsg = receivedMsg.name + " " + "said " + " " + receivedMsg.msg + " and Michigan still sucks!"
    console.log(skMsg + "111");

    for (let i = 0; i < 2; i++) {
        push();
        fill(255, 255, 255);
        translate(random(width), random(height));
        rotate(random(2 * PI));
        textSize(50);
        text(skMsg, 0, 0);


        pop();
    }
    soundfx.play();
}






/* --- Code to SEND a socket message to the Server --- */
let nameInput = document.getElementById('name-input')
let msgInput = document.getElementById('msg-input');
let sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', function () {
    let curName = nameInput.value;
    let curMsg = msgInput.value;
    let msgObj = { "name": curName, "msg": curMsg };

    //Send the message object to the server
    socket.emit('msg', msgObj);
});


