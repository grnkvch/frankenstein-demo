import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter";

import Vue from "../vue/node_modules/vue";
import VueListing from "../vue/src/Listing.vue";

import '../vue/node_modules/todomvc-app-css/index.css';

const styleOverrides = '.todoapp{margin: 0;box-shadow: none;border: none;';

Vue.config.productionTip = false;

class FrankensteinWrapper extends HTMLElement {
  connectedCallback() {
    // In order to not loose the root styles, coming from index.css
    // we need to set up the wrapping element with .todoapp
    const appWrapper = document.createElement("div");
    appWrapper.classList.add("todoapp");

    const mountPoint = document.createElement("div");
    appWrapper.appendChild(mountPoint);

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
    .forEach(style => {
      this.shadowRoot.prepend(style);
    });

    //
    // 2. Overrides
    //
    const overridesStylesheet = document.createElement("style");
    overridesStylesheet.innerHTML = styleOverrides;
    window.requestAnimationFrame(() => {
      // We do it in the next animation frame for our overrides
      // to go after Alien's bundled styles
      this.shadowRoot.appendChild(overridesStylesheet);
    });

    new Vue({
      shadowRoot: this.shadowRoot,
      render: h => h(VueListing)
    }).$mount(mountPoint);
  }
}

customElements.define("frankenstein-listing-wrapper", FrankensteinWrapper);
