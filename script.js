var timeSelector = document.getElementById("time-selector");
for (let i = 5; i <= 60; i += 5) {
    var newElement = document.createElement("option");
    newElement.setAttribute("value", String(i));
    if (i === 30) {
        newElement.setAttribute("selected", "");
    }
    newElement.textContent = String(i) + "秒";
    timeSelector.appendChild(newElement);
};
var photoCountSelector = document.getElementById("count-selector");
for (let i = 1; i <= 15; i++) {
    var newElement = document.createElement("option");
    newElement.setAttribute("value", String(i));
    if (i === 4) {
        newElement.setAttribute("selected", "");
    }
    newElement.textContent = String(i) + "枚";
    photoCountSelector.appendChild(newElement);
};

var breakSelector = document.getElementById("break-selector");
for (let i = 0; i <= 10; i++) {
    var newElement = document.createElement("option");
    newElement.setAttribute("value", String(i));
    if (i === 0) {
        newElement.setAttribute("selected", "");
        newElement.textContent = "無し";
    } else {
        newElement.textContent = String(i) + "秒";
    }
    breakSelector.appendChild(newElement);
};

var filenames
$.getJSON("filenames.json", function(json){
    filenames = json.slice()
    document.getElementById("photo-count").textContent = filenames.length
})

$("#img").bind("contextmenu", function(e){
    return false
})

$("#img").bind("mousedown", function(e){
    return false
})


var startButton = document.getElementById("startbutton")

function main() {
    var imgBox = document.getElementById("img-box")
    var interval = timeSelector.options[timeSelector.selectedIndex].value;
    var photoCount = photoCountSelector.options[photoCountSelector.selectedIndex].value;
    var breakTime = breakSelector.options[breakSelector.selectedIndex].value;
    var img = document.getElementById("img")
    var imgnames = filenames.slice()
    while (imgnames.length > photoCount) {
        imgnames.splice(Math.floor(Math.random() * filenames.length), 1)[0]
    }

    var timeMeter = document.getElementById("time-meter");
    var textbox = document.getElementById("textbox");
    var count = 5;
    var showingPhotoIntex = 0
    var startedTime
    var isShowing
    var countdown = function () {
        if (count === 0) {
            clearInterval(id);
            img.removeAttribute("style");
            isShowing = true
            startedTime = Date.now()
            img.src = imgnames[showingPhotoIntex];
            textbox.style = "display: none;"
            id = setInterval(photoSwitch, 33.33);
        } else if (count <= 3) {
            textbox.textContent = count;
            textbox.style = "font-size: 200px;"
        } else {
            textbox.textContent = "Ready?";
            textbox.style = "font-size: 100px;"
        }
        count -= 1;
    }
    
    var photoSwitch = function () {
        if (isShowing) {
            meterPos = 100 - 100 * (Date.now() - startedTime) / (interval * 1000);
            if (meterPos <= 0){
                startedTime = Date.now()
                showingPhotoIntex += 1
                if(showingPhotoIntex === Number(photoCount)){
                    clearInterval(id)
                    startButton.removeAttribute("disabled");
                    timeSelector.removeAttribute("disabled");
                    photoCountSelector.removeAttribute("disabled");
                    breakSelector.removeAttribute("disabled");
                    img.style = "display:none;"
                    textbox.textContent = "終了!\nお疲れ様でした。"
                    textbox.style = "font-size:50px;"
                    return
                }
                if (breakTime > 0) {
                    img.style = "display:none;";
                    isShowing = false
                    textbox.style = "font-size:100px;"
                }
                img.src = imgnames[showingPhotoIntex];
            }
        }else{
            meterPos = 100 - 100 * (Date.now() - startedTime) / (breakTime * 1000);
            textbox.textContent = "Break"
            if (meterPos <= 0){
                isShowing = true
                textbox.style = "display:none;"
                img.removeAttribute("style")
                startedTime = Date.now()
            }
        }
        
        timeMeter.style = `background: linear-gradient(0deg, aqua ${meterPos}%, white ${meterPos}%, white 100%), -webkit-linear-gradient(0deg, aqua ${meterPos}%, white ${meterPos}%, white 100%);`
    }

    startButton.setAttribute("disabled", "");
    timeSelector.setAttribute("disabled", "");
    photoCountSelector.setAttribute("disabled", "");
    breakSelector.setAttribute("disabled", "");
    countdown()
    var id = setInterval(countdown, 1000);
}

startButton.onclick = main;