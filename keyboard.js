const spaceBtn = document.querySelector("#space");
const display = document.querySelector(".display");

var toggle = false;
var target = "";
var index = 0;
var myVar;
var secondlimit;
var minute;
var points;
var togglecountword = true;

function generate(size) {
    let length = size;
    let result = '';
    for(let i = 0; i < length; i++) {
        result += String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }
    return result
}

function realmain(){
    secondlimit = 59;
    minute = 0;
    points = 0;
    clearInterval(myVar);
    //timer
    myVar = setInterval(function(){ myTimer() }, 1000);
    function myTimer() {
        if(secondlimit == 0){
            if (minute == 0){
                clearInterval(myVar);
                alert(points)
            }else{
                minute = minute - 1;
                secondlimit = 59;
            }
        }
        document.getElementById("time").innerHTML = "0"+ minute +":"+ zeroPad(secondlimit,2);
        secondlimit = secondlimit  - 1;

    }
    function zeroPad(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }
    main();
}


function main(){
    let sizeofsentence = Math.floor(Math.random()*5) + 28;
    let mainstring = ""
    for (let i = 0;i<sizeofsentence;i++){
        let size = Math.floor(Math.random() * 5) + 3;
        let word = generate(size);
        mainstring = mainstring + word + " "
    }
    //remove last character i.e. space
    mainstring = mainstring.slice(0,mainstring.length-1)
    
    //remove previous data from textbox
    let dir = document.getElementById("mainbox");
    if (dir){
        document.getElementById("textarea").removeChild(dir);
    }
    //add data in text box
    let div = document.createElement("div");
    div.style = "display: flex; flex-wrap: wrap"
    div.id = "mainbox"
    document.getElementById("textarea").appendChild(div);
    for (let i = 0;i<mainstring.length;i++){
        let smalldiv = document.createElement("div");
        if (mainstring[i] == " "){
            smalldiv.style = "width: 10px; border-bottom: 2px solid; margin-bottom:5px";
        }else{
            smalldiv.innerHTML = mainstring[i];
        }
        smalldiv.id = i
        document.getElementById("mainbox").appendChild(smalldiv);
    }

    target = mainstring;
    toggle = true;
    index = 0;
    document.querySelector("#storecharacter").focus();
}

document.querySelector("body").onclick = function(e){
    if (toggle){
        document.querySelector("#storecharacter").focus();
    }
};

function colorchange(){
    let val = document.getElementById("storecharacter");
    Array.from(val.value).forEach((e, i) =>{
        try {
            document.getElementById(e).style.animation = "blink 0.2s linear 1";
            setTimeout(function(){
            document.getElementById(e).style.animation = "none";
            }, 200);
        } catch (error) {
            console.log("different word")  
        }
        

        if (e == target.charAt(0)){
            document.getElementById(index).style.color = "#1cd45c";
            if (target.charAt(0) == " "){
                if (togglecountword){
                    points = points + 1
                    console.log(points)
                }
                
                togglecountword = true;
            }
        }else{
            if (target.charAt(0) == " "){
                togglecountword = true;
            }else{
                togglecountword = false;
            }
            document.getElementById(index).style.color = "red";
        }

        //remove first element
        target = target.slice(1)
        index += 1

        //check string is empty or not
        if (target.length == 0){
            if(togglecountword){
                points = points + 1
            }
            togglecountword = true;
            main();
        }

        console.log(index) 
        

    });
    val.value = "";
}
