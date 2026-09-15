<div
  class="diagram"
  role="img"
  aria-label="Schéma de Shannon : une source d’information produit un message, l’émetteur le transforme en signal, le canal transmet ce signal malgré le bruit, le récepteur reconstitue le message et la destination le reçoit."
>
  <p class="caption">Modèle mathématique de la communication</p>

  <div class="model">
    <section class="node source">
      <span>origine</span>
      <strong>Source<br />d’information</strong>
      <small>produit le message</small>
    </section>

    <div class="link message"><span>message</span><i></i></div>

    <section class="node transmitter">
      <span>encodage</span>
      <strong>Émetteur</strong>
      <small>transforme le message en signal</small>
    </section>

    <div class="link signal"><span>signal</span><i></i></div>

    <section class="node channel">
      <span>transmission</span>
      <strong>Canal</strong>
      <small>transporte le signal</small>
    </section>

    <div class="link received-signal"><span>signal reçu</span><i></i></div>

    <section class="node receiver">
      <span>décodage</span>
      <strong>Récepteur</strong>
      <small>reconstitue le message</small>
    </section>

    <div class="link received-message"><span>message</span><i></i></div>

    <section class="node destination">
      <span>arrivée</span>
      <strong>Destination</strong>
      <small>reçoit le message</small>
    </section>

    <div class="noise-link"><i></i><span>perturbation</span></div>

    <section class="node noise">
      <span>interférence</span>
      <strong>Source<br />de bruit</strong>
    </section>
  </div>
</div>

