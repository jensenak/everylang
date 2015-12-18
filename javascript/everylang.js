(function () {
    "use strict";
    var adder = document.getElementById("adder");
    var go = document.getElementById("go");
    adder.addEventListener("click", addPlayer);
    go.addEventListener("click", startGame);
});

var playerList = [];

function player(name, age, fitness) {
    "use strict";
    this.name = name;
    this.speed = parseInt(parseInt(age) * (1 + parseInt(fitness) / 5));
    this.it = 0;
    this.wins = 0;
    this.domElement = new domElement(this);
    this.run = function () {
        return Math.random() * this.speed; 
    }
    this.updateStats = function (winner) {
        if (winner) {
            this.wins++;
            this.domElement.changeWC(this.wins);
        } else {
            this.it++;
            this.domElement.changeIC(this.it);
        }
    }
    this.showStats = function () {
        var s = this.name + " was it " + this.it + " times, and won " + this.wins + "times";
        var out = document.createElement("div");
        out.textContent = s;
        document.getElementById("output-area").appendChild(out);
    }
}

function domElement(pl) {
    "use strict";
    this.body = document.createElement("div");
    this.name = document.createElement("span");
    this.name.textContent = pl.name;
    this.itCounter = document.createElement("span");
    this.winCounter = document.createElement("span");
    this.body.appendChild(this.name);
    this.body.appendChild(this.itCounter);
    this.body.appendChild(this.winCounter);
    this.changeIC = function (val) {
        this.itCounter.textContent = val;
    }
    this.changeWC = function (val) {
        this.winCounter.textContent = val;
    }
    document.getElementById("player-area").appendChild(this.body);
}

function addPlayer () {
    "use strict";
    var name = document.getElementById('name');
    var age = document.getElementById('age');
    var fitness = document.getElementById('fitness');

    playerList.push(new player(name.value, age.value, fitness.value)); 

    name.value = "";
    age.value = "";
    fitness.value = "";
}

function startGame() {
    "use strict";
    var rounds = document.getElementById('rounds');
    if (rounds.value < 1) {
        rounds.value = 1;
    }
    if (playerList.length < 3) {
        alert("Not enough players!");
        return;
    }
    var it = Math.floor(Math.random() * playerList.length);
    var goose = it;
    playerList[it].updateStats(false); 
    for (var i = 0; i < rounds.value; i++) {
        while (goose === it) {
            goose = Math.floor(Math.random() * playerList.length);
        }
        var itr = playerList[it].run();
        var gooser = playerList[goose].run();
        if (gooser > itr) {
            playerList[goose].updateStats(false);
            playerList[it].updateStats(true);
            it = goose;
        } else {
            playerList[goose].updateStats(true);
            playerList[it].updateStats(false);
        }
    }
    for (player in playerList) {
        playerList[player].showStats();
    }
}
