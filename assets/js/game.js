/* GAME FUNCTIONS */

// funtion to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// Ensure user provides valid response to fight or skip prompt
var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");


    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");

        return fightOrSkip();
    }


    promptFight = promptFight.toLowerCase();

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye.");
            // subtract money from playerMoney for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);



            return true;
        }
    }

    return false;
}






// fight function




var fight = function(enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;
    if (Math.random() > 0.5) {
        isPlayerTurn = false;

    }

    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            if (fightOrSkip()) {
                break;
            }
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);


            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."








            );


            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");


                playerInfo.money = playerInfo.money + 20;


                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }

        } else {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);


            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."








            );


            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");

                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }

        isPlayerTurn = !isPlayerTurn;
    }
};


var startGame = function() {

    // Reset player stats
    playerInfo.reset();

    // Log using debugger


    for (var i = 0; i < enemyInfo.length; i++) {
        // if player is still alive, keep fighting
        console.log(playerInfo);
        if (playerInfo.health > 0) {
            // let player know what round it is 
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            // debugger;

            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];



            // reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);
            console.log(pickedEnemyObj);

            // use debugger to pause script from running 
            // debugger;

            // call the fight function
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if player wants to use the store before the next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the shop() function
                if (storeConfirm) {
                    shop();
                }
            }
        }

        // if player isn't alive, stop the game
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }

    }







    //after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};


var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");

    // check localstorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }

    // if player has more money than the high score, player has new high score
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};


var shop = function() {

    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Please enter one: '1' to refill, '2' to upgrade, or '3' to leave."
    );

    shopOptionPrompt = parseInt(shopOptionPrompt);

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store.");

            // do nothing, leave the shop
            break;












        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

// function to set name
var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }




    console.log("Your robot's name is " + name);
    return name;
};

/* END GAME FUNCTIONS */


/* GAME INFORMATION / VARIABLES */





// player information
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for $7.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enought money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for $7.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }










};

var enemyInfo = [{
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Tumble",
        attack: randomNumber(10, 14)
    }
];

/* END GAME INFORMATION / VARIABLES */

/* RUN GAME */
startGame();