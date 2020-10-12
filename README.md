# Minimal Svelte component for Cue

To get started:
```
$ npm i
$ npm run start
```

Files can be found at `localhost:1234/extension.js` and `localhost:1234/style.css`.

To include it in Cue, you would add this to your config:

```
editors:
  metadata:
    - name: "Svelte extension"
      directive: "svelte-extension"
      cssClass: "svelte-extension"
      title: "Svelte extension"
      webComponent:
        modulePath: "http://localhost:1234/extension.js"
        icon: "svelte-extension-icon"
      mimeTypes: ["x-ece/story"]
      order: 728
```

Note that to include Svelte components into a custom component, with this configuration, you need to import it this way:

```
import { default as App } from "./App.svelte";
```

If you know how to avoid having to write `{ default as App }`, let me know!

This project uses webpack to bundle files, but Rollup is also an option. The reason for using webpack, you ask? That's what we started with during development, and it has served our needs sufficiently.

In this project, CSS is not in .svelte files, but hosted as resources. This is a workaround as I did not get the CSS-in-Svelte to work, but please get back to me if you do at thor.bredesen@amedia.com!

