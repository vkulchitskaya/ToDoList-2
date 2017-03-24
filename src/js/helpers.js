/**
 * querySelector wrapper
 *
 * @param {string} selector Selector to query
 */
export function qs(selector) {
    return document.querySelector(selector);
}

export function qsa(selector) {
    return document.querySelectorAll(selector);
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

/**
 * Delegate an event handling to all elements for a selector
 *
 * @param {*} target ..
 * @param {*} selector ...
 * @param {*} type ...
 * @param {*} handler ...
 */

export function $delegate(target, selector, type, handler) {

    const dispatcher = event => {

        const potentialElements = target.querySelectorAll(selector);
        let i = potentialElements.length;

        while (i--) {
            if (potentialElements[i] === event.target) {
                handler.call(event.target, event);
                break;
            }
        }
    };

    $on(target, type, dispatcher);
}
