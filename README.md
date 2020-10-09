# Minimal Svelte component for Cue

To get started:
```
npm i
npm run start
```

Files can be found at `localhost:1234/dist/extension.js`, `localhost:1234/dist/icon.js` and `localhost:1234/dist/style.css`.

This project uses WebPack to bundle files, but Rollup is also an option. The reason for using WebPack, you ask? That's what we started with during development, and it has served our needs sufficiently.

In this project, CSS is not in .svelte files, but hosted as resources. This is a workaround as I did not get the CSS-in-Svelte to work, but please get back to me if you do at thor.bredesen@amedia.com!