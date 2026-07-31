<script lang="ts">
    import { getStepContext } from "@svx-slides/core/deck/stepContext";

    const step = getStepContext();

    $: regulated = $step >= 4;
    $: heating = $step >= 3 && !regulated;
    $: roomTemperature = regulated
        ? "20,5 °C"
        : $step >= 3
          ? "19,2 → 20,5 °C"
          : "19,2 °C";
    $: comparison = regulated
        ? "20,5 ≥ 20,5"
        : $step >= 2
          ? "19,2 < 19,5"
          : "—";
    $: status = regulated
        ? "Seuil haut atteint : le chauffage s’arrête, puis le cycle recommence si la pièce refroidit."
        : heating
          ? "Le chauffage agit sur la pièce ; la température mesurée va changer."
          : $step >= 2
            ? "Sous 19,5 °C, le thermostat commande le chauffage."
            : $step >= 1
              ? "Le capteur mesure 19,2 °C dans la pièce."
              : "Objectif : maintenir la pièce autour de 20 °C.";
</script>

<div
    class="thermostat-loop"
    role="img"
    aria-label="Boucle de rétroaction négative d’un thermostat. Une consigne de vingt degrés définit une bande de régulation entre dix-neuf virgule cinq et vingt virgule cinq degrés. Le capteur mesure la pièce, le thermostat compare la mesure aux seuils, commande le chauffage sous le seuil bas et l’arrête au seuil haut, puis mesure de nouveau la pièce."
>
    <div class="setpoint" data-active={$step >= 2}>
        <span>consigne</span>
        <strong>20 °C</strong>
        <small>bande 19,5–20,5 °C</small>
        <i aria-hidden="true">↓</i>
    </div>

    <div class="flow">
        <section
            class="room"
            data-active={$step >= 1}
            data-regulated={regulated}
        >
            <div class="room-heading">
                <span>Pièce</span>
                <strong>{roomTemperature}</strong>
            </div>
            <div class="room-scene" aria-hidden="true">
                <div class="window"><i></i><i></i></div>
                <div class="thermometer">
                    <div class="temperature-level"></div>
                </div>
            </div>
            <small>température réelle</small>
        </section>

        <div class="connector measurement" data-active={$step >= 1}>
            <span>capteur</span>
            <strong
                >{$step >= 1
                    ? regulated
                        ? "20,5 °C"
                        : "19,2 °C"
                    : "—"}</strong
            >
            <i aria-hidden="true">→</i>
        </div>

        <section
            class="controller"
            data-active={$step >= 2}
            data-regulated={regulated}
        >
            <span class="device-label">Thermostat</span>
            <div class="screen">
                <span>mesure / seuil</span>
                <strong>{comparison}</strong>
            </div>
            <div class="decision" data-visible={$step >= 2}>
                {regulated ? "chauffage OFF" : "chauffage ON"}
            </div>
        </section>

        <div class="connector command" data-active={$step >= 2}>
            <span>commande</span>
            <i aria-hidden="true">→</i>
        </div>

        <section class="heater" data-active={heating} data-off={regulated}>
            <div class="heat-waves" aria-hidden="true">
                <i></i><i></i><i></i>
            </div>
            <div class="radiator" aria-hidden="true">
                <i></i><i></i><i></i><i></i>
            </div>
            <strong>Chauffage</strong>
            <small
                >{regulated
                    ? "arrêté"
                    : heating
                      ? "allumé"
                      : "en attente"}</small
            >
        </section>
    </div>

    <div
        class="physical-effect"
        data-active={$step >= 3}
        data-regulated={regulated}
        aria-hidden="true"
    >
        <svg viewBox="0 0 1000 120" preserveAspectRatio="none">
            <defs>
                <marker
                    id="thermostat-return-arrow"
                    markerWidth="8"
                    markerHeight="8"
                    refX="7"
                    refY="4"
                    orient="auto"
                >
                    <path d="M0 0 L8 4 L0 8 Z"></path>
                </marker>
            </defs>
            <path d="M900 10 C900 94 730 106 500 106 C270 106 100 94 100 10"
            ></path>
        </svg>
        <span
            >le chauffage modifie la pièce · la nouvelle température est
            remesurée</span
        >
    </div>

    <p class="status" aria-live="polite">{status}</p>
</div>

