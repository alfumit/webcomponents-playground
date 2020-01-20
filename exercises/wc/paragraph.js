"use strict";
class Para extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style>
            #info-box {
                display: none;
            }
        </style>
        <p id="info-box"><slot></slot></p>`;
    }
}
customElements.define('zap-para', Para);
