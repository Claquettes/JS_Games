//declaration du joueur, obstacle, et du trigger pour le nombre d'obstacles passés
var character = document.getElementById("character");
var obstacle = document.getElementById("obstacle");
var triggerScore = document.getElementById("triggerScore");
var positionTrigger = parseInt(window.getComputedStyle(triggerScore).getPropertyValue("left"));
let score = 0;
let temps = 440;
let speed = 6; // px/10ms
const obstacleBaseOffset = 580; // décalage de l'obstacle au début du jeu

//fonction qui fait sauter à l'imput
function jump(){
    if (character.classList != "playAnimation"){
        character.classList.add("playAnimation");
            setTimeout(function(){
                    character.classList.remove("playAnimation");
            },500);
    }
}

//procédure qui va regarder la collision(juxtaposition des deux classes)
 var checkCollision =setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top")); //recupère la valeur sur l'axe y du char//
        var blockLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left")); //recupère la valeur sur l'axe x du block//
         
        if(blockLeft<20 && blockLeft>0 && characterTop>=130){
            obstacle.style.animation ="none";
            obstacle.style.display ="none";
            alert("Tu as perdu sale Fraude rafraichi la page pour rejouer, et ton Score était: "+ (score));
            clearInterval(checkCollision);
        }
        /*else{
            score++;
            document.getElementById("scoretexte").innerHTML= (parseInt(score))/10; } */
        
 
    },10)
//procédure qui change la durée de l'animation de l'obstacle, et donc la vitesse 
var speedObstacle = setInterval(function() {
        if(score%1000>=19){
            speed += 1;
        } 
}, 4000)

// procédure pour animer un obstacle
let obstacleAnim = function(obs) {
    let currentOffset = (obs.style.left == '') ? obstacleBaseOffset : parseInt(obs.style.left.replace("px", ""));
    console.log(currentOffset);
    let newOffset = (currentOffset - speed <= -40) ? obstacleBaseOffset : currentOffset - speed;
    obs.style.left = newOffset + "px";
};

setInterval(function() {obstacleAnim(obstacle)}, 10);

//procedure qui augmente la var temps en millisecondes
var timer = setInterval(function(){
    temps= temps+5;
},5)

//procédure qui va permettre de compter le nombre d'obstacles passés
var trigger = setInterval(function(){
    var blockLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left")); //recupère la valeur sur l'axe x du block//
    if((blockLeft)<0 && temps>= 300){
        score++;
        temps=0;
    }
    document.getElementById("scoretexte").innerHTML= (parseInt(score));
    document.getElementById("leftObstacle").innerHTML= (parseInt(blockLeft));
    document.getElementById("leftTrigger").innerHTML= (parseInt(positionTrigger));
}, 2)