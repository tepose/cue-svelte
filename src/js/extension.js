import App from "./App.svelte";

// I made this into a function for when I need several CSS assets
function cssElement(url) {
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.type = "text/css";
  css.href = url;
  return css;
}

export default class SvelteExtension extends cue.core.webcomponents
  .TextEditorMetadataPanel {
  // You can read more about cue.core.webcomponents and extending Cue at:
  // http://docs.escenic.com/cue-user-guide/3.9/the_cue_web_component_api.html

  constructor(props) {
    super(props);
    this.attachShadow({ mode: "open" });

    const staticPath = "https://localhost:1234/dist";
    const css = cssElement(`${staticPath}/style.css`);
    this.shadowRoot.appendChild(css);
  }

  connectedCallback() {
    this.root = document.createElement("div");
    this.shadowRoot.appendChild(this.root);

    // this.app is just to store a reference to the Svelte application, and it's not really needed
    this.app = new App({
      // this.root as target is important so that Svelte is attached at the corrext location in the DOM
      target: this.root,
      props: {
        // "this" refers to the class, so that you have access to i.e. cueInterface
        context: this,
      },
    });
  }

  disconnectedCallback() {
    // I've noticed that Cue sometimes disconnect the extension before connecting it again,
    // so I always remove the DOM element in disconnectedCallback, so that I don't get two
    // extensions for the price of one
    this.shadowRoot.removeChild(this.root);
  }
}

customElements.get("svelte-extension") ||
  customElements.define("svelte-extension", SvelteExtension);
