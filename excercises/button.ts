class CuButton extends HTMLElement {
    constructor(public isHidden: boolean = true, public text: string) {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.text = this.getAttribute('text')!;

        this.shadowRoot!.innerHTML = `
        <button>${this.text}</button>`;


        this.addEventListener('click', this.buttonHandler.bind(this));
    }

    private buttonHandler(e: Event) {
        const infoEl = document.querySelector('zap-para')!.shadowRoot!.querySelector("p") as HTMLParagraphElement;
        const btn = this.shadowRoot!.querySelector("button") as HTMLButtonElement;

        if (this.isHidden) {
            btn.textContent = 'Hide';
            infoEl.style.display = 'block';
            this.isHidden = false;
        } else {
            btn.textContent = 'Show';
            infoEl.style.display = 'none';
            this.isHidden = true;
        }
    }


}

customElements.define('zap-button', CuButton);
