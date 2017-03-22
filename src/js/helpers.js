/**
 * querySelector wrapper
 *
 * @param {string} selector Selector to query
 */
export function qs(selector)		{
    return document.querySelector(selector);
}

/**
 * addEventListener wrapper
 *
 * @param {*Element|Window} Target element
 * @param {*string} Event name to bind
 * @param {*Function} Capture the event
 */
export function $on(target, type, callback) {
    target.addEventListener(type, callback);
}
