<script lang="ts">
  let {
    title = "Distribution normale",
    description = "Une courbe en cloche symétrique : la plupart des valeurs se regroupent autour de la moyenne, les valeurs extrêmes sont rares.",
    xLabel = "Valeur",
    yLabel = "Fréquence",
  }: {
    title?: string;
    description?: string;
    xLabel?: string;
    yLabel?: string;
  } = $props();

  // Same geometry as PowerLaw so both charts can be overlaid.
  const chart = { left: 88, top: 48, right: 972, bottom: 500 };
  const pointCount = 192;
  const mean = 0.5;
  const deviation = 0.11;

  const path = Array.from({ length: pointCount }, (_, index) => {
    const position = index / (pointCount - 1);
    const value = Math.exp(-((position - mean) ** 2) / (2 * deviation ** 2));
    const x = chart.left + position * (chart.right - chart.left);
    const y = chart.top + (1 - value) * (chart.bottom - chart.top);
    return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ");
</script>

<figure class="gaussian">
  <svg viewBox="0 0 1060 610" role="img">
    <title>{title}</title>
    <desc>{description}</desc>

    <g class="chart-axis" aria-hidden="true">
      <line x1={chart.left} y1={chart.top} x2={chart.left} y2={chart.bottom} />
      <line
        x1={chart.left}
        y1={chart.bottom}
        x2={chart.right}
        y2={chart.bottom}
      />
    </g>

    <path class="distribution-line" d={path} aria-hidden="true" />

    <text class="axis-label" x={chart.left} y={chart.top - 10}>{yLabel}</text>
    <text
      class="axis-label"
      x={chart.right}
      y={chart.bottom + 42}
      text-anchor="end">{xLabel}</text
    >
  </svg>
</figure>

<style>
  .gaussian {
    width: min(100%, 78rem, calc(100cqh * 1060 / 610));
    margin: 1rem auto 0;
    color: var(--text-prominent);
  }

  svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }

  .chart-axis {
    stroke: var(--accent);
    stroke-width: 1;
  }

  .distribution-line {
    fill: none;
    stroke: var(--accent);
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    shape-rendering: geometricPrecision;
    vector-effect: non-scaling-stroke;
  }

  .axis-label {
    fill: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 15px;
    font-weight: 300;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  @media (max-width: 700px) {
    .gaussian {
      margin-top: 0;
    }
  }
</style>
