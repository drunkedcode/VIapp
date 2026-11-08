const SHOW_DELAY_MS = 150; // si el pedido termina antes de esto, ni se llega a mostrar
const MIN_VISIBLE_MS = 300; // si ya se mostró, se queda al menos este tiempo (evita parpadeo)
let pendingCount = 0;
let currentLabel;
let showTimer = null;
let shownAt = null;
const listeners = new Set();
function emit(visible) {
    listeners.forEach((listener) => listener(visible, currentLabel));
}
function clearShowTimer() {
    if (showTimer) {
        clearTimeout(showTimer);
        showTimer = null;
    }
}
export function showLoading(label) {
    pendingCount += 1;
    if (label)
        currentLabel = label;
    if (pendingCount === 1 && !showTimer && shownAt === null) {
        showTimer = setTimeout(() => {
            showTimer = null;
            if (pendingCount > 0) {
                shownAt = Date.now();
                emit(true);
            }
        }, SHOW_DELAY_MS);
    }
}
export function hideLoading() {
    pendingCount = Math.max(0, pendingCount - 1);
    if (pendingCount > 0)
        return;
    // Todavía no llegó a mostrarse (terminó rápido) -> cancelamos, nunca se ve.
    if (shownAt === null) {
        clearShowTimer();
        currentLabel = undefined;
        return;
    }
    const elapsed = Date.now() - shownAt;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
    setTimeout(() => {
        if (pendingCount === 0) {
            shownAt = null;
            currentLabel = undefined;
            emit(false);
        }
    }, remaining);
}
export function subscribeLoading(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}
