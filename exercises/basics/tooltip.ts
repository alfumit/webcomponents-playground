class Tooltip extends HTMLElement {
    private _tooltipContainer!: HTMLDivElement;
    private _tooltipIcon!: HTMLSpanElement;
    private _tooltipText: string = 'Slippery bunch';
    private _tooltipVisible = false;

    static get observedAttributes() {
        return ['text']
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot!.innerHTML = `
        <style>
            :host {
            position: relative;
            }
            :host(.important) {
                color: var(--color-primary, #ccc);
            }
            
            :host-context(p) {
                font-weight: bold;
            }
            
            div {
                font-weight: normal;
                background-color: black;
                color: white;
                position: absolute;
                top: 1.5rem;
                left: 1.75em;
                z-index: 10;
                padding: 0.15rem;
                border-radius: 3px;
                box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
                ;
            }
            ::slotted(.warn) {
                border: 6px dashed beige;
            }
            
            .icon {
                background-color: #1f00ff;
                color: white;
                border-radius: 50%;
                border: 1px solid #aaaaaa;
                padding: 0.1em 0.4em;
                margin: .1em;
            }
        </style>
        <slot>I like to code'n KISS</slot><span class="icon">?</span>`;
    }

    connectedCallback() {
        if(this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text')!;
        }

        this._tooltipIcon = this.shadowRoot!.querySelector("span") as HTMLSpanElement;
        this._tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    }

    attributeChangedCallback(name: string, oldValue: string, newValue:string) {
        if(oldValue === newValue) return;
        if(name === "text") {
            this._tooltipText = newValue;
        }
    }

    disconnectedCallback() {
        this._tooltipIcon.removeEventListener("mouseenter", this._showTooltip.bind(this));
        this._tooltipIcon.removeEventListener("mouseleave", this._hideTooltip.bind(this));
    }

    private _showTooltip(_: Event) {
        this._tooltipContainer = document.createElement("div");
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot!.appendChild(this._tooltipContainer);
    }

    private _hideTooltip(_: Event) {
        this.shadowRoot!.removeChild(this._tooltipContainer);
    }

    private _render() {

    }
}

customElements.define('zap-tooltip', Tooltip);
