package main

import (
	"container/list"
	"fmt"
)

func newFightOutcome(enemyHand, playerHand *string) uint {
	if *enemyHand == "A" {
		if *playerHand == "X" {
			return 3 + 0
		} else if *playerHand == "Y" {
			return 1 + 3
		} else if *playerHand == "Z" {
			return 2 + 6
		} else {
			fmt.Println("error")
		}

	} else if *enemyHand == "B" {
		if *playerHand == "X" {
			return 1 + 0
		} else if *playerHand == "Y" {
			return 2 + 3
		} else if *playerHand == "Z" {
			return 3 + 6
		} else {
			fmt.Println("error")
		}
	} else if *enemyHand == "C" {
		if *playerHand == "X" {
			return 2 + 0
		} else if *playerHand == "Y" {
			return 3 + 3
		} else if *playerHand == "Z" {
			return 1 + 6
		} else {
			fmt.Println("error")
		}
	} else {
		fmt.Println("error")
	}
	return 0
}

func part2main(part1pairList *list.List) {
	fmt.Println("Part 2 answer:")
	var score uint = 0

	for e := part1pairList.Front(); e != nil; e = e.Next() {
		enemyHand := e.Value.(Pair).a
		myHand := e.Value.(Pair).b
		score += newFightOutcome(&enemyHand, &myHand)
	}
	fmt.Println(score)
}
