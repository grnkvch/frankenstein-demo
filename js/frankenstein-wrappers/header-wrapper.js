import Vue from "../../vue/node_modules/vue";
import VueHeader from "../../vue/src/Header.vue";

Vue.config.productionTip = false;

class FrankensteinWrapper extends HTMLElement {
  connectedCallback() {
    const appWrapper = document.createElement("div");
    appWrapper.classList.add("todoapp");

    const mountPoint = document.createElement("div");
    appWrapper.appendChild(mountPoint);

    this.attachShadow({ mode: "open" }).appendChild(appWrapper);
    new Vue({
      shadowRoot: this.shadowRoot,
      render: h => h(VueHeader)
    }).$mount(mountPoint);
  }
}

customElements.define("frankenstein-header-wrapper", FrankensteinWrapper);
