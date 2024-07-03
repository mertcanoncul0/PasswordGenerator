/**
 * Selects a single DOM element based on a CSS selector.
 * If no matching element is found, returns a new <span> element.
 *
 * @param {string} selector - A string containing one or more CSS selectors.
 * @param {Element|Document} [scope=document] - The scope within which to search for the selector. Defaults to the entire document.
 * @returns {Element} The first element within the specified scope that matches the selector, or a new <span> element if no matches are found.
 */
const qs = (selector, scope = document) =>
  scope.querySelector(selector) ?? document.createElement("span")

/**
 * Selects DOM elements based on a CSS selector.
 * If no matching elements are found, returns an empty NodeList.
 *
 * @param {string} selector - A string containing one or more CSS selectors.
 * @param {Element|Document} [scope=document] - The scope within which to search for the selector. Defaults to the entire document.
 * @returns {NodeList} A NodeList containing all elements within the specified scope that match the selector, or an empty NodeList if no matches are found.
 */
const qsa = (selector, scope = document) =>
  scope.querySelectorAll(selector) ?? [document.createElement("span")]