<style>
  .diagram {
    display: grid;
    gap: clamp(1.6rem, 3.2cqh, 2.8rem);
    width: 100%;
  }

  .caption {
    margin: 0;
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: clamp(0.72rem, 0.82cqw, 0.98rem) !important;
    letter-spacing: 0.09em;
    text-align: center;
    text-transform: uppercase;
  }

  .model {
    display: grid;
    grid-template-columns:
      minmax(0, 1fr) minmax(2.4rem, 0.32fr) minmax(0, 1fr)
      minmax(2.4rem, 0.32fr) minmax(0, 1fr) minmax(2.4rem, 0.32fr)
      minmax(0, 1fr) minmax(2.4rem, 0.32fr) minmax(0, 1fr);
    grid-template-rows: auto clamp(3.5rem, 8cqh, 5.5rem) auto;
    align-items: center;
    width: 100%;
  }

  .node {
    position: relative;
    display: grid;
    gap: clamp(0.35rem, 0.9cqh, 0.65rem);
    align-content: center;
    min-width: 0;
    min-height: clamp(8.5rem, 21cqh, 12.5rem);
    padding: clamp(0.75rem, 1.2cqw, 1.35rem);
    border: 1px solid color-mix(in srgb, var(--fg), transparent 78%);
    background: color-mix(in srgb, var(--bg), var(--fg) 2%);
    text-align: center;
  }

  .node::before,
  .node::after {
    position: absolute;
    width: 0.55rem;
    height: 0.55rem;
    border-color: var(--accent);
    content: "";
  }

  .node::before {
    top: -1px;
    left: -1px;
    border-top: 1px solid;
    border-left: 1px solid;
  }

  .node::after {
    right: -1px;
    bottom: -1px;
    border-right: 1px solid;
    border-bottom: 1px solid;
  }

  .transmitter,
  .channel,
  .receiver {
    border-color: color-mix(in srgb, var(--accent), transparent 42%);
    background: color-mix(in srgb, var(--accent-soft), var(--bg) 34%);
  }

  .node > span,
  .node > small,
  .link span,
  .noise-link span {
    color: var(--muted);
    font-family: var(--font-mono);
  }

  .node > span {
    font-size: clamp(0.58rem, 0.62cqw, 0.74rem);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .node strong {
    color: var(--fg);
    font-family: var(--font-heading);
    font-size: clamp(1.2rem, 1.6cqw, 1.95rem);
    font-weight: 400;
    line-height: 0.98;
  }

  .transmitter strong,
  .channel strong,
  .receiver strong,
  .noise strong {
    color: var(--accent);
  }

  .node > small {
    font-size: clamp(0.62rem, 0.7cqw, 0.84rem);
    line-height: 1.3;
  }

  .source {
    grid-column: 1;
  }

  .message {
    grid-column: 2;
  }

  .transmitter {
    grid-column: 3;
  }

  .signal {
    grid-column: 4;
  }

  .channel {
    grid-column: 5;
  }

  .received-signal {
    grid-column: 6;
  }

  .receiver {
    grid-column: 7;
  }

  .received-message {
    grid-column: 8;
  }

  .destination {
    grid-column: 9;
  }

  .source,
  .message,
  .transmitter,
  .signal,
  .channel,
  .received-signal,
  .receiver,
  .received-message,
  .destination {
    grid-row: 1;
  }

  .link {
    position: relative;
    display: grid;
    align-self: stretch;
    align-items: center;
  }

  .link span {
    position: absolute;
    right: 50%;
    bottom: calc(50% + 0.7rem);
    width: max-content;
    max-width: 8rem;
    font-size: clamp(0.52rem, 0.56cqw, 0.68rem);
    text-align: center;
    transform: translateX(50%);
  }

  .link i {
    position: relative;
    display: block;
    height: 1px;
    background: var(--accent);
  }

  .link i::after,
  .noise-link i::after {
    position: absolute;
    width: 0.48rem;
    height: 0.48rem;
    border-top: 1px solid var(--accent);
    border-right: 1px solid var(--accent);
    content: "";
  }

  .link i::after {
    top: 50%;
    right: 0;
    transform: translateY(-50%) rotate(45deg);
  }

  .noise-link {
    position: relative;
    display: grid;
    grid-column: 5;
    grid-row: 2;
    justify-items: center;
    align-self: stretch;
  }

  .noise-link i {
    width: 1px;
    height: 100%;
    background: var(--accent);
  }

  .noise-link i::after {
    top: 0;
    left: 50%;
    transform: translateX(-50%) rotate(-45deg);
  }

  .noise-link span {
    position: absolute;
    top: 50%;
    left: calc(50% + 0.7rem);
    font-size: clamp(0.52rem, 0.56cqw, 0.68rem);
    transform: translateY(-50%);
  }

  .noise {
    grid-column: 5;
    grid-row: 3;
    min-height: clamp(5.5rem, 12cqh, 7rem);
    border-style: dashed;
  }

  @media (max-width: 700px) {
    .diagram {
      gap: 1.1rem;
    }

    .model {
      grid-template-columns: minmax(0, 1fr) 2.4rem minmax(0, 0.72fr);
      grid-template-rows:
        auto 1.6rem auto 1.6rem auto 1.6rem auto 1.6rem
        auto;
      width: min(100%, 22rem);
      margin: 0 auto;
    }

    .node {
      min-height: 4.7rem;
      padding: 0.55rem 0.7rem;
    }

    .node > span {
      font-size: 0.52rem;
    }

    .node strong {
      font-size: 1.1rem;
    }

    .node > small {
      font-size: 0.56rem;
    }

    .source,
    .transmitter,
    .channel,
    .receiver,
    .destination,
    .message,
    .signal,
    .received-signal,
    .received-message {
      grid-column: 1;
    }

    .source {
      grid-row: 1;
    }

    .message {
      grid-row: 2;
    }

    .transmitter {
      grid-row: 3;
    }

    .signal {
      grid-row: 4;
    }

    .channel {
      grid-row: 5;
    }

    .received-signal {
      grid-row: 6;
    }

    .receiver {
      grid-row: 7;
    }

    .received-message {
      grid-row: 8;
    }

    .destination {
      grid-row: 9;
    }

    .link {
      justify-items: center;
    }

    .link span {
      top: 50%;
      right: auto;
      bottom: auto;
      left: calc(50% + 0.65rem);
      transform: translateY(-50%);
    }

    .link i {
      width: 1px;
      height: 100%;
    }

    .link i::after {
      top: auto;
      right: auto;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) rotate(135deg);
    }

    .noise-link {
      grid-column: 2;
      grid-row: 5;
      align-self: center;
      justify-items: stretch;
    }

    .noise-link i {
      width: 100%;
      height: 1px;
    }

    .noise-link i::after {
      top: 50%;
      left: 0;
      transform: translateY(-50%) rotate(-135deg);
    }

    .noise-link span {
      top: auto;
      right: 50%;
      bottom: calc(50% + 0.45rem);
      left: auto;
      transform: translateX(50%);
    }

    .noise {
      grid-column: 3;
      grid-row: 5;
      min-height: 4.7rem;
    }
  }
</style>
