import retargetEvents from "./react-event-retargeting";

// eslint-disable-next-line
import React from "../../react/node_modules/react";
/* eslint-disable */
import ReactDOM from "../../react/node_modules/react-dom";
import HeaderApp from "../../react/src/components/Header";
import { StyleSheetManager } from "../../react/node_modules/styled-components";

const styleOverrides = '.todoapp{ margin:0; }';

class FrankensteinWrapper extends HTMLElement {
  connectedCallback() {
    // In order to not loose the root styles, coming from index.css
    // we need to set up the wrapping element with .todoapp
    const appWrapper = document.createElement("div");
    appWrapper.classList.add("todoapp");

    this.attachShadow({ mode: "open" }).appendChild(appWrapper);


    // PULLING IN GLOBAL STYLES AND OVERRIDES:
    //
    // 1. Global Styles
    //
    // If there are <style> elements in our component waiting to be consumed
    // by our wrapper, pull those into the Shadow DOM in *reversed* order
    // to preserve the original order of the stylesheets
    Array.prototype.slice
      .call(this.querySelectorAll("style"))
      .reverse()
      .forEach(style => {
        this.shadowRoot.appendChild(style);
      });

    //
    // 2. Overrides
    //
    const overridesStylesheet =  document.createElement("style");
    overridesStylesheet.innerHTML = styleOverrides;
    this.shadowRoot.appendChild(overridesStylesheet);

    const target = this.shadowRoot;
    ReactDOM.render(
      <StyleSheetManager target={target}>
        <HeaderApp />
      </StyleSheetManager>,
      appWrapper
    );
    retargetEvents(this.shadowRoot);
  }
}

customElements.define("frankenstein-header-wrapper", FrankensteinWrapper);
