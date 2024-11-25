import { ref, watch } from "vue";

/**
 * useScrollLock
 * Locks or unlocks scrolling for a given element.
 * @param {Ref<Element>} element - The target element to lock scrolling on.
 * @param {boolean} initialState - The initial lock state.
 * @returns {Ref<boolean>} - Reactive lock state.
 */
export function useScrollLock(element, initialState = false) {
  const isLocked = ref(initialState);

  watch(
    () => element.value,
    (el) => {
      if (!el) return;
      el.style.overflow = isLocked.value ? "hidden" : "";
    },
    { immediate: true }
  );

  return isLocked;
}
