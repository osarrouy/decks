<script lang="ts">
  import { getStepContext } from "@svx-deck/core/deck/stepContext";

  type Stage = "build" | "communities" | "hubs" | "bridging";
  type Kind = "bond" | "ring" | "shortcut" | "hub" | "random";
  type Node = { x: number; y: number; community: number; time: number };
  type Link = { source: number; target: number; kind: Kind; time: number };
  type Network = { nodes: Node[]; links: Link[]; events: number };

  // `type` picks the model. For the hub network, `stage` picks how the shared
  // network is read on a given slide; its steps come from the slide.
  let { type = "hub", stage = "build" }: { type?: "hub" | "random"; stage?: Stage } = $props();

  const step = getStepContext();
  const width = 1000;
  const height = 600;
  const padding = 24;
  const recentEvents = 8;
  const communityCount = 6;
  const communitySize = 12;
  const hubCount = 3;

  // Seeded generator: every view (projector, presenter, export) draws the same network.
  function seeded(seed: number) {
    return () => {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Fruchterman–Reingold layout, scaled to the view box.
  // Math.sqrt is correctly rounded everywhere, so every browser computes the same layout.
  function layout(nodeCount: number, links: Link[], seed: number) {
    const random = seeded(seed);
    const points = Array.from({ length: nodeCount }, () => ({ x: random() * width, y: random() * height }));
    const k = Math.sqrt((width * height) / nodeCount) * 0.6;
    const iterations = 300;
    const gravity = 1.2;

    for (let iteration = 0; iteration < iterations; iteration++) {
      const temperature = (width / 10) * (1 - iteration / iterations);
      const moves = points.map(() => ({ x: 0, y: 0 }));

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 0.01);
          const force = (k * k) / distance / distance;
          moves[i].x += dx * force;
          moves[i].y += dy * force;
          moves[j].x -= dx * force;
          moves[j].y -= dy * force;
        }
      }
      for (const { source, target } of links) {
        const dx = points[source].x - points[target].x;
        const dy = points[source].y - points[target].y;
        const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 0.01);
        const force = distance / k;
        moves[source].x -= dx * force;
        moves[source].y -= dy * force;
        moves[target].x += dx * force;
        moves[target].y += dy * force;
      }
      points.forEach((point, index) => {
        // Gravity keeps isolated nodes inside the frame.
        const move = moves[index];
        move.x += (width / 2 - point.x) * gravity;
        move.y += (height / 2 - point.y) * gravity;
        const length = Math.max(Math.sqrt(move.x * move.x + move.y * move.y), 0.01);
        point.x += (move.x / length) * Math.min(length, temperature);
        point.y += (move.y / length) * Math.min(length, temperature);
      });
    }

    const xs = points.map((point) => point.x);
    const ys = points.map((point) => point.y);
    const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    // Positions stretch independently to fill the frame; circles keep their shape.
    return points.map((point) => ({
      x: padding + ((point.x - minX) / (maxX - minX)) * (width - 2 * padding),
      y: padding + ((point.y - minY) / (maxY - minY)) * (height - 2 * padding),
    }));
  }

  // Erdős: everyone is there from the start; ties form between random pairs.
  function randomNetwork(nodeCount: number, linkCount: number, seed: number): Network {
    const random = seeded(seed);
    const keys = new Set<string>();
    const links: Link[] = [];
    while (links.length < linkCount) {
      const source = Math.floor(random() * nodeCount);
      const target = Math.floor(random() * nodeCount);
      const key = source < target ? `${source}-${target}` : `${target}-${source}`;
      if (source === target || keys.has(key)) continue;
      keys.add(key);
      links.push({ source, target, kind: "random", time: links.length });
    }
    const nodes = layout(nodeCount, links, seed).map((point) => ({ ...point, community: -1, time: -1 }));
    return { nodes, links, events: links.length };
  }

  // Dense communities on a ring, each tied to its neighbours (Watts), then a few
  // shortcuts between distant communities, then hubs (Barabási) that reach into
  // several communities and know each other.
  function hubNetwork(): Network {
    const random = seeded(7);
    const nodes: Node[] = [];
    const links: Link[] = [];
    const keys = new Set<string>();
    let time = 0;

    function link(source: number, target: number, kind: Kind) {
      const key = source < target ? `${source}-${target}` : `${target}-${source}`;
      if (source === target || keys.has(key)) return;
      keys.add(key);
      links.push({ source, target, kind, time: time++ });
    }
    const nearest = (community: number, x: number, y: number, count = 1) =>
      nodes
        .map((node, index) => ({ ...node, index }))
        .filter((node) => node.community === community)
        .sort((a, b) => (a.x - x) ** 2 + (a.y - y) ** 2 - ((b.x - x) ** 2 + (b.y - y) ** 2))
        .slice(0, count)
        .map((node) => node.index);
    const centres = Array.from({ length: communityCount }, (_, community) => {
      const angle = -Math.PI / 2 + (community * 2 * Math.PI) / communityCount;
      return { x: width / 2 + 380 * Math.cos(angle), y: height / 2 + 215 * Math.sin(angle) };
    });

    centres.forEach((centre, community) => {
      const first = nodes.length;
      for (let i = 0; i < communitySize; i++) {
        // A sunflower spiral spreads members evenly inside the community disc.
        const radius = 72 * Math.sqrt((i + 0.5) / communitySize);
        const angle = i * 2.39996 + random() * 0.4;
        nodes.push({
          x: centre.x + radius * Math.cos(angle),
          y: centre.y + radius * Math.sin(angle),
          community,
          time: time++,
        });
        if (i > 0) link(first + i, first + Math.floor(random() * i), "bond");
        for (let j = 0; j < i; j++) if (random() < 0.22) link(first + i, first + j, "bond");
      }
    });

    centres.forEach((centre, community) => {
      const next = (community + 1) % communityCount;
      const [source] = nearest(community, centres[next].x, centres[next].y);
      const [target] = nearest(next, centre.x, centre.y);
      link(source, target, "ring");
    });

    for (const [from, to] of [
      [0, 2],
      [1, 4],
      [3, 5],
    ]) {
      const [source] = nearest(from, centres[to].x, centres[to].y);
      const [target] = nearest(to, centres[from].x, centres[from].y);
      link(source, target, "shortcut");
    }

    const hubs = Array.from({ length: hubCount }, (_, hub) => {
      const angle = -Math.PI / 2 + (hub * 2 * Math.PI) / hubCount;
      nodes.push({
        x: width / 2 + 70 * Math.cos(angle),
        y: height / 2 + 55 * Math.sin(angle),
        community: -1,
        time: time++,
      });
      return nodes.length - 1;
    });
    hubs.forEach((hub, index) => {
      for (let offset = 0; offset < 4; offset++) {
        const community = (2 * index + offset) % communityCount;
        for (const member of nearest(community, nodes[hub].x, nodes[hub].y, 3)) link(hub, member, "hub");
      }
      hubs.slice(index + 1).forEach((other) => link(hub, other, "hub"));
    });

    return { nodes, links, events: time };
  }

  function distances(nodeCount: number, links: Link[], from: number) {
    const neighbours: number[][] = Array.from({ length: nodeCount }, () => []);
    for (const { source, target } of links) {
      neighbours[source].push(target);
      neighbours[target].push(source);
    }
    const previous = Array(nodeCount).fill(-1);
    const distance = Array(nodeCount).fill(Infinity);
    distance[from] = 0;
    const queue = [from];
    for (let head = 0; head < queue.length; head++) {
      for (const next of neighbours[queue[head]]) {
        if (distance[next] === Infinity) {
          distance[next] = distance[queue[head]] + 1;
          previous[next] = queue[head];
          queue.push(next);
        }
      }
    }
    return { distance, previous };
  }

  function path(nodeCount: number, links: Link[], from: number, to: number) {
    const { previous } = distances(nodeCount, links, from);
    const route = [to];
    while (route[0] !== from && previous[route[0]] !== -1) route.unshift(previous[route[0]]);
    return route[0] === from ? route : [];
  }

  // Two people almost as far apart as possible in the network, chosen far apart
  // on screen too, so that the route visibly crosses the network.
  function farthest(network: Network, links: Link[]) {
    const count = network.nodes.length;
    const all = Array.from({ length: count }, (_, from) => distances(count, links, from).distance);
    let longest = 0;
    for (const row of all) for (const length of row) if (length !== Infinity && length > longest) longest = length;
    let best = { from: 0, to: 0, gap: -1 };
    all.forEach((row, from) =>
      row.forEach((length, to) => {
        const { x: x1, y: y1 } = network.nodes[from];
        const { x: x2, y: y2 } = network.nodes[to];
        const gap = (x1 - x2) ** 2 + (y1 - y2) ** 2;
        if (length !== Infinity && length >= longest - 1 && gap > best.gap) best = { from, to, gap };
      }),
    );
    return best;
  }

  const small = randomNetwork(90, 177, 11);
  const shared = hubNetwork();
  // Two people at opposite ends of the ring of communities, as far apart as possible.
  const [personA, personB] = (() => {
    const ringLinks = shared.links.filter((link) => link.kind === "bond" || link.kind === "ring");
    let best = [0, 0, -1];
    shared.nodes.forEach((node, a) => {
      if (node.community !== 0) return;
      distances(shared.nodes.length, ringLinks, a).distance.forEach((length, b) => {
        if (shared.nodes[b].community === communityCount / 2 && length > best[2]) best = [a, b, length];
      });
    });
    return best;
  })();

  let grown = $derived(type === "random" && $step >= 3);
  let network = $derived(type === "hub" ? shared : grown ? randomNetwork(400, 800, 13) : small);
  let animated = $derived(type === "random" || stage === "build");
  let shown = $state(0);
  let built = $derived(shown >= network.events);

  $effect(() => {
    const events = network.events;
    if (!animated || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      shown = events;
      return;
    }
    shown = 0;
    const duration = grown ? 4000 : 9000;
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      shown = Math.min(events, Math.floor(((now - start) / duration) * events));
      if (shown < events) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  });

  // Which links exist on this slide and step.
  let kinds = $derived.by((): Kind[] => {
    if (type === "random") return ["random"];
    if (stage === "communities")
      return $step >= communityCount + 2 ? ["bond", "ring", "shortcut"] : ["bond", "ring"];
    if (stage === "hubs" && $step < 1) return ["bond", "ring", "shortcut"];
    return ["bond", "ring", "shortcut", "hub"];
  });
  let links = $derived(network.links.filter((link) => kinds.includes(link.kind) && link.time < shown));
  let visible = $derived(
    network.nodes.map((node) => node.time < shown && (node.community >= 0 || kinds.includes("hub") || type === "random")),
  );
  let degrees = $derived.by(() => {
    const degrees = Array(network.nodes.length).fill(0);
    for (const { source, target } of links) {
      degrees[source]++;
      degrees[target]++;
    }
    return degrees;
  });

  // What the slide highlights in pink at this step, and the counter below it.
  // `nodes` are filled; `passing` nodes are the intermediaries of a route, outlined.
  let highlight = $derived.by(() => {
    const none = { nodes: new Set<number>(), passing: new Set<number>(), links: new Set<Link>(), label: "" };
    const count = network.nodes.length;
    const hubs = new Set(network.nodes.flatMap((node, index) => (node.community < 0 && type === "hub" ? [index] : [])));
    const route = (from: number, to: number) => {
      const nodes = path(count, links, from, to);
      const steps = new Set(nodes.slice(1).map((node, index) => `${nodes[index]}-${node}`));
      const intermediaries = nodes.length - 2;
      return {
        nodes: new Set([from, to]),
        passing: new Set(nodes.slice(1, -1)),
        links: new Set(
          links.filter(({ source, target }) => steps.has(`${source}-${target}`) || steps.has(`${target}-${source}`)),
        ),
        label: `${intermediaries} intermédiaire${intermediaries > 1 ? "s" : ""}`,
      };
    };

    if (type === "random") {
      if ($step < 1 || !built) return none;
      const { from, to } = farthest(network, links);
      if ($step < 2) return { ...none, nodes: new Set([from, to]), label: `${count} personnes` };
      const found = route(from, to);
      return { ...found, label: `${count} personnes · ${found.label}` };
    }
    if (stage === "communities") {
      if ($step >= 1 && $step <= communityCount) {
        const community = $step - 1;
        return {
          ...none,
          nodes: new Set(network.nodes.flatMap((node, index) => (node.community === community ? [index] : []))),
          links: new Set(links.filter((link) => link.kind === "bond" && network.nodes[link.source].community === community)),
        };
      }
      if ($step === communityCount + 1) return route(personA, personB);
      if ($step >= communityCount + 2) {
        const found = route(personA, personB);
        for (const link of links) if (link.kind === "shortcut") found.links.add(link);
        return found;
      }
      return none;
    }
    if (stage === "hubs") {
      if ($step === 1) return { ...none, nodes: hubs, links: new Set(links.filter((link) => link.kind === "hub")) };
      return route(personA, personB);
    }
    if (stage === "bridging") {
      if ($step === 1) return { ...none, links: new Set(links.filter((link) => link.kind === "bond")), label: "Bonding" };
      if ($step >= 2)
        return { ...none, nodes: hubs, links: new Set(links.filter((link) => link.kind !== "bond")), label: "Bridging" };
    }
    return none;
  });

  let description = $derived(
    type === "random"
      ? "Réseau aléatoire : les liens se nouent au hasard entre les personnes. Chacune a à peu près le même nombre de relations."
      : "Réseau en petits mondes : des communautés denses, reliées entre elles par quelques raccourcis et par des hubs qui touchent plusieurs communautés.",
  );
