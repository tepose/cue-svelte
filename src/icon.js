module.exports = class Icon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
        <style>
            .icon:before {
              -moz-osx-font-smoothing: grayscale;
              -webkit-font-smoothing: antialiased;
              color: #444444;
              content: "\\e80c";
              font-style: normal;
              font-weight: normal;
              font: 16px "cf";
          }

          .icon.active:before {
              color: #09ab00;
          }
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
};
