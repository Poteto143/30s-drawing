for (let i = 5; i <= 60; i += 5) {
    var newElement = document.createElement("option");
    newElement.setAttribute("value", String(i));
    if (i === 30) {
        newElement.setAttribute("selected", "")
    }
    newElement.textContent = String(i) + "秒";
    document.getElementById("time-selector").appendChild(newElement);
};
for (let i = 1; i <= 15; i++) {
    var newElement = document.createElement("option");
    newElement.setAttribute("value", String(i));
    if (i === 5) {
        newElement.setAttribute("selected", "")
    }
    newElement.textContent = String(i) + "枚";
    document.getElementById("count-selector").appendChild(newElement);
};
for (let i = 0; i <= 10; i++) {
    var newElement = document.createElement("option");
    newElement.setAttribute("value", String(i));
    if (i === 0) {
        newElement.setAttribute("selected", "")
        newElement.textContent = "無し";
    } else {
        newElement.textContent = String(i) + "秒";
    }

    document.getElementById("break-selector").appendChild(newElement);
};


var isStarted = false
function main() {
    if (isStarted) {
        return;
    }
    var filenames = [
        "Apple.jpg",
        "Bench.jpg",
        "Cardboard.jpg",
        "Peach.jpg"
    ]
    
    filenames.forEach(element => {
        var img = document.createElement("img")
        img.src = "assets/images/" + element
    });

    document.getElementById("startbutton").setAttribute("disabled", "")
    var counter = document.getElementById("img-box").appendChild(document.createElement("p"))
    isStarted = true
    var intervalSelector = document.getElementById("time-selector")
    var photoCountSelector = document.getElementById("count-selector")
    var breakSelector = document.getElementById("break-selector")
    var interval = intervalSelector.options[intervalSelector.selectedIndex].value
    var photoCount = photoCountSelector.options[photoCountSelector.selectedIndex].value
    var breakTime = breakSelector.options[breakSelector.selectedIndex].value
    intervalSelector.setAttribute("disabled", "")
    photoCountSelector.setAttribute("disabled", "")
    breakSelector.setAttribute("disabled", "")
    var startedTime = Date.now();

    var id = setInterval(function () {
        var passedTimes = Date.now() - startedTime
        counter.textContent = Math.ceil((5000 - passedTimes) / 1000)
        if (passedTimes > 5000) {
            clearInterval(id)
            startedTime = Date.now()
            id = setInterval(photoSwitch, 33.33)
        }
    }, 33.33)
    var photoSwitch = function () {
        counter.textContent = (Date.now() - startedTime) / 1000;
        
    }
}

document.getElementById("startbutton").onclick = main;