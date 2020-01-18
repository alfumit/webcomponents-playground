"use strict";
class CuButton extends HTMLElement {
    constructor(isHidden = true, text) {
        super();
        this.isHidden = isHidden;
        this.text = text;
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        this.text = this.getAttribute('text');
        this.shadowRoot.innerHTML = `
        <button>${this.text}</button>`;
        this.addEventListener('click', this.buttonHandler.bind(this));
    }
    buttonHandler(e) {
        const infoEl = document.querySelector('zap-para').shadowRoot.querySelector("p");
        const btn = this.shadowRoot.querySelector("button");
        if (this.isHidden) {
            btn.textContent = 'Hide';
            infoEl.style.display = 'block';
            this.isHidden = false;
        }
        else {
            btn.textContent = 'Show';
            infoEl.style.display = 'none';
            this.isHidden = true;
        }
    }
}
customElements.define('zap-button', CuButton);
