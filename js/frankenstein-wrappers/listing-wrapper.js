import Vue from "../../vue/node_modules/vue";
import VueListing from "../../vue/src/Listing.vue";

const styles = [
  require("../../vue/node_modules/todomvc-common/base.css?shadow"),
  require("../../vue/node_modules/todomvc-app-css/index.css?shadow"),
  `.todoapp{margin: 0;box-shadow: none;border: none;}`
];

Vue.config.productionTip = false;

class FrankensteinWrapper extends HTMLElement {
  connectedCallback() {
    const style = document.createElement("style");
    style.innerHTML = styles.join("");
    const mountPoint = document.createElement("div");

    // In order to not loose the root styles, coming from index.css
    // we need to set up the wrapping element with .todoapp
    const appWrapper = document.createElement("div");
    appWrapper.classList.add("todoapp");
    appWrapper.appendChild(mountPoint);

    this.attachShadow({ mode: "open" }).appendChild(style);
    this.shadowRoot.appendChild(appWrapper);

    new Vue({
      shadowRoot: this.shadowRoot,
      render: h => h(VueListing)
    }).$mount(mountPoint);
  }
}

customElements.define("frankenstein-listing-wrapper", FrankensteinWrapper);
