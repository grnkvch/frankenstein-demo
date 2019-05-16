// eslint-disable-next-line
import React from "../../react/node_modules/react";
/* eslint-disable */
import ReactDOM from "../../react/node_modules/react-dom";
import HeaderApp from "../../react/src/components/Header";

class FrankensteinWrapper extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    ReactDOM.render(<HeaderApp />, this.shadowRoot);
  }
}

customElements.define("frankenstein-header-wrapper", FrankensteinWrapper);
