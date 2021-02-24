class Game {
    constructor(deckSize){
        if (!this.loadGame()){
            this.deckSize = deckSize
            this.deck = new Deck(deckSize)
        }

        this.setupListeners()

        new MessageHandler()
    }

    setupListeners(){
        document.querySelector(`.start`).addEventListener(`click`, this.handleStart)
        document.querySelector(`.shuffle`).addEventListener(`click`, this.shuffle)
        document.querySelector(`.finish`).addEventListener(`click`, this.finish)
    }

    showMessage(message) {
        let evt = new CustomEvent(`message`, {detail: { message: message }})
        document.dispatchEvent(evt)

        setTimeout(() => {
            let evt = new CustomEvent(`clear-message`)
            document.dispatchEvent(evt)
        }, 5000)
    }

    start = () => {

    }

    handleStart = () => {
        this.showMessage(`The game has begun!`)
        this.start()
    }

    shuffle = () => {
        this.showMessage(`Shuffling ...`)
        this.deck.shuffle()
        this.showMessage(`The deck has been shuffled`)

        this.saveGame()
    }

    deal(numCards) {

    }

    addCardToBoard(card, facing) {
        const deckEl = document.querySelector(`.deck`)
        const cardEl = card.render(facing)
        card.isPlayed = true
        deckEl.appendChild(cardEl)
        this.saveGame()
    }

    showAll() {

        this.cards.forEach((card) => {
            this.addCardToBoard(card)
        })
    }

    saveGame() {
        // localStorage.setItem(`deck`, JSON.stringify(this.deck))
        localStorage.setItem(`gameState`, 
        JSON.stringify(
            {
                deck: this.deck,
                deckSize: this.deckSize
            }
            ))
    }

    loadGame() {   
        try {
            const state = JSON.parse(localStorage.getItem(`gameState`))
            if (state && state.deck){
                this.deckSize = state.deckSize
                this.deck = Deck().restore(state.deckSize, state.deck.cards, state.deck.discarded)

                this.deck.discarded.forEach(card => this.addCardToBoard(card))

                return true
            }

           
        } catch (err) {
            console.error(`no game state`)
        }

        return false
    }
}