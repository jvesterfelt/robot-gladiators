var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// log all values at once
console.log(playerName, playerAttack, playerHealth);

var enemyName = ["Roborto", "Amy Android", "Robo Trumble"];
console.log(enemyName.length);
for (var i = 0; i < enemyName.length; i++) {
    console.log(enemyName[i]);
    console.log(i);
    console.log(enemyName[i] + " is at " + i + " index");
}
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // if player chooses to fight, then fight.
    if (promptFight === "fight" || promptFight === "FIGHT") {


        // Alert players that they are starting the round
        window.alert("Welcome to Robot Gladiators!");

        // Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
        enemyHealth = enemyHealth - playerAttack;

        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
        playerHealth = playerHealth - enemyAttack;

        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
        // if player chooses to skip the fight
    } else if (promptFight === "skip" || promptFight === "SKIP") {
        window.alert(playerName + " has chosen to skip the fight!");

        // player confirms whether the want to quit
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes, leave the fight.
        if (confirmSkip) {
            window.alert(playerName + " has left the fight.");
            playerMoney = playerMoney - 2;
        }

        // if no, then ask again by running fight() again
        else {
            fight();
        }
    } else {
        window.alert("You need to choose a valid option. Please try again!");
    }
}
for (var i = 0; i < enemyName.length; i++) {
    fight(enemyName[i]);
}