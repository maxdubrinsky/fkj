<script lang="ts">
  async function getName() {
    const res = await fetch("/api/name");
    const { parts }: { parts: string[] } = await res.json();
    return parts;
  }

  function copy() {
    const el = document.querySelector("#name") as HTMLInputElement;

    el.select();

    console.log(el.value)

    document.execCommand("copy");
  }
</script>

<main>
  {#await getName()}
    <div />
  {:then parts}
    <h1>
      {parts.join(" ")}
      <input id="name" type="text" value={parts.join("-")} />
      <button id="copy" on:click={copy}>
        <i class="ri-clipboard-line" />
      </button>
    </h1>
  {:catch}
    <h1>failure kraken joined</h1>
  {/await}
  <footer>
    <a target="_blank" href="https://github.com/maxdubrinsky">
      <i class="ri-github-fill" />
    </a>
  </footer>
</main>

<style>
  main {
    display: grid;
    align-items: center;
    grid-template-rows: 1fr auto;
    text-align: center;
    font-family: "Oxygen", sans-serif;
    min-height: 100vh;
    color: var(--dark-color);
    background-color: var(--light-color);
  }

  @media (prefers-color-scheme: dark) {
    main {
      background-color: var(--dark-color);
      color: var(--light-color);
    }
  }

  h1 {
    display: block;
    font-size: 45px;
    font-weight: 300;
    text-transform: capitalize;
  }

  #name {
    position: absolute;
    opacity: 0;
    top:-100px;
  }

  #copy {
    visibility: hidden;
    display: block;
    margin: 0 auto;
    background: none;
    border: none;
    color: currentColor;
    font-size: 20px;
    cursor: pointer;
  }

  h1:hover #copy {
    visibility: visible;
  }

  footer {
    display: flex;
    justify-content: center;
  }

  a {
    color: inherit;
    text-decoration: none;
    font-size: 40px;
  }
</style>
