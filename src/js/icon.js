class Icon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // This is a solution for sidePanels, where I need to know if it is on the homeScreen or not,
    // and the sidePanel cueInterface does not provide this information, as far as I can see
    window.homeScreen = !!this.cueInterface.homeScreen;

    const staticPath = "https://localhost:1234/dist";
    this.shadowRoot.innerHTML = `
            <link rel="stylesheet" type="text/css" href="${staticPath}/style.css">
            <span class="icon"></span>
        `;
  }

  // This is just standard icon stuff from the Cue documentation
  connectedCallback() {
    this.activeStateChanged(this.cueInterface.active);
    this.cueInterface.addActiveWatcher((active) => {
      this.activeStateChanged(active);
    });
  }

  activeStateChanged(active) {
    const icon = this.shadowRoot.querySelector(".icon");
    if (active) {
      icon.classList.add("active");
    } else {
      icon.classList.remove("active");
    }
  }
}

customElements.get("svelte-extension-icon") ||
  customElements.define("svelte-extension-icon", Icon);
