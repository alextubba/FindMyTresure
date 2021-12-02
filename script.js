let temps = {
    ["HOT"]: {
        MinDist: 30,
        Color: "red"
    }, 
    ["Warm"]: {
        MinDist: 70,
        Color: "orange",
    },
    ["Cold"]: {
        MinDist: 150,
        Color: "lightblue",
    }, 
    ["SUPER COLD"]: {
        MinDist: 250,
        Color: "blue",
    },
}

let X = document.getElementById("X")
let map = document.getElementById("map")
let Temp = document.getElementById("Temp")
let ScoreLabel = document.getElementById("Score")
let Score = 20;

function StartGame() {
    Score = 20;
    X.style.display = "block"
    X.style.opacity = 0
    console.log(screen.width)
    X.style.left = (Math.random() * map.width * 0.7 + screen.width/4) + "px"
    X.style.top = (Math.random() * map.height/2) + "px"
};

function UpdateTemp(Dist) {
    for (const Text in temps) {
        if (Object.hasOwnProperty.call(temps, Text)) {
            const element = temps[Text];
            
            if (Dist < element.MinDist+parseInt(X.width)) {
                Temp.innerHTML = Text
                Temp.style.color = element.Color
                break
            }
        }
    }
};

function HandleClick(x, y) {
    if (Score > 0 && X.style.opacity == 0) {
        Score--
        ScoreLabel.innerHTML = "Score: " + Score;
        let offsetX = parseInt(X.style.left) + parseInt(X.width/2);
        let offsetY = parseInt(X.style.top) + parseInt(X.height/2);

        console.log(`X: ${offsetX}, Y: ${offsetY}`)

        let Distance = Math.sqrt(Math.pow(x-offsetX, 2)+Math.pow(y-offsetY,2))
        console.log(Distance)
        console.log(parseInt(X.width))
        UpdateTemp(Distance)

        if (Distance < parseInt(X.width/2)) {
            X.style.opacity = 1;
            document.getElementById("win").style.display = "block"
        };
    };
};

StartGame();

document.addEventListener('click', (event) => {
    let Xpos = event.clientX;
    let Ypos = event.clientY;
	HandleClick(Xpos, Ypos)
});