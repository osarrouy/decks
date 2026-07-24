const GLOW_SELECTOR = 'img[data-glow], img[glow], img.glow, img.glowy'
const GRID_SIZE = 7

type EnhancedImage = HTMLImageElement & {
  __svxGlowCleanup?: () => void
}

function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

function glowStrength(img: HTMLImageElement) {
  const raw = img.getAttribute('data-glow') || img.getAttribute('glow') || ''

  if (raw === 'soft') {
    return { opacity: '0.48', blur: '2.4rem', scale: '1.12', spread: '9%' }
  }

  if (raw === 'strong') {
    return { opacity: '0.82', blur: '4.4rem', scale: '1.2', spread: '16%' }
  }

  return { opacity: '0.66', blur: '3.4rem', scale: '1.16', spread: '12%' }
}

function colorStop(data: Uint8ClampedArray, index: number, spread: string) {
  const r = data[index]
  const g = data[index + 1]
  const b = data[index + 2]
  const a = data[index + 3] / 255

  if (a < 0.08) return undefined

  return { r, g, b, a: Math.min(0.78, Math.max(0.28, a * 0.72)), spread }
}

function buildGlowMap(img: HTMLImageElement, spread: string) {
  const canvas = document.createElement('canvas')
  canvas.width = GRID_SIZE
  canvas.height = GRID_SIZE

  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) return undefined

  context.drawImage(img, 0, 0, GRID_SIZE, GRID_SIZE)
  const imageData = context.getImageData(0, 0, GRID_SIZE, GRID_SIZE).data
  const gradients: string[] = []

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      const color = colorStop(imageData, (y * GRID_SIZE + x) * 4, spread)
      if (!color) continue

      const px = (x / (GRID_SIZE - 1)) * 100
      const py = (y / (GRID_SIZE - 1)) * 100
      gradients.push(
        `radial-gradient(circle at ${px.toFixed(1)}% ${py.toFixed(1)}%, rgba(${color.r}, ${color.g}, ${color.b}, ${color.a.toFixed(3)}) 0 ${color.spread}, transparent calc(${color.spread} * 2.2))`
      )
    }
  }

  return gradients.join(', ')
}

function fallbackGlowMap(img: HTMLImageElement) {
  const src = img.currentSrc || img.src
  if (!src) return undefined
  return `url(${JSON.stringify(src)}) center / cover no-repeat`
}

function applyGlow(frame: HTMLElement, img: HTMLImageElement) {
  const { opacity, blur, scale, spread } = glowStrength(img)

  frame.style.setProperty('--image-glow-opacity', opacity)
  frame.style.setProperty('--image-glow-blur', blur)
  frame.style.setProperty('--image-glow-scale', scale)

  try {
    const glowMap = buildGlowMap(img, spread)
    if (glowMap) {
      frame.style.setProperty('--image-glow-map', glowMap)
      frame.dataset.glowAnalyzed = 'true'
      return
    }
  } catch {
    // Cross-origin images can taint the canvas. In that case we keep a symmetric
    // blurred-image fallback rather than failing the slide.
  }

  const fallback = fallbackGlowMap(img)
  if (fallback) {
    frame.style.setProperty('--image-glow-map', fallback)
    frame.dataset.glowAnalyzed = 'fallback'
  }
}

function enhanceImage(img: EnhancedImage) {
  const existingFrame = img.closest<HTMLElement>('.image-glow-frame')
  if (existingFrame) {
    if (img.complete && img.naturalWidth > 0) applyGlow(existingFrame, img)
    return
  }

  if (img.__svxGlowCleanup) return
  if (!img.parentNode) return

  const frame = document.createElement('span')
  const aura = document.createElement('span')

  frame.className = 'image-glow-frame'
  aura.className = 'image-glow-aura'
  aura.setAttribute('aria-hidden', 'true')

  img.parentNode.insertBefore(frame, img)
  frame.appendChild(aura)
  frame.appendChild(img)

  const render = () => applyGlow(frame, img)

  if (img.complete && img.naturalWidth > 0) {
    render()
  } else {
    img.addEventListener('load', render, { once: true })
  }

  img.__svxGlowCleanup = () => {
    img.removeEventListener('load', render)
    delete img.__svxGlowCleanup
  }
}

export function enhanceImageGlow(node: HTMLElement) {
  if (!isBrowser()) return {}

  const scan = () => {
    node.querySelectorAll<EnhancedImage>(GLOW_SELECTOR).forEach(enhanceImage)
  }

  scan()

  const observer = new MutationObserver(scan)
  observer.observe(node, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['data-glow', 'glow', 'src', 'class']
  })

  return {
    destroy() {
      observer.disconnect()
      node.querySelectorAll<EnhancedImage>(GLOW_SELECTOR).forEach((img) => img.__svxGlowCleanup?.())
    }
  }
}
