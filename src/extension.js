import { default as App } from "./App.svelte";
import Icon from "./icon";

export default class SvelteExtension extends cue.core.webcomponents
  .TextEditorMetadataPanel {
  // You can read more about cue.core.webcomponents and extending Cue at:
  // http://docs.cuepublishing.com/cue-technical-help/3.15/the_cue_web_component_api.html

  constructor(props) {
    super(props);
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.app = new App({
      target: this.root,
      props: {
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

customElements.get("svelte-extension-icon") ||
  customElements.define("svelte-extension-icon", Icon);
