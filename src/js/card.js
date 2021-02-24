class Card{
    suit = null // heart, spade, club, diamonb
    rank = null // "A", "1", "2", ... "10", "J", "Q", "K"
    isVisible = false;
    isPlayed = false;
    constructor(suit, rank, isVisible = false, isPlayed = false){
        this.suit = suit;
        this.rank = rank;
        this.isVisible = isVisible;
        this.isPlayed = isPlayed;
    }

    render(facing) {
        const cardEl = document.createElement(`div`)
        cardEl.classList.add(`card`)

        const suitEl = document.createElement(`span`)
        suitEl.classList.add(`suit`)
        suitEl.classList.add(this.suit)
        suitEl.innerHTML = this.suit

        const rankEl = document.createElement(`span`)
        rankEl.classList.add(`rank`)
        rankEl.innerHTML = this.rank

        cardEl.appendChild(rankEl)
        cardEl.appendChild(suitEl)
        if(facing === `down`){
            const cardBack = document.createElement(`div`)
            cardBack.classList.add(`card-back`)
            cardEl.appendChild(cardBack)
        }

        return cardEl
    }
}