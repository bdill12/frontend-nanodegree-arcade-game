// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.ceil(Math.random() * 505);
    this.y = Math.floor(Math.random() * 3) * 83;
    this.speed = Math.floor(Math.random() * 1200);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 505) {
        this.x = 0;
        this.y = Math.floor(Math.random() * 3) * 83;
        this.speed = Math.floor(Math.random() * 1200);
    }

    function collision(playx, bugx) {
        if (bugx > playx - 50 && bugx < playx + 50) {
            return true;
        }
    }

    if (this.y === player.y && collision(player.x, this.x)) {
        sweetAlert("The bugs!", "They're everywhere!", "error");
        player.x = 200;
        player.y = 415;
        score = score - 1;
        document.getElementById('score').innerHTML = 'Score: ' + score;
        if (score === -3) {
            level = level - 1;
            allEnemies = allEnemies.slice(0, 1);
            document.getElementById('level').innerHTML = 'Level: ' + level;
        }
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
    this.sprite = child[0];
    this.x = 200;
    this.y = 415;
};

var score = 0;
var level = 1;
var child = ['images/char-boy.png', 'images/char-cat-girl.png',
'images/char-boy-blue.png', 'images/char-horn-girl.png',
'images/char-boy-ninja.png', 'images/char-pink-girl.png',
'images/char-boy-sailor.png', 'images/char-princess-girl.png'];
var i = 0;

Player.prototype.update = function(dt) {
    if (this.x < 0 || this.x >= 500 || this.y > 415) {
        this.x = 200;
        this.y = 415;
    }
    if (this.y < 0) {
        sweetAlert("Safe!", "I hope these kids can swim.", "success");
        this.x = 200;
        this.y = 415;
        score = score + 1;
        i = i + 1;
        this.sprite = child[i];
        if (i == 8) {
            sweetAlert("Congrats! All the children are safe.", "Your final score is " + score + ".", "success");
        }

        document.getElementById('score').innerHTML = 'Score: ' + score;
        if (score == 3) {
            var enemy4 = new Enemy();
            var enemy5 = new Enemy();
            allEnemies.push(enemy4);
            allEnemies.push(enemy5);
            level = level + 1;
        document.getElementById('level').innerHTML = 'Level: ' + level;
        }
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