<style>
    .thermostat-loop {
        position: relative;
        display: grid;
        gap: clamp(0.65rem, 1vw, 1rem);
        width: 100%;
        min-height: min(56vh, 34rem);
        padding: clamp(1.1rem, 1.8vw, 1.6rem);
        border: 1px solid color-mix(in srgb, var(--fg), transparent 86%);
        border-radius: 1.25rem;
        background: radial-gradient(
                circle at 50% 0%,
                color-mix(in srgb, var(--accent), transparent 92%),
                transparent 46%
            ),
            color-mix(in srgb, var(--bg), var(--fg) 2%);
    }

    .setpoint {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 50%;
        display: grid;
        grid-template-columns: auto auto;
        gap: 0.15rem 0.7rem;
        align-items: baseline;
        padding: 0.55rem 1rem;
        border: 1px solid color-mix(in srgb, var(--accent), transparent 58%);
        border-radius: 0.8rem;
        background: var(--bg);
        opacity: 0.5;
        transform: translate(-50%, -50%);
        transition: opacity 240ms ease;
    }

    .setpoint[data-active="true"] {
        opacity: 1;
    }

    .setpoint > span,
    .device-label,
    section > small,
    .connector span,
    .screen span {
        color: var(--muted);
        font-family: var(--font-mono);
        font-size: clamp(0.58rem, 0.7vw, 0.74rem);
        letter-spacing: 0.09em;
        text-transform: uppercase;
    }

    .setpoint strong {
        color: var(--accent);
        font-family: var(--font-mono);
        font-size: clamp(0.9rem, 1.05vw, 1.1rem);
    }

    .setpoint small {
        grid-column: 1 / -1;
        color: var(--muted);
        font-family: var(--font-mono);
        font-size: clamp(0.52rem, 0.62vw, 0.66rem);
    }

    .setpoint > i {
        position: absolute;
        top: 100%;
        left: 50%;
        color: var(--accent);
        font-family: var(--font-mono);
        font-style: normal;
        transform: translateX(-50%);
    }

    .flow {
        display: grid;
        grid-template-columns:
            minmax(12rem, 1fr) minmax(5rem, 0.42fr) minmax(13rem, 0.94fr)
            minmax(5rem, 0.38fr) minmax(10rem, 0.76fr);
        gap: clamp(0.5rem, 1vw, 0.9rem);
        align-items: center;
        padding-top: 1.4rem;
    }

    section {
        min-height: clamp(11.5rem, 24vh, 15rem);
        border: 1px solid color-mix(in srgb, var(--fg), transparent 84%);
        border-radius: 1rem;
        background: color-mix(in srgb, var(--bg), var(--fg) 3%);
        opacity: 0.32;
        transition: 280ms ease;
    }

    section[data-active="true"],
    section[data-regulated="true"],
    .heater[data-off="true"] {
        border-color: color-mix(in srgb, var(--accent), transparent 38%);
        opacity: 1;
        transform: translate(0);
    }

    .room {
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 0.7rem;
        padding: 1rem;
        transform: translateX(-0.35rem);
    }

    .room-heading {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 0.8rem;
    }

    .room-heading span,
    .heater > strong {
        font-size: clamp(0.95rem, 1.25vw, 1.3rem);
        font-weight: 600;
    }

    .room-heading strong {
        color: var(--accent);
        font-family: var(--font-mono);
        font-size: clamp(0.9rem, 1.2vw, 1.28rem);
        white-space: nowrap;
    }

    .room-scene {
        position: relative;
        min-height: 7rem;
        border-right: 2px solid color-mix(in srgb, var(--fg), transparent 72%);
        border-bottom: 2px solid color-mix(in srgb, var(--fg), transparent 72%);
    }

    .window {
        position: absolute;
        top: 0.55rem;
        left: 0.45rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 4.2rem;
        height: 3.5rem;
        border: 1px solid color-mix(in srgb, var(--fg), transparent 62%);
    }

    .window i + i {
        border-left: 1px solid color-mix(in srgb, var(--fg), transparent 72%);
    }

    .thermometer {
        position: absolute;
        right: 1.1rem;
        bottom: 0.7rem;
        width: 0.7rem;
        height: 4.8rem;
        overflow: hidden;
        border: 1px solid color-mix(in srgb, var(--fg), transparent 42%);
        border-radius: 999px;
        background: var(--bg);
    }

    .temperature-level {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 48%;
        background: var(--accent);
        transition: height 700ms ease;
    }

    .room[data-regulated="true"] .temperature-level {
        height: 78%;
    }

    .controller {
        display: grid;
        gap: 0.75rem;
        align-content: center;
        padding: 1rem;
        transform: translateY(0.35rem);
    }

    .screen {
        display: grid;
        gap: 0.4rem;
        padding: 0.8rem;
        border: 1px solid color-mix(in srgb, var(--fg), transparent 72%);
        background: color-mix(in srgb, var(--bg), black 12%);
        text-align: center;
    }

    .screen strong {
        color: var(--accent);
        font-family: var(--font-mono);
        font-size: clamp(1.2rem, 1.8vw, 1.9rem);
    }

    .decision {
        justify-self: center;
        padding: 0.35rem 0.65rem;
        border-radius: 999px;
        background: var(--accent-soft);
        color: var(--accent);
        font-family: var(--font-mono);
        font-size: clamp(0.62rem, 0.72vw, 0.78rem);
        letter-spacing: 0.07em;
        opacity: 0;
        text-transform: uppercase;
        transition: opacity 220ms ease;
    }

    .decision[data-visible="true"] {
        opacity: 1;
    }

    .connector {
        display: grid;
        gap: 0.35rem;
        place-items: center;
        color: var(--muted);
        opacity: 0.16;
        transition: 260ms ease;
    }

    .connector strong {
        color: var(--accent);
        font-family: var(--font-mono);
        font-size: clamp(0.65rem, 0.76vw, 0.8rem);
        white-space: nowrap;
    }

    .connector i {
        color: var(--accent);
        font-family: var(--font-mono);
        font-size: clamp(1.5rem, 2.2vw, 2.5rem);
        font-style: normal;
        transform: translateX(-0.35rem);
        transition: transform 260ms ease;
    }

    .connector[data-active="true"] {
        opacity: 1;
    }

    .connector[data-active="true"] i {
        transform: translateX(0);
    }

    .heater {
        display: grid;
        gap: 0.5rem;
        place-items: center;
        padding: 0.9rem;
        transform: translateX(0.35rem);
    }

    .radiator {
        display: flex;
        gap: 0.28rem;
        align-items: stretch;
        width: 6.6rem;
        height: 5.1rem;
        padding: 0.42rem;
        border: 2px solid color-mix(in srgb, var(--fg), transparent 45%);
        border-radius: 0.55rem;
    }

    .radiator i {
        flex: 1;
        border-radius: 999px;
        background: color-mix(in srgb, var(--fg), transparent 78%);
        transition: background 260ms ease;
    }

    .heater[data-active="true"] .radiator {
        border-color: var(--accent);
        box-shadow: 0 0 2rem color-mix(in srgb, var(--accent), transparent 80%);
    }

    .heater[data-active="true"] .radiator i {
        background: var(--accent);
    }

    .heater[data-off="true"] .radiator {
        border-color: color-mix(in srgb, var(--accent), transparent 52%);
    }

    .heat-waves {
        display: flex;
        gap: 0.75rem;
        height: 1.4rem;
        opacity: 0;
        transition: opacity 220ms ease;
    }

    .heat-waves i {
        width: 0.42rem;
        height: 1.2rem;
        border-left: 2px solid var(--accent);
        border-radius: 50%;
        animation: heat-rise 1.2s ease-in-out infinite alternate;
    }

    .heat-waves i:nth-child(2) {
        animation-delay: 160ms;
    }

    .heat-waves i:nth-child(3) {
        animation-delay: 320ms;
    }

    .heater[data-active="true"] .heat-waves {
        opacity: 1;
    }

    .physical-effect {
        position: relative;
        height: clamp(3.6rem, 6.5vh, 4.8rem);
        color: var(--muted);
        opacity: 0.14;
        transition: opacity 300ms ease;
    }

    .physical-effect svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        overflow: visible;
    }

    .physical-effect path {
        fill: none;
        marker-end: url(#thermostat-return-arrow);
        stroke: var(--accent);
        stroke-dasharray: 9 10;
        stroke-width: 2;
        vector-effect: non-scaling-stroke;
    }

    .physical-effect marker path {
        fill: var(--accent);
    }

    .physical-effect span {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: max-content;
        max-width: 76%;
        padding: 0.15rem 0.55rem;
        background: var(--bg);
        font-family: var(--font-mono);
        font-size: clamp(0.58rem, 0.68vw, 0.72rem);
        letter-spacing: 0.07em;
        text-align: center;
        text-transform: uppercase;
        transform: translateX(-50%);
    }

    .physical-effect[data-active="true"] {
        opacity: 1;
    }

    .physical-effect[data-regulated="true"] path {
        stroke-dasharray: none;
    }

    .status {
        min-height: 1.4em;
        margin: 0;
        color: var(--muted);
        font-size: clamp(0.78rem, 0.92vw, 0.95rem);
        text-align: center;
    }

    @keyframes heat-rise {
        from {
            transform: translateY(0.3rem) skewX(-8deg);
        }
        to {
            transform: translateY(-0.25rem) skewX(8deg);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .thermostat-loop *,
        .thermostat-loop *::before,
        .thermostat-loop *::after {
            animation: none !important;
            transition: none !important;
        }
    }
</style>
