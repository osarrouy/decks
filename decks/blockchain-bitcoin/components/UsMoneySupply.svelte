<script lang="ts">
  type Observation = {
    year: number;
    value: number;
  };

  const observations: Observation[] = [
    { year: 2000, value: 4.6661 },
    { year: 2001, value: 4.9768 },
    { year: 2002, value: 5.4596 },
    { year: 2003, value: 5.8111 },
    { year: 2004, value: 6.0813 },
    { year: 2005, value: 6.4299 },
    { year: 2006, value: 6.7284 },
    { year: 2007, value: 7.1156 },
    { year: 2008, value: 7.5136 },
    { year: 2009, value: 8.2842 },
    { year: 2010, value: 8.4731 },
    { year: 2011, value: 8.8445 },
    { year: 2012, value: 9.7533 },
    { year: 2013, value: 10.5023 },
    { year: 2014, value: 11.1275 },
    { year: 2015, value: 11.8062 },
    { year: 2016, value: 12.5222 },
    { year: 2017, value: 13.3189 },
    { year: 2018, value: 13.9024 },
    { year: 2019, value: 14.4602 },
    { year: 2020, value: 15.425 },
    { year: 2020.17, value: 16.0344 },
    { year: 2020.42, value: 18.18 },
    { year: 2021, value: 19.3753 },
    { year: 2022, value: 21.6474 },
    { year: 2022.25, value: 21.7684 },
    { year: 2023, value: 21.274 },
    { year: 2023.25, value: 20.7584 },
    { year: 2024, value: 20.8355 },
    { year: 2025, value: 21.5393 },
    { year: 2026, value: 22.4134 },
    { year: 2026.5, value: 23.218 },
  ];

  const chart = {
    left: 92,
    right: 1138,
    top: 174,
    bottom: 558,
    firstYear: 2000,
    lastYear: 2026.5,
    maxValue: 25,
  };

  const x = (year: number) =>
    chart.left +
    ((year - chart.firstYear) / (chart.lastYear - chart.firstYear)) *
      (chart.right - chart.left);
  const y = (value: number) =>
    chart.bottom - (value / chart.maxValue) * (chart.bottom - chart.top);

  const line = observations
    .map(
      ({ year, value }, index) =>
        `${index === 0 ? "M" : "L"}${x(year).toFixed(1)} ${y(value).toFixed(1)}`,
    )
    .join(" ");
  const area = `${line} L${chart.right} ${chart.bottom} L${chart.left} ${chart.bottom} Z`;

  const yTicks = [0, 5, 10, 15, 20, 25];
  const xTicks = [2000, 2004, 2008, 2012, 2016, 2020, 2024, 2026];
</script>

