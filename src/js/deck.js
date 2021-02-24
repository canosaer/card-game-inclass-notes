class Deck {
    DEFAULT_DECK_SIZE = 52
    deckSize = null

    SUITS = [`♥`, `♦`, `♣`, `♠`]  //https://emojidictionary.emojifoundation.com/
    RANKS = [`A`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `J`, `Q`, `K`]

    constructor(deckSize) {
        this.deckSize = deckSize ? deckSize : this.DEFAULT_DECK_SIZE

        this.create()

    }

    static restore(deckSize, cards, discarded) {
        const newDeck = new Deck(deckSize)
        newDeck.cards = cards.map(card => new Card(card.suit, card.rank, card.isVisible, card.isPlayed))
        newDeck.discarded = discarded.map(card => new Card(card.suit, card.rank, card.isVisible, card.isPlayed))
        this.cards = cards
        this.discarded = discarded
        return newDeck
    }

    create() {
        this.cards = []
        this.discarded = []
        this.SUITS.forEach((suit) => {
            this.RANKS.forEach((rank)=> {
                this.cards.push(new Card(suit, rank))
            })
        })
    }

    shuffle() {                      //https://bost.ocks.org/mike/shuffle/
        var m = this.cards.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = this.cards[m];
            this.cards[m] = this.cards[i];
            this.cards[i] = t;
        }

        //optional return in case it's helpful elsewhere in the app
        return this.cards;
    }

    reset() {
        this.create()
    }

    deal(numCards) {
        let returnCards = []
        for(let i=0;i<numCards;i++){
            const nextCard = this.cards.pop()
            nextCard.isPlayed = true
            this.discarded.push(nextCard)
            returnCards.push(this.cards.pop())
        }
        return returnCards
        
    }
}

new Deck()