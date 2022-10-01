//declaration du joueur et de l'obstacle//
var character = document.getElementById("character");
var obstacle = document.getElementById("obstacle");

let lg = 3;
let score = 0;

//fonction qui fait sauter à l'imput//
function jump(){
    if (character.classList != "playAnimation"){
        character.classList.add("playAnimation");
            setTimeout(function(){
                    character.classList.remove("playAnimation");
            },500);
    }
}

//booléen qui va regarder la collision(juxtaposition des deux classes)//
 var checkCollision =setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top")); //recupère la valeur sur l'axe y du char//
        var blockLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left")); //recupère la valeur sur l'axe x du block//
         
        if(blockLeft<20 && blockLeft>0 && characterTop>=130){
            obstacle.style.animation ="none";
            obstacle.style.display ="none";
            alert("Tu as perdu sale Fraude rafraichi la page pour rejouer, et ton Score était: ");
            alert((score)/10);
        }
        else{
            score++;
            document.getElementById("scoretexte").innerHTML= (parseInt(score))/10;
        }
 
    },10)
/*fonction qui change la durée de l'animation de l'obstacle, et donc la vitesse */
var speedObstacle =setInterval(function() {

        if(score%1000>=19){
            let root = document.documentElement;
            root.style.setProperty('--time', (Math.random()+1.8 )+ "s");

        } 
}, 4000)
