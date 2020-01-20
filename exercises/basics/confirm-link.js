"use strict";
class ConfirmLink extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener('click', (e) => {
            if (!confirm("Why are you leaving? Please, don't!")) {
                e.preventDefault();
            }
        });
    }
}
customElements.define('zap-confirm-link', ConfirmLink, { extends: 'a' });
