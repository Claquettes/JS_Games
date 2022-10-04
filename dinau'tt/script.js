//declaration du joueur, obstacle, et du trigger pour le nombre d'obstacles passés
const obstacleBaseOffset = 580; // décalage de l'obstacle au début du jeu

var character = document.getElementById("character");
var obstacleContainer = document.getElementById("obstacle-container");
var triggerScore = document.getElementById("triggerScore");
var positionTrigger = parseInt(window.getComputedStyle(triggerScore).getPropertyValue("left"));

let score = 0;
let temps = 440;
let speed = 6; // px/10ms

let obstacles = [];

// fonction qui fait sauter à l'input
function jump() {
    if (character.classList != "playAnimation") {
        character.classList.add("playAnimation");
        setTimeout(function () {
            character.classList.remove("playAnimation");
        }, 500);
    }
}

let addNewObstacle = function () {
    let newObstacle = document.createElement("div");
    newObstacle.classList.add("obstacle");
    obstacleContainer.appendChild(newObstacle);
    obstacles.push(newObstacle);
    return newObstacle;
}

let resetObstacle = function (obs) {
    obs.style.left = obstacleBaseOffset + "px";
}

// procédure pour animer un obstacle
let obstacleAnim = function (obs) {
    if (obs.style.left == '')
        resetObstacle(obs)

    let currentOffset = parseInt(obs.style.left.replace("px", ""));
    let newOffset = (currentOffset - speed <= -40) ? obstacleBaseOffset : currentOffset - speed;
    obs.style.left = newOffset + "px";
};

// boucle principale du jeu pour vérifier si on a perdu, compter le score, animer les obstacles...
var gameLoop = setInterval(function () {
    obstacles.forEach((obs, idx) => {
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top")); //recupère la valeur sur l'axe y du char//
        var blockLeft = parseInt(window.getComputedStyle(obs).getPropertyValue("left")); //recupère la valeur sur l'axe x du block//

        //// On vérifie si on a perdu
        if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
            obstacles.splice(idx, 1); // on cancel l'animation
            obstacleContainer.remove(obs)

            alert("Tu as perdu sale Fraude rafraichi la page pour rejouer, et ton Score était: " + (score));
            clearInterval(gameLoop);
        }

        //// on check si on a jump au dessus d'un bloc
        if (blockLeft < 0) {
            score++;

            obstacles.splice(obstacles.indexOf(obs), 1); // on cancel l'animation
            obs.remove();

            // on rajoute un obstacle après 500ms de délai
            setTimeout(() => {
                addNewObstacle();
            }, 500);
        }

        // On anime l'obstacle
        obstacleAnim(obs)

        /// TODO : change speed

        document.getElementById("scoretexte").innerHTML = (parseInt(score));
        document.getElementById("leftObstacle").innerHTML = (parseInt(blockLeft)); // va bug si plusieurs obstacles mais on le laisse pour debug
        document.getElementById("leftTrigger").innerHTML = (parseInt(positionTrigger));
    })
}, 10);

// on lance le jeu :
let ob = addNewObstacle()