<figure aria-labelledby="money-supply-title money-supply-description">
  <svg viewBox="0 0 1200 675" role="img">
    <title id="money-supply-title">
      Évolution de la masse monétaire M2 aux États-Unis depuis 2000
    </title>
    <desc id="money-supply-description">
      La masse monétaire M2 désaisonnalisée passe de 4 666 milliards de dollars
      en janvier 2000 à 23 218 milliards en juillet 2026. Sa hausse la plus
      rapide se produit en 2020 et 2021.
    </desc>

    <text class="headline" x="92" y="84">Masse monétaire US</text>
    <text class="metadata" x="92" y="114">
      M2 · janvier 2000 — juillet 2026 · série mensuelle désaisonnalisée
    </text>
    <text class="metadata" x="92" y="136">
      Milliers de milliards de dollars courants
    </text>

    <g class="grid" aria-hidden="true">
      {#each yTicks as tick}
        <line x1={chart.left} y1={y(tick)} x2={chart.right} y2={y(tick)} />
        <text x={chart.left - 18} y={y(tick) + 5} text-anchor="end">
          {tick}
        </text>
      {/each}
    </g>

    <g class="events" aria-hidden="true">
      <line x1={x(2008.67)} y1={chart.top} x2={x(2008.67)} y2={chart.bottom} />
      <text
        class="metadata"
        x={x(2008.67)}
        y={chart.top - 12}
        text-anchor="middle"
      >
        2008 · crise financière
      </text>

      <line x1={x(2020.17)} y1={chart.top} x2={x(2020.17)} y2={chart.bottom} />
      <text
        class="metadata"
        x={x(2020.17)}
        y={chart.top - 12}
        text-anchor="middle"
      >
        2020 · pandémie
      </text>
    </g>

    <path class="area" d={area} aria-hidden="true" />
    <path class="line" d={line} pathLength="1" aria-hidden="true" />

    <g class="axis" aria-hidden="true">
      <line
        x1={chart.left}
        y1={chart.bottom}
        x2={chart.right}
        y2={chart.bottom}
      />
      {#each xTicks as tick}
        <line
          x1={x(tick)}
          y1={chart.bottom}
          x2={x(tick)}
          y2={chart.bottom + 8}
        />
        <text x={x(tick)} y={chart.bottom + 32} text-anchor="middle">
          {tick}
        </text>
      {/each}
    </g>

    <g class="value start" aria-hidden="true">
      <circle cx={x(2000)} cy={y(4.6661)} r="4" />
      <text class="number" x={x(2000) + 16} y={y(4.6661) - 22}>4,7</text>
      <text class="date metadata" x={x(2000) + 16} y={y(4.6661) + 28}
        >Janv. 2000</text
      >
    </g>

    <g class="value end" aria-hidden="true">
      <circle cx={x(2026.5)} cy={y(23.218)} r="4" />
      <text
        class="number"
        x={x(2026.5) - 18}
        y={y(23.218) - 22}
        text-anchor="end"
      >
        23,2
      </text>
      <text
        class="date metadata"
        x={x(2026.5) - 18}
        y={y(23.218) + 2}
        text-anchor="end"
      >
        Juil. 2026
      </text>
    </g>

    <text class="metadata" x="1138" y="634" text-anchor="end">
      Source · Board of Governors of the Federal Reserve System · H.6 via FRED
    </text>
  </svg>
</figure>

<style>
  figure {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    background: var(--background);
    color: var(--text-primary);
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: var(--ui-weight);
    letter-spacing: var(--ui-letter-spacing);
  }

  text {
    fill: var(--text-muted);
  }

  .headline {
    fill: var(--text-prominent);
    font-family: var(--font-serif);
    font-size: 48px;
    font-weight: var(--heading-weight);
    letter-spacing: var(--heading-letter-spacing);
  }

  .grid line {
    stroke: var(--border-subtle);
    stroke-dasharray: 3 8;
    stroke-width: var(--border-width);
  }

  .axis line {
    stroke: var(--border-prominent);
    stroke-width: var(--border-width);
  }

  .area {
    fill: var(--accent-subtle);
    opacity: 0;
    animation: reveal 520ms ease 1.45s forwards;
  }

  .line {
    fill: none;
    stroke: var(--accent);
    /* Dash lengths must scale with the path for a complete reveal at every size. */
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.5;
    animation: draw 1.8s cubic-bezier(0.3, 0.7, 0.2, 1) 120ms forwards;
  }

  .events line {
    stroke: var(--border-prominent);
    stroke-dasharray: 2 7;
    stroke-width: var(--border-width);
  }

  .events text {
    fill: var(--text-secondary);
  }

  .events {
    opacity: 0;
    animation: reveal 360ms ease 1.35s forwards;
  }

  .value {
    opacity: 0;
  }

  .value.start {
    animation: reveal 300ms ease 180ms forwards;
  }

  .value.end {
    animation: reveal 300ms ease 1.75s forwards;
  }

  .value circle {
    fill: var(--background);
    stroke: var(--accent);
    stroke-width: 1.5;
  }

  .number {
    fill: var(--accent);
    font-family: var(--font-serif);
    font-size: 36px;
    font-weight: var(--heading-weight);
    letter-spacing: var(--heading-letter-spacing);
  }

  .date {
    fill: var(--text-primary);
  }

  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes reveal {
    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .area,
    .events,
    .value.start,
    .value.end {
      opacity: 1;
      animation: none;
    }

    .line {
      stroke-dashoffset: 0;
      animation: none;
    }
  }
</style>
