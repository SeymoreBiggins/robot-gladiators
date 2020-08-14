//Game States
//"WIN" - Player robot has defeated all enemy robots
//      * fight all enemy robots
//      * Defeat each enemy robot
// "LOSE" - player robot's health is zero or less

// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    
    return value;
};

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
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
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } 
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } 
        else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

var fight = function(enemy) {
    // Alert users that they are starting the round
    while (enemy.health > 0 && playerInfo.health > 0) {
        //checking if the user wants to fight
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        if (promptFight === "skip" || promptFight === "Skip" || promptFight === "SKIP") {
            window.alert(playerInfo.name + " has chosen to skip the fight!");
            var skipCost = 10;
            //confirm the user would like to skip.
            var confirmSkip = window.confirm("Are you sure you'd like to quit? Cost: " + skipCost + " coins. You have " + playerInfo.money + " coins.");
            
            // if yes/true and they have enough coins, leaves the fight
            if (confirmSkip && playerInfo.money >= skipCost) {
                window.alert (playerInfo.name + " has decided to skip this fight. Goodbye!");
                //subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money -10);
                break;
                //check if user has enough money to skip
            } else if (confirmSkip && playerInfo.money < skipCost) {
                // alert them that they need more money
                window.alert("You do not have enough coins to skip this round! Try again!");
                fight(enemy.name);
                // if no, fight continues.
            } else {
                fight(enemy.name);
            }
        } 
        
        //If the player chooses to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT") {
            //Subtract the value of 'playerInfo.attack' from the value of 'enemy.health' and that  result to update the value in the 'enemy.health' variable.
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            //Log a resulting message to the console so we know that it worked.
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
                );
                
            //check enemy's health
            if (enemy.health <= 0) {
                enemy.health = 0;
                window.alert(enemy.name + " has died!");
                playerInfo.money = playerInfo.money + 20;
                break;
            }
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
            
            //Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' and that  result to update the value in the 'playerInfo.health' variable.
            playerInfo.health = Math.max(0, playerInfo.health - enemy.attack);
            //Log a resulting message to the console so we know that it worked.
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
                );
                //check player's health
                if (playerInfo.health <= 0) {
                    playerInfo.health = 0;
                    window.alert(playerInfo.name + " has died!");
                    break;
                }
                else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
    };
}

// function to start a new game
var startGame = function() {
    // reset player stats
    playerInfo.reset();
    
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            
            var pickedEnemyObj = enemyInfo[i];
            
            pickedEnemyObj.health = randomNumber(40, 60);
            
            fight(pickedEnemyObj);
            
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if user wants to continue to shop before next round
                var storeComfirm = window.confirm("The fight is over, would you like to visit the shop before the next round?");
                
                //if yes, then take them to the store() function
                if (storeComfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    
    // Play Again
    endGame();
};

var endGame = function() {
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("The game has now ended. Let's see how you did!");
    } 
    else {
        window.alert("You've lost your robot in battle. ");
    }
    
    // 
    var playAgainConfirm = window.confirm("Would you like to play again?");
    
    if (playAgainConfirm) {
        // restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    // ask the player if they want to REFILL health, UPGRADE attack, or LEAVE the shop
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop?"
    );
        
    switch (shopOptionPrompt) {
        case "refill":
        case "REFILL":
            playerInfo.refillHealth();
            break;
        case "upgrade":
        case " UPGRADE":
           playerInfo.upgradeAttack();
            break;
        case "leave":
        case "LEAVE":
            window.alert("Leaving the store.");
            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};
        
startGame();
