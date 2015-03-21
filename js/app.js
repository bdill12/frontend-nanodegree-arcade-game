// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Generate random number up to 505 for x
    this.x = Math.ceil(Math.random() * 505);
    // Generate multiple of 83 for y
    this.y = Math.floor(Math.random() * 3) * 83;
    // Generate a random speed
    this.speed = Math.floor(Math.random() * 1200);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Update x with speed.
    this.x = this.x + (this.speed * dt);
    // Regenerate bugs as they exit the game on the right
    if (this.x > 505) {
        this.x = 0;
        // Generate new y for bug
        this.y = Math.floor(Math.random() * 3) * 83;
        // Generate new speed for bug
        this.speed = Math.floor(Math.random() * 1200);
    }
    // Check to see if there is a collision
    function collision(playx, bugx) {
        if (bugx > playx - 50 && bugx < playx + 50) {
            return true;
        }
    }
    // Check the y value with the collision function to show collision
    if (this.y === player.y && collision(player.x, this.x)) {
    // Display alert
        sweetAlert('The bugs!', 'They are everywhere!', 'error');
    // Reset player to original position
        player.x = 200;
        player.y = 415;
    // Subtract one point
        score = score - 1;
        document.getElementById('score').innerHTML = 'Score: ' + score;
    // If the total score is -3, then make the game very easy
        if (score === -3) {
            level = level - 1;
            allEnemies = allEnemies.slice(0, 1);
    // Subtract one level
            document.getElementById('level').innerHTML = 'Level: ' + level;
        }
    // If the score drops to 2 (from 3) then remove enemies from allEnemies
    // and subtract a level
        if (score === 2) {
            allEnemies = allEnemies.slice(0, 3);
            level = level - 1;
            document.getElementById('level').innerHTML = 'Level: ' + level;
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
// Use array in order to change the children as they are saved.
    this.sprite = child[0];
    this.x = 200;
    this.y = 415;
};
//Global variables score, level, child, and i
var score = 0;
var level = 1;
var child = ['images/char-boy.png', 'images/char-cat-girl.png',
'images/char-boy-blue.png', 'images/char-horn-girl.png',
'images/char-boy-ninja.png', 'images/char-pink-girl.png',
'images/char-boy-sailor.png', 'images/char-princess-girl.png'];
var i = 0;

Player.prototype.update = function(dt) {
// If the player leaves the edges of the board, return it to original position
    if (this.x < 0 || this.x >= 500 || this.y > 415) {
        this.x = 200;
        this.y = 415;
    }
    // If the player makes it to the water, display alert
    if (this.y < 0) {
        sweetAlert('Safe!', 'I hope these kids can swim.', 'success');
    // Reset player
        this.x = 200;
        this.y = 415;
    // Add to score
        score = score + 1;
    // Change child by increasing i
        i = i + 1;
        this.sprite = child[i];
// If all children have been rescued, then show alert with final score.
        if (i == 8) {
            sweetAlert('Congrats! All the children are safe.',
                'Your final score is ' + score + '.', 'success');
        }
document.getElementById('score').innerHTML = 'Score: ' + score;

    // If the user's score moves up to 3, then add two more enemies and a level.
    if (score == 3) {
        var enemy4 = new Enemy();
        var enemy5 = new Enemy();
        allEnemies.push(enemy4);
        allEnemies.push(enemy5);
        level = level + 1;
        document.getElementById('level').innerHTML = 'Level: ' + level;
    }

// If the user's score moves up to 6, then add three more enemies and a level.
    if (score == 6) {
        var enemy6 = new Enemy();
        allEnemies.push(enemy6);
        var enemy7 = new Enemy();
        allEnemies.push(enemy7);
        var enemy8 = new Enemy();
        allEnemies.push(enemy8);
        level = level + 1;
        document.getElementById('level').innerHTML = 'Level: ' + level;
    }

// If the user's score moves up to 7, then add three more enemies and a level
    if (score == 7) {
        var enemy9 = new Enemy();
        allEnemies.push(enemy9);
        var enemy10 = new Enemy();
        allEnemies.push(enemy10);
        var enemy11 = new Enemy();
        allEnemies.push(enemy11);
        level = level + 1;
        document.getElementById('level').innerHTML = 'Level: ' + level;
    }

// If the user's score moves up to 0, return to level 1, back to 3 enemies
    if (score === 0) {
        if (level === 0) {
            level = level + 1;
            allEnemies.push(enemy2);
            allEnemies.push(enemy3);
            document.getElementById('level').innerHTML = 'Level: ' + level;
        }
    }
}
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    console.log(key + ', ');
    if (key === 'right') {
        this.x = this.x + 100;
    }
    if (key === 'left') {
        this.x = this.x - 100;
    }
    if (key === 'up') {
        this.y = this.y - 83;
    }
    if (key === 'down') {
        this.y = this.y + 83;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
