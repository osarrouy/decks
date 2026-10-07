<script lang="ts">
  import { getStepContext } from "@svx-deck/core/deck/stepContext";
  import { cubicInOut } from "svelte/easing";
  import { prefersReducedMotion, Tween } from "svelte/motion";

  const step = getStepContext();
  const stage = $derived(Math.max(0, Math.min($step, 6)));
  const progress = Tween.of(() => stage, {
    duration: () => (prefersReducedMotion.current ? 0 : 1800),
    easing: cubicInOut,
  });

  // How far the animation has gone past `from`, between 0 and 1.
  const reached = (from: number, span = 1) =>
    Math.max(0, Math.min((progress.current - from) / span, 1));

  // Seeded generator: every view (projector, presenter, export) draws the same cloud.
  function seeded(seed: number) {
    return () => {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const random = seeded(11);
  const gaussian = () =>
    Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());

  // Each person has six dimensions. Along the three readable categories, the
  // cloud is noise; three learned dimensions separate five collective profiles.
  // Turning the cloud from one triple to the other makes groups appear.
  const segments = [
    { code: "SEG_0417", center: [0.62, 0.18, 0.2] },
    { code: "SEG_2093", center: [-0.58, 0.42, -0.2] },
    { code: "SEG_0058", center: [0.08, -0.62, 0.42] },
    { code: "SEG_1736", center: [-0.36, -0.36, -0.58] },
    { code: "SEG_0921", center: [0.2, 0.6, -0.62] },
  ];
  const axes = [
    ["Âge", "DIM_2271"],
    ["Revenu", "DIM_0538"],
    ["Diplôme", "DIM_3310"],
  ];
  const people = Array.from({ length: 320 }, (_, i) => {
    const segment = i % segments.length;
    return {
      segment,
      categories: [0, 0, 0].map(() => gaussian() * 0.42),
      profile: segments[segment].center.map(
        (value) => value + gaussian() * 0.1,
      ),
      // Most of the person's segment has done what the system will predict.
      done: i > 0 && random() < (segment === 0 ? 0.8 : 0.06),
      delay: (i * 53) % 700, // Lights the cloud gradually.
    };
  });

  // The first person is the one whose card dissolves: inside the mass, then at
  // the heart of its segment. Its prediction is the share of its nearest
  // neighbours in the learned dimensions who have acted.
  const you = people[0];
  you.categories = [-0.12, -0.08, 0.18];
  you.profile = segments[0].center.map((value) => value + 0.02);
  const distance = (a: number[], b: number[]) =>
    Math.hypot(...a.map((value, i) => value - b[i]));
  const neighbours = people
    .slice(1)
    .sort(
      (a, b) =>
        distance(a.profile, you.profile) - distance(b.profile, you.profile),
    )
    .slice(0, 10);
  const probability = (
    neighbours.filter((person) => person.done).length / neighbours.length
  )
    .toFixed(2)
    .replace(".", ",");
  // Without segments, every person counts according to their proximity alone.
  const nearness = people.map((person) =>
    Math.exp(-(distance(person.profile, you.profile) ** 2) / 0.72),
  );

  // The card breaks into traces that drift apart, line up as one row of a
  // sparse people × measures table, then fold into a single point.
  let cardWidth = $state(0);
  let cardHeight = $state(0);
  const traces = Array.from({ length: 32 }, () => ({
    start: [random() - 0.5, random() - 0.5],
    scatter: [gaussian(), gaussian(), gaussian()].map((value) => value * 0.35),
    column: 0,
  }));
  const columns = 128;
  const rows = 13; // The row of traces sits in the middle.
  const free = Array.from({ length: columns }, (_, column) => column);
  for (const trace of traces) {
    trace.column = free.splice(Math.floor(random() * free.length), 1)[0];
  }
  const table = Array.from({ length: rows * columns }, (_, i) => ({
    row: Math.floor(i / columns) - (rows - 1) / 2,
    column: i % columns,
    filled: random() < 0.15,
  })).filter((cell) => cell.row !== 0 || free.includes(cell.column));

  let width = $state(1000);
  let height = $state(600);
  const scale = $derived(Math.min(width * 0.34, height * 0.4));
  const pitch = $derived(Math.min(10, (width * 0.85) / columns));
  const slot = (column: number, row = 0) => ({
    x: (column - (columns - 1) / 2) * pitch,
    y: row * pitch,
  });

  // A slow sway gives the cloud its depth without letting groups hide each other.
  let yaw = $state(0.7);
  const pitchAngle = 0.35;
  $effect(() => {
    if (prefersReducedMotion.current) return;
    let frame = requestAnimationFrame(function tick(now) {
      yaw = 0.7 + 0.45 * Math.sin(now * 0.00025);
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  });

  function project([x, y, z]: number[]) {
    const [cosYaw, sinYaw] = [Math.cos(yaw), Math.sin(yaw)];
    const turnedX = x * cosYaw + z * sinYaw;
    const turnedZ = z * cosYaw - x * sinYaw;
    const tiltedY = y * Math.cos(pitchAngle) - turnedZ * Math.sin(pitchAngle);
    const depth = y * Math.sin(pitchAngle) + turnedZ * Math.cos(pitchAngle);
    const perspective = 4 / (4 + depth);
    return {
      x: turnedX * perspective * scale,
      y: -tiltedY * perspective * scale,
      perspective,
      depth,
    };
  }

  // A rotation in the plane of each category and its learned dimension.
  const angle = $derived((reached(3) * Math.PI) / 2);
  const position = (categories: number[], profile: number[]) =>
    categories.map(
      (value, i) => value * Math.cos(angle) + profile[i] * Math.sin(angle),
    );

  const radius = $derived(Math.max(1.6, scale * 0.011));
  const dots = $derived(
    people.map((person) =>
      project(position(person.categories, person.profile)),
    ),
  );
  const self = $derived(dots[0]);
  const axisEnds = $derived(
    axes.map((_, i) => {
      const end = [0, 0, 0];
      end[i] = 1;
      return { from: project(end.map((value) => -value)), to: project(end) };
    }),
  );
  const labels = $derived(
    segments.map((segment) => project(position([0, 0, 0], segment.center))),
  );
  const traceDots = $derived(
    traces.map(({ start, scatter, column }) => {
      const [apart, aligned, together] = [reached(0), reached(1), reached(2)];
      const cloud = project(scatter);
      const cell = slot(column);
      let x = start[0] * cardWidth * (1 - apart) + cloud.x * apart;
      let y = start[1] * cardHeight * (1 - apart) + cloud.y * apart;
      x += (cell.x - x) * aligned;
      y += (cell.y - y) * aligned;
      return {
        x: x + (self.x - x) * together,
        y: y + (self.y - y) * together,
        opacity: Math.min(1, apart * 2) * (1 - reached(2.6, 0.4)),
      };
    }),
  );
  const tableOpacity = $derived(reached(1.3, 0.7) * (1 - reached(2, 0.4)));
</script>

<figure bind:clientWidth={width} bind:clientHeight={height}>
  <svg viewBox="{-width / 2} {-height / 2} {width} {height}" role="img">
    <title>Des traces aux profils</title>
    <desc>
      Une fiche individuelle se défait en traces. Ces traces s’alignent en une
      ligne de mesures, parmi celles d’autres personnes, puis la ligne devient
      un point parmi des centaines d’autres. Selon l’âge, le revenu et le
      diplôme, le nuage reste indistinct ; selon trois dimensions apprises et
      codées, il se divise en groupes. La plupart des voisins du point ont
      accompli une action ; le système lui attribue donc une probabilité de
      l’accomplir à son tour. Enfin, les groupes s’effacent : chaque point se
      colore selon sa seule proximité avec ce point.
    </desc>

    {#if tableOpacity > 0}
      <g class="table" opacity={tableOpacity}>
        {#each table as cell}
          {@const { x, y } = slot(cell.column, cell.row)}
          <circle
            class:filled={cell.row !== 0 && cell.filled}
            cx={x}
            cy={y}
            r={pitch * 0.3}
          />
        {/each}
      </g>
    {/if}

    <g class="axes" opacity={reached(2.3, 0.7)}>
      {#each axisEnds as end, i}
        <line x1={end.from.x} y1={end.from.y} x2={end.to.x} y2={end.to.y} />
        {#each axes[i] as name, version}
          <text
            x={end.to.x + 8}
            y={end.to.y}
            opacity={(version ? reached(3) : 1 - reached(3)) * (1 - reached(4))}
            >{name}</text
          >
        {/each}
      {/each}
    </g>

    {#each people as person, i}
      {#if i > 0}
        <circle
          class="person"
          class:done={stage === 5 && person.done}
          class:near={stage >= 6}
          cx={dots[i].x}
          cy={dots[i].y}
          r={radius * dots[i].perspective}
          opacity={reached(2, 0.8) * (0.85 - dots[i].depth * 0.3)}
          style:--near="{Math.round(nearness[i] * 100)}%"
          style:transition-delay="{prefersReducedMotion.current
            ? 0
            : stage >= 6
              ? (1 - nearness[i]) * 900
              : person.delay}ms"
        />
      {/if}
    {/each}

    <g class="neighbours" opacity={reached(4) * (1 - reached(5)) * 0.7}>
      {#each neighbours as person}
        {@const dot = dots[people.indexOf(person)]}
        <line x1={self.x} y1={self.y} x2={dot.x} y2={dot.y} />
      {/each}
    </g>

    {#each segments as segment, i}
      <text
        class="segment"
        x={labels[i].x + scale * 0.2}
        y={labels[i].y - scale * 0.16}
        opacity={reached(3.5, 0.5) * (1 - reached(5))}>{segment.code}</text
      >
    {/each}

    {#each traceDots as trace}
      <circle
        class="trace"
        cx={trace.x}
        cy={trace.y}
        r={Math.min(radius, pitch * 0.35)}
        opacity={trace.opacity}
      />
    {/each}

    <g opacity={reached(2.6, 0.4)}>
      <circle
        class="you"
        class:done={stage >= 5}
        cx={self.x}
        cy={self.y}
        r={radius * 2.2}
      />
      <text x={self.x + radius * 4} y={self.y - radius * 2}>
        <tspan>U_48213</tspan>
        <tspan
          class="prediction"
          x={self.x + radius * 4}
          dy="1.4em"
          opacity={reached(4)}
        >
          EVT_2291 · P = {probability}
        </tspan>
      </text>
    </g>
  </svg>
  <dl
    class="card"
    bind:clientWidth={cardWidth}
    bind:clientHeight={cardHeight}
    aria-hidden={stage > 0}
    style:opacity={1 - reached(0, 0.6)}
    style:filter="blur({reached(0, 0.6) * 6}px)"
  >
    <dt class="file">Dossier n° 1987-114</dt>
    <dd class="name">Martin, Camille</dd>
    <dt>Classe</dt>
    <dd>3ᵉ B</dd>
    <dt>Conduite</dt>
    <dd>Bonne</dd>
    <dt>Appréciation</dt>
    <dd>Travail régulier. Doit prendre davantage la parole.</dd>
  </dl>
</figure>

<style>
  figure {
    position: relative;
    width: 100%;
    height: 100cqh; /* The slide height, so the scene can fill the surface. */
    margin: 0;
  }

  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  text {
    fill: var(--text-muted);
    font-family: var(--font-mono);
    font-size: var(--metadata-font-size);
    text-transform: uppercase;
    dominant-baseline: middle;
    paint-order: stroke; /* A halo keeps labels legible over the dots. */
    stroke: var(--background);
    stroke-width: 4px;
    stroke-linejoin: round;
  }

  .axes line {
    stroke: var(--border-prominent);
    stroke-width: 1;
  }

  .neighbours line {
    stroke: var(--accent);
    stroke-width: 1;
  }

  .person {
    fill: var(--text-muted);
    transition: fill 600ms ease;
  }

  .trace {
    fill: var(--text-prominent);
  }

  .table circle {
    fill: var(--border);
  }

  .table circle.filled {
    fill: var(--text-muted);
    opacity: 0.5; /* Other people's rows stay behind the traces. */
  }

  .you {
    fill: var(--background);
    stroke: var(--text-prominent);
    stroke-width: 1.5;
    transition: fill 600ms ease 400ms;
  }

  .person.done,
  .you.done {
    fill: var(--accent);
  }

  .person.near {
    fill: color-mix(in srgb, var(--accent) var(--near), var(--text-muted));
  }

  .you + text {
    fill: var(--text-prominent);
  }

  .prediction {
    fill: var(--accent);
  }

  .card {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: var(--space-3) var(--space-5);
    width: min(32rem, 90%);
    margin: 0;
    padding: var(--space-5);
    border: 1px solid var(--border-prominent);
    background: var(--background);
    pointer-events: none;
  }

  dt {
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: var(--metadata-font-size);
    text-transform: uppercase;
    align-self: baseline;
  }

  dd {
    margin: 0;
    color: var(--text-prominent);
  }

  .file {
    grid-column: 1 / -1;
  }

  .name {
    grid-column: 1 / -1;
    padding-bottom: var(--space-3);
    border-bottom: 1px solid var(--border);
    font-family: var(--font-serif);
    font-size: var(--heading-3-size);
  }

  @media (prefers-reduced-motion: reduce) {
    .person,
    .you {
      transition: none;
    }
  }
</style>