</script>

<figure>
  <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={description}>
    {#key network}
      <g class="links">
        {#each links as link}
          <line
            x1={network.nodes[link.source].x}
            y1={network.nodes[link.source].y}
            x2={network.nodes[link.target].x}
            y2={network.nodes[link.target].y}
            class:accent={highlight.links.has(link) || (animated && !built && shown - link.time <= recentEvents)}
          />
        {/each}
      </g>
      <g class="nodes">
        {#each network.nodes as node, index}
          {#if visible[index]}
            <circle
              cx={node.x}
              cy={node.y}
              r={(3 + 0.8 * degrees[index]) * (grown ? 0.55 : 1)}
              class:accent={highlight.nodes.has(index)}
              class:passing={highlight.passing.has(index)}
            />
          {/if}
        {/each}
      </g>
    {/key}
  </svg>
  <p class="kicker" aria-live="polite" class:empty={!highlight.label}>{highlight.label || "–"}</p>
</figure>

<style>
  figure {
    width: min(100%, calc(88cqh * 1000 / 600));
    margin: 0;
  }

  svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }

  line {
    stroke: color-mix(in srgb, var(--text-muted) 45%, transparent);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
    animation: appear-link 500ms ease-out;
    transition: stroke 600ms ease-out;
  }

  line.accent {
    stroke: var(--accent);
    stroke-width: 2;
  }

  circle {
    fill: var(--background);
    stroke: var(--text-muted);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
    transform-box: fill-box;
    transform-origin: center;
    animation: appear 400ms ease-out;
    transition:
      r 400ms ease-out,
      fill 400ms ease-out,
      stroke 400ms ease-out;
  }

  circle.accent {
    fill: var(--accent);
    stroke: var(--accent);
  }

  circle.passing {
    stroke: var(--accent);
    stroke-width: 2;
  }

  .empty {
    visibility: hidden;
  }

  @keyframes appear-link {
    from {
      opacity: 0;
    }
  }

  @keyframes appear {
    from {
      transform: scale(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    line,
    circle {
      animation: none;
      transition: none;
    }
  }
</style>
