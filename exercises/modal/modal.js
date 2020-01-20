"use strict";
class Modal extends HTMLElement {
    constructor() {
        super();
        // static get observedAttributes() {
        //     return ['opened'];
        // }
        this._html = `
            <style>
                :host {
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity .3s ease-in-out;
                }
                
                 :host([opened]) {
                    opacity: 1;
                    pointer-events: all;
                }
                
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0,0,0,.75);
                }
                #modal {
                    position: fixed;
                    top: 15vh;
                    left: 25%;
                    width: 50%;
                    right: 25%;
                    z-index: 10;
                    background: white;
                    box-shadow: 0 2px 8px rgba(0,0,0, .26);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                
                header {
                    padding: 1rem;
                    border-bottom: 1px solid #ccc;

                }
                
                ::slotted(h1) {
                    font-size: 2.5rem;
                    margin: 0;
                }
                
                #main {
                    padding: 1rem;
                }
                #actions {
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                }
                
                #actions button {
                    margin: 0 .25rem;
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <slot name="title">
                        <h1> Please confirm</h1>                    
                    </slot>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <section id="actions">
                    <button id="cancel">Cancel</button>
                    <button id="ok">Okay</button>
                </section>
            </div>  
        `;
        this.isOpened = false;
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        this.isOpened = !!this.getAttribute("opened");
        this._render();
        this.shadowRoot.querySelector('#cancel').addEventListener("click", this.cancelHandler.bind(this));
        this.shadowRoot.querySelector('#ok').addEventListener("click", this.confirmHandler.bind(this));
        this.shadowRoot.querySelector('#backdrop').addEventListener("click", this.cancelHandler.bind(this));
        const slots = this.shadowRoot.querySelectorAll('slot');
        slots[0].addEventListener("slotchange", (e) => {
            console.log(slots[0]);
        });
    }
    changeAttributeCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        if (name === "opened") {
            return newValue;
        }
    }
    _render() {
        this.shadowRoot.innerHTML = this._html;
    }
    hide() {
        this.removeAttribute("opened");
        this.isOpened = false;
    }
    notify(eventType, el) {
        const evt = new Event(eventType, { bubbles: true, composed: true });
        el.dispatchEvent(evt);
    }
    cancelHandler(e) {
        this.hide();
        this.notify("cancel", e.target);
    }
    confirmHandler(e) {
        this.hide();
        this.notify("ok", e.target);
    }
}
customElements.define('zap-modal', Modal);
