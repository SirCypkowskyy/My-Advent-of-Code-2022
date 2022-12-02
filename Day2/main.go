package main

import (
	"bufio"
	"container/list"
	"fmt"
	"os"
	"strings"
)

type Pair struct {
	a, b string
}

func fightOutcome(enemyHand, playerHand *string) uint {
	if *enemyHand == "A" {
		if *playerHand == "X" {
			return 3 + 1
		} else if *playerHand == "Y" {
			return 6 + 2
		} else if *playerHand == "Z" {
			return 0 + 3
		}
	} else if *enemyHand == "B" {
		if *playerHand == "X" {
			return 0 + 1
		} else if *playerHand == "Y" {
			return 3 + 2
		} else if *playerHand == "Z" {
			return 6 + 3
		}
	} else if *enemyHand == "C" {
		if *playerHand == "X" {
			return 6 + 1
		} else if *playerHand == "Y" {
			return 0 + 2
		} else if *playerHand == "Z" {
			return 3 + 3
		}
	} else {
		fmt.Println("error")
	}
	return 0
}

func main() {
	file, err := os.Open("data.txt")
	if err != nil {
		fmt.Println(err)
		return
	}

	defer file.Close()

	scanner := bufio.NewScanner(file)

	pairList := list.New()

	var score uint = 0

	for scanner.Scan() {
		txt := strings.Split(scanner.Text(), " ")
		newPair := Pair{txt[0], txt[1]}
		pairList.PushBack(newPair)
	}
	for e := pairList.Front(); e != nil; e = e.Next() {
		enemyHand := e.Value.(Pair).a
		myHand := e.Value.(Pair).b
		score += fightOutcome(&enemyHand, &myHand)
	}
	fmt.Println(score)

	part2main(pairList)
}
