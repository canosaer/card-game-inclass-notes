class OneAtATime extends Game {
    start = () => {
       // super.start() // calls parent class's version of this method

        const [ nextCard ] = this.deck.deal(1)
        this.addCardToBoard(nextCard)
    }
}

new OneAtATime()