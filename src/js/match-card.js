class MatchCard extends Game {
    start = () => {
        this.clickCount = 0
        this.clickedCards = []
        this.freeze = false
        this.deck.shuffle()
        this.cardFacing = `down`
        if(this.deck.cards.length >=12){
            this.startCards = this.deck.deal(12)
        }
        else{
            this.deck.reset()
            this.deck.shuffle()
            this.startCards = this.deck.deal(12)
        }
        
        this.startCards.forEach(nextCard => {
            this.addCardToBoard(nextCard, this.cardFacing)
        })
        document.querySelector(`.start`).style.display = `none`
        const dealtCards = document.querySelectorAll(`.card`)
        dealtCards.forEach(nextCard => {
            nextCard.addEventListener(`click`, this.handleClick)
        })
        document.querySelector(`.finish`).style.display = `inline`
    }

    handleClick = (evt) => {
        if(!this.freeze){
            if(this.clickCount <= 2){
                if(evt.target.classList.contains(`card-back`)){
                    this.clickCount++
                    evt.target.remove()
                    const clickedCard = {
                        rank: evt.currentTarget.querySelector(`.rank`).textContent,
                        suit: evt.currentTarget.querySelector(`.suit`).textContent,
                        element: evt.currentTarget
                    }
                    this.clickedCards.push(clickedCard)
                } 
            }
            if(this.clickCount === 2) this.checkMatch()
        }
    }

    checkMatch = () => {
        if(this.clickedCards[0].rank === this.clickedCards[1].rank) this.handleMatch()
        else if(this.clickedCards[0].suit === this.clickedCards[1].suit) this.handleMatch()
        else{
            this.freeze = true
            this.showMessage(`No match.`)
            setTimeout(() => {
                this.clickedCards.forEach(nextCard => {
                    console.log(nextCard.element)
                    if(!nextCard.element.querySelector(`card-back`)){
                        const cardBack = document.createElement(`div`)
                        cardBack.classList.add(`card-back`)
                        nextCard.element.appendChild(cardBack)
                    }
                    this.freeze = false
                })
                this.clickedCards = []
            }, 750)
            
        }
        this.clickCount = 0
    }

    handleMatch = () => {
        this.showMessage(`You found a match!`)
        this.clickedCards.forEach(nextCard => {
            nextCard.element.removeEventListener(`click`, this.handleClick)
        })

        this.clickedCards = []
        this.clickCount = 0

    }

    finish() {
        document.querySelector(`.finish`).style.display = `none`
        
        let dealtCards = document.querySelectorAll(`.card`)
        dealtCards.forEach(nextCard => {
            nextCard.remove()
        })

        document.querySelector(`.start`).style.display = `inline`
    }


}

new MatchCard()