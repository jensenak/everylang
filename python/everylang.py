from random import randint
import time

class person():
    count = 0

    def __init__(self, name, age, fitness):
        self.wins = 0
        self.it = 0
        self.name = name
        self.speed = int(int(age)*(.8+int(fitness)/5))
        person.count += 1

    def run(self):
       return randint(0, self.speed)

    def updateStats(self, winner):
        if winner:
            self.wins += 1
        else:
            self.it += 1

    def getStats(self):
        return "{} was it {} times, and won {} times".format(self.name, self.it, self.wins)


players = []
while True:
    name = input("Enter player name (empty to continue): ")
    if name == "":
        print("All players registered, moving to game play!")
        break
    age = input("What is this player's age: ")
    fit = input("1 = Active, 2 = Average, 3 = Sedentary; What is this player's fitness level? ")
    try:
        players.append(person(name, age, fit))
    except ValueError:
        print("All players registered, moving to game play!")
        break

rounds = int(input("How many rounds do you want to play? "))

goose = randint(0, person.count)
players[goose].updateStats(False)
stats = {}
for r in range(rounds):
    newGoose = randint(0, person.count-1)
    while newGoose == goose:
        newGoose = randint(0, person.count-1)
    print("{} is it, and chose {} as the goose".format(players[goose].name, 
                                                       players[newGoose].name))
    g = players[goose].run()
    n = players[newGoose].run()
    if g > n:
        print(" --> {} wins".format(players[newGoose].name))
        players[newGoose].updateStats(True)
        players[goose].updateStats(False)
    else:
        print(" --> {} wins".format(players[goose].name))
        players[newGoose].updateStats(False)
        players[goose].updateStats(True)
        goose = newGoose

print("Final stats: ")
for p in players:
    print(p.getStats())
