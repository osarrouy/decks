import { browser } from '$app/environment'
import { get, writable } from 'svelte/store'
import type { PresentationState } from './types'

type ControllerOptions = {
  broadcast?: boolean
  updateUrl?: boolean
}

const SOURCE = Math.random().toString(36).slice(2)

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function parseHash(slideCount: number, getMaxStep: (slide: number) => number): PresentationState {
  if (!browser) return { slide: 0, step: 0 }

  const raw = window.location.hash.replace(/^#\/?/, '')
  const match = raw.match(/^(\d+)(?:[./:-](\d+))?$/)
  if (!match) return { slide: 0, step: 0 }

  const slide = clamp(Number(match[1]) - 1, 0, Math.max(0, slideCount - 1))
  const step = clamp(Number(match[2] ?? 0), 0, getMaxStep(slide))
  return { slide, step }
}

function stateToHash(state: PresentationState) {
  return `#${state.slide + 1}.${state.step}`
}

export function createDeckController(
  deckId: string,
  slideCount: number,
  getMaxStep: (slide: number) => number,
  options: ControllerOptions = {}
) {
  const broadcast = options.broadcast ?? true
  const updateUrl = options.updateUrl ?? true
  const state = writable<PresentationState>({ slide: 0, step: 0 })

  let channel: BroadcastChannel | undefined
  let applyingRemote = false

  function normalize(next: PresentationState): PresentationState {
    const slide = clamp(next.slide, 0, Math.max(0, slideCount - 1))
    const step = clamp(next.step, 0, getMaxStep(slide))
    return { slide, step }
  }

  function commit(next: PresentationState, origin: 'local' | 'remote' | 'url' = 'local') {
    const normalized = normalize(next)
    state.set(normalized)

    if (browser && updateUrl && window.location.hash !== stateToHash(normalized)) {
      history.replaceState(null, '', stateToHash(normalized))
    }

    if (browser && broadcast && channel && origin === 'local') {
      channel.postMessage({ type: 'goto', deckId, source: SOURCE, state: normalized })
    }
  }

  function next() {
    const current = get(state)
    const maxStep = getMaxStep(current.slide)

    if (current.step < maxStep) {
      commit({ slide: current.slide, step: current.step + 1 })
      return
    }

    commit({ slide: current.slide + 1, step: 0 })
  }

  function previous() {
    const current = get(state)

    if (current.step > 0) {
      commit({ slide: current.slide, step: current.step - 1 })
      return
    }

    const previousSlide = clamp(current.slide - 1, 0, Math.max(0, slideCount - 1))
    commit({ slide: previousSlide, step: getMaxStep(previousSlide) })
  }

  function goTo(slide: number, step = 0) {
    commit({ slide, step })
  }

  function handleKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLElement | null
    if (target?.matches('input, textarea, select, [contenteditable="true"]')) return

    if (['ArrowRight', ' ', 'PageDown'].includes(event.key)) {
      event.preventDefault()
      next()
    }

    if (['ArrowLeft', 'Backspace', 'PageUp'].includes(event.key)) {
      event.preventDefault()
      previous()
    }

    if (event.key === 'Home') {
      event.preventDefault()
      goTo(0, 0)
    }

    if (event.key === 'End') {
      event.preventDefault()
      const last = slideCount - 1
      goTo(last, getMaxStep(last))
    }
  }

  function mount() {
    if (!browser) return () => { }
    state.set(parseHash(slideCount, getMaxStep))

    if (broadcast) {
      channel = new BroadcastChannel(`svx-slides:${deckId}`)
      channel.onmessage = (event) => {
        const message = event.data
        if (message?.type !== 'goto' || message.deckId !== deckId || message.source === SOURCE) return
        applyingRemote = true
        commit(message.state, 'remote')
        applyingRemote = false
      }
    }

    const onHashChange = () => {
      if (applyingRemote) return
      commit(parseHash(slideCount, getMaxStep), 'url')
    }

    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('keydown', handleKeydown)
      channel?.close()
    }
  }

  return {
    state,
    mount,
    next,
    previous,
    goTo
  }
}
