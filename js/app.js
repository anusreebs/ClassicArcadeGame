// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = 100 + Math.floor(Math.random() * 75);
    this.sprite = 'images/enemy-bug.png';

};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.reset();
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};
Enemy.prototype.reset = function() {
        this.x = -200;
    };
    // Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
        this.x = 200;
        this.y = 400;
        this.sprite = 'images/char-horn-girl.png';
    };
    //update function of the player
Player.prototype.update = function() {
    //set x axis boundaries
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    }
    //set y axis boundaries
    else if (this.y > 400) {
        this.y = 400;
    }
    //reset if player reaches water
    else if (this.y < 0) {
        score += 10;
        document.getElementById("score").innerHTML = "<h3>SCORE : " + score + "</h3>";
        alert("Congragulations!! You have reached your destination\n Your Score :"+score);
        this.reset();
        score = 0;
        document.getElementById("score").innerHTML = "<h3>SCORE : " + score + "</h3>";
    }

};

//render function
Player.prototype.render = function() {
    var img = new Image();
    img.src = this.sprite;
    ctx.drawImage(img, this.x, this.y);
};
// array of Enemies
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    var x = 200;
    var y = 65 + 80 * i;
    var e = new Enemy(x, y);
    allEnemies.push(e);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

//reset function of the player
Player.prototype.reset = function() {
     score+=10;
     document.getElementById("score").innerHTML = "<h3>SCORE : " + score + "</h3>";
    this.x = 200;
    this.y = 400;
    allGems = [];
    intializeGems();
};

//key movements of the player
Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'up':
            this.y = this.y - 90;
            break;

        case 'down':
            this.y = this.y + 90;
            break;

        case 'left':
            this.x = this.x - 100;
            break;

        case 'right':
            this.x = this.x + 100;
            break;

        default:
            break;
    }
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Array of gems
var gemImgs = ["Gem Green.png", "Gem Blue.png", "Gem Orange.png"];
//function for random display of the gems
var Gems = function(x, y) {
    this.x = x;
    this.y = y;
    var rnd = Math.floor(Math.random() * 3);
    this.sprite = "images/" + gemImgs[rnd];
};
//Invocation of the gems array
var allGems = [];
//Intailization of the gems
function intializeGems() {
    document.getElementById("score").innerHTML = "<h3>SCORE : " + score + "</h3>";
    for (var i = 0; i < 3; i++) {
        var x = Math.floor(Math.random() * 5) * 100;
        var y = 65 + 80 * Math.floor(Math.random() * i);
        var g = new Gems(x, y);
        allGems.push(g);
    }
}

//Invocation of the intialization function
var score = 0;
intializeGems();
//Render function of the gems
//display different gems
Gems.prototype.render = function() {
    var img = new Image();
    img.src = this.sprite;

    ctx.drawImage(img, this.x, this.y, 101, 160);
};
//Reset the gems after collision
Gems.prototype.reset = function() {
    this.x = -200;
    this.y = -200;
};

//function to change the player in the game
function changePlayer(char) {
    var charImg;
    switch (char) {
        case 'boy':
            charImg = "char-boy.png";
            break;
        case 'pink':
            charImg = "char-pink-girl.png";
            break;
        case 'cat':
            charImg = "char-cat-girl.png";
            break;
        case 'horn':
            charImg = "char-horn-girl.png";
            break;
        default:
            break;
    }
    player.sprite = "images/" + charImg;
    return false;
}