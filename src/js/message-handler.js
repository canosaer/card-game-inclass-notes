class MessageHandler {
    constructor() {
        this.messageEl = document.querySelector(`.message`)

        this.setupListener()
    }

    setupListener() {
        document.addEventListener(`message`, this.handleMessage)
        document.addEventListener(`clear-message`, this.clearMessage)
    }

    clearMessage = () => {
        this.messageEl.innerText = ``
    }

    handleMessage = (evt) => {
        // evt is a custom event and will have a key "detail" that may have a key "message"
        // instead of:
        // const msg = evt.detail.message
        // we can use destructuring
        const { message } = evt.detail

        this.messageEl.innerText = message
    }
}