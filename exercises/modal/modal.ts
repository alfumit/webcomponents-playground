class Modal extends HTMLElement {
    // static get observedAttributes() {
    //     return ['opened'];
    // }

    private _html = `
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

    public isOpened: boolean = false;

    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.isOpened = !!this.getAttribute("opened");
        this._render();
        this.shadowRoot!.querySelector('#cancel')!.addEventListener("click", this.cancelHandler.bind(this));
        this.shadowRoot!.querySelector('#ok')!.addEventListener("click", this.confirmHandler.bind(this));
        this.shadowRoot!.querySelector('#backdrop')!.addEventListener("click", this.cancelHandler.bind(this));

        const slots = this.shadowRoot!.querySelectorAll('slot')!;
        (slots[0] as HTMLSlotElement).addEventListener("slotchange", (e: Event) => {
            console.log(slots[0])
        })
    }

    changeAttributeCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        if (name === "opened") {
            return newValue;
        }
    }

    private _render() {
        this.shadowRoot!.innerHTML = this._html;
    }

    public hide() {
        this.removeAttribute("opened");
        this.isOpened = false;
    }

    private notify(eventType: "cancel" | "ok", el: HTMLElement) {
        const evt = new Event(eventType, {bubbles: true, composed: true});
        el.dispatchEvent(evt);
    }

    private cancelHandler(e: Event): void {
        this.hide();
        this.notify("cancel", e.target as HTMLElement)
    }

    private confirmHandler(e: Event): void {
        this.hide();
        this.notify("ok", e.target as HTMLElement)

    }

}

customElements.define('zap-modal', Modal);
