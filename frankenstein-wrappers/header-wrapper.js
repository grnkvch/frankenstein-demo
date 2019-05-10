import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter";

import Vue from "../vue/node_modules/vue";
import VueHeader from "../vue/src/Header.vue";

Vue.config.productionTip = false;

class FrankensteinWrapper extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement("div");
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);
    new Vue({
      render: h => h(VueHeader)
    }).$mount(mountPoint);
  }
}

customElements.define("frankenstein-header-wrapper", FrankensteinWrapper);
