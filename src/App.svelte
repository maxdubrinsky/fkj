<script lang="ts">
  async function getName() {
    const res = await fetch("/api/name");
    const n: { adverb: string; verb: string; noun: string } = await res.json();
    return n;
  }
</script>

<main>
  {#await getName() then name}
    <h1>{name.adverb} {name.verb} {name.noun}</h1>
  {:catch}
    <h1>failure kraken joined</h1>
  {/await}
</main>
