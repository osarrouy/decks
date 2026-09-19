<script lang="ts">
  type Observation = {
    year: number;
    value: number;
  };

  const observations: Observation[] = [
    { year: 2000, value: 5.7517 },
    { year: 2001, value: 5.7287 },
    { year: 2002, value: 5.9329 },
    { year: 2003, value: 6.3894 },
    { year: 2004, value: 6.9815 },
    { year: 2005, value: 7.5913 },
    { year: 2006, value: 8.1539 },
    { year: 2007, value: 8.6782 },
    { year: 2008, value: 9.2106 },
    { year: 2008.75, value: 10.0247 },
    { year: 2009, value: 10.628 },
    { year: 2010, value: 12.2902 },
    { year: 2011, value: 13.9979 },
    { year: 2012, value: 15.2262 },
    { year: 2013, value: 16.4327 },
    { year: 2014, value: 17.316 },
    { year: 2015, value: 18.0806 },
    { year: 2016, value: 18.9009 },
    { year: 2017, value: 19.935 },
    { year: 2018, value: 20.4926 },
    { year: 2019, value: 21.9439 },
    { year: 2020, value: 23.172 },
    { year: 2020.25, value: 23.6869 },
    { year: 2021, value: 27.6783 },
    { year: 2022, value: 29.5619 },
    { year: 2023, value: 31.3512 },
    { year: 2024, value: 33.9901 },
    { year: 2025, value: 36.17 },
    { year: 2026, value: 38.4228 },
    { year: 2026.71, value: 40.0933 },
  ];

  const chart = {
    left: 92,
    right: 1138,
    top: 174,
    bottom: 558,
    firstYear: 2000,
    lastYear: 2026.71,
    maxValue: 45,
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

  const yTicks = [0, 10, 20, 30, 40];
  const xTicks = [2000, 2004, 2008, 2012, 2016, 2020, 2024, 2026];
</script>

<figure aria-labelledby="federal-debt-title federal-debt-description">
  <svg viewBox="0 0 1200 675" role="img">
    <title id="federal-debt-title">
      Évolution de la dette fédérale brute des États-Unis depuis 2000
    </title>
    <desc id="federal-debt-description">
      La dette fédérale brute passe de 5 752 milliards de dollars le 3 janvier
      2000 à 40 093 milliards le 17 septembre 2026. Elle comprend la dette
      détenue par le public et les créances internes aux comptes fédéraux.
    </desc>

    <text class="headline" x="92" y="84">Dette fédérale US</text>
    <text class="metadata" x="92" y="114">
      Dette brute · 3 janvier 2000 — 17 septembre 2026 · série quotidienne
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
      <line x1={x(2008.75)} y1={chart.top} x2={x(2008.75)} y2={chart.bottom} />
      <text
        class="metadata"
        x={x(2008.75)}
        y={chart.top - 12}
        text-anchor="middle"
      >
        2008 · crise financière
      </text>

      <line x1={x(2020.25)} y1={chart.top} x2={x(2020.25)} y2={chart.bottom} />
      <text
        class="metadata"
        x={x(2020.25)}
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
      <circle cx={x(2000)} cy={y(5.7517)} r="4" />
      <text class="number" x={x(2000) + 16} y={y(5.7517) - 22}>5,8</text>
      <text class="date metadata" x={x(2000) + 16} y={y(5.7517) + 28}
        >3 janv. 2000</text
      >
    </g>

    <g class="value end" aria-hidden="true">
      <circle cx={x(2026.71)} cy={y(40.0933)} r="4" />
      <text
        class="number"
        x={x(2026.71) - 18}
        y={y(40.0933) - 22}
        text-anchor="end"
      >
        40,1
      </text>
      <text
        class="date metadata"
        x={x(2026.71) - 18}
        y={y(40.0933) + 2}
        text-anchor="end"
      >
        17 sept. 2026
      </text>
    </g>

    <text class="metadata" x="1138" y="634" text-anchor="end">
      Source · U.S. Department of the Treasury · Fiscal Data
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
