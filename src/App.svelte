<script>
    export let context;
</script>

<h1>Welcome to Svelte, {context.user.realName}</h1>

<style>
    :root {
        box-sizing: border-box;
        margin: 0;
        display: block;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    h1 {
        color: rebeccapurple;
    }
</style>
