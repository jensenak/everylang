package main

import (
    "fmt"
    "math/rand"
)

type person struct {
    name string
    speed int
    win int
    it int
}

func (p *person) run() int {
   return rand.Intn(p.speed) 
}

func (p *person) updateStats(win bool) {
    if win {
        p.win++
    } else {
        p.it++
    }
}

func (p *person) printStats() {
    fmt.Printf("%s was it %d times and won %d times", p.name, p.it, p.win)
}

func main {
    var players = []*person
    for {
        var name, age, fit string
        fmt.Println("Name: ")
        fmt.Scanln(&name)
        fmt.Println("Age: ")
        fmt.Scanln(&age)
        fmt.Println("Fitness level 1 - 3 (1 = good): ")
        fmt.Scanln(&fit)
        if name == "" || age == "" || fit == "" {
            break
        }
        speed := int(int(age) * (1 + int(fit) / 5))
        players = append(players, &person{name: name, speed: speed})
    }
    var rounds int
    fmt.Println("How many rounds to play?")
    fmt.Scanln(&rounds)
}
