<script lang="ts">
    export let src: string;
</script>

<div class="background-video">
    <video autoplay loop muted playsinline aria-hidden="true">
        <source {src} type="video/mp4" />
    </video>

    <div class="background-video-overlay" aria-hidden="true"></div>

    <div class="background-video-content">
        <slot />
    </div>
</div>

<style>
    .background-video {
        position: absolute;
        inset: 0;
        display: grid;
        align-items: end;
        padding: inherit;
        overflow: hidden;
        background: #000;
    }

    .background-video video,
    .background-video-overlay {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }

    .background-video video {
        object-fit: cover;
    }

    .background-video-overlay {
        background: linear-gradient(0deg, rgb(0 0 0 / 0.68), transparent 58%);
        pointer-events: none;
    }

    .background-video-content {
        position: relative;
        z-index: 1;
    }

    .background-video-content :global(h1),
    .background-video-content :global(h2),
    .background-video-content :global(h3),
    .background-video-content :global(h4),
    .background-video-content :global(h5),
    .background-video-content :global(h6) {
        color: #fff;
    }
</style>
