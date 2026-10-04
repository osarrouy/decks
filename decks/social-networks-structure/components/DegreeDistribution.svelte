<script lang="ts">
  import Gaussian from "@svx-deck/core/components/Gaussian.svelte";
  import PowerLaw from "@svx-deck/core/components/PowerLaw.svelte";
  import { getStepContext } from "@svx-deck/core/deck/stepContext";

  let { powerLawAt = 1 }: { powerLawAt?: number } = $props();

  const step = getStepContext();
  let powerLaw = $derived($step >= powerLawAt);

  const xLabel = "Nombre de relations";
  const yLabel = "Nombre de personnes";
</script>

<!-- Both charts share their axes: only the curve changes between steps. -->
<div class="distributions">
  <div data-visible={!powerLaw} aria-hidden={powerLaw}>
    <Gaussian
      title="Réseau aléatoire : distribution normale des relations"
      description="La plupart des personnes ont un nombre de relations proche de la moyenne ; très peu en ont beaucoup moins ou beaucoup plus."
      {xLabel}
      {yLabel}
    />
  </div>
  <div data-visible={powerLaw} aria-hidden={!powerLaw}>
    <PowerLaw
      concentration="low"
      revealAt={null}
      title="Réseau réel : distribution des relations en loi de puissance"
      description="La plupart des personnes ont peu de relations, tandis qu’une petite minorité, les hubs, en concentre un très grand nombre."
      {xLabel}
      {yLabel}
    />
  </div>
</div>

<style>
  .distributions {
    display: grid;
    width: 100%;
  }

  .distributions > div {
    grid-area: 1 / 1;
    transition: opacity 600ms ease;
  }

  [data-visible="false"] {
    opacity: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .distributions > div {
      transition: none;
    }
  }
</style>
