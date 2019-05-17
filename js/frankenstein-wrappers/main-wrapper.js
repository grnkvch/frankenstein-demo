// eslint-disable-next-line
import React from "../../react/node_modules/react";
/* eslint-disable */
import ReactDOM from "../../react/node_modules/react-dom";
import MainApp from "../../react/src/components/MainSection";

const styles = [
  require("../../react/node_modules/todomvc-app-css/index.css?shadow"),
  require('../../react/src/styles.css?shadow'),
  `.todoapp{ margin:0; }`
];

class FrankensteinWrapper extends HTMLElement {
  connectedCallback() {
    const style = document.createElement("style");
    style.innerHTML = styles.join('');

    // In order to not loose the root styles, coming from index.css
    // we need to set up the wrapping element with .todoapp
    const appWrapper = document.createElement("div");
    appWrapper.classList.add('todoapp');

    this.attachShadow({ mode: "open" }).appendChild(style);
    this.shadowRoot.appendChild(appWrapper);

    ReactDOM.render(<MainApp root={ appWrapper } />, appWrapper);
  }
}

customElements.define("frankenstein-main-wrapper", FrankensteinWrapper);
