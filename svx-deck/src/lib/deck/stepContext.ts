import { getContext, setContext } from "svelte";
import { readable, type Readable } from "svelte/store";

const STEP_CONTEXT = Symbol("slide-step");

export function setStepContext(step: Readable<number>) {
  setContext(STEP_CONTEXT, step);
}

export function getStepContext() {
  return getContext<Readable<number>>(STEP_CONTEXT) ?? readable(0);
}
