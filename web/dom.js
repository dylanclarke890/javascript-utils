import { uniqueId } from "../uuid";

/**
 * @return {boolean} True if the element is in viewport.
 */
export function isInViewport(elem) {
  const bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Checks if a DOM element is scrolled into the scrollable view of its parent scrollable container.
 * @param {Element} elem The DOM element to check.
 * @param {Element} parent The parent DOM element of `elem`.
 * @param {number|Function} minPx Minimum number of pixels of the element's height which must
 * be scrolled into the view in order to consider the element to be scrolled into view.
 * If a function is given, it will receive the element's bounding client rect as the first argument
 * as well as the holder element's bounding client rect as the second argument and must return
 * the minimum number of pixels.
 * @return {boolean} True if the given element is scrolled into view.
 */
export function isScrolledIntoView(element, parent, minPx = 1) {
  const elRect = element.getBoundingClientRect();
  const holderRect = parent.getBoundingClientRect();
  const { top, bottom, height } = elRect;

  const minPxNumberFunc = () =>
    typeof minPx === "function" ? minPx(elRect, holderRect) : minPx;
  let bottomDiff;
  return top <= holderRect.top
    ? holderRect.top - top + minPxNumberFunc() <= height
    : (bottomDiff = bottom - holderRect.bottom) < 0
    ? true
    : holderRect.bottom >= top && minPx
    ? holderRect.bottom - top >= minPxNumberFunc()
    : bottomDiff <= height;
}

/**
 * Tests if a DOM element has a vertical scrollbar.
 * @param {Element} element The DOM element.
 * @return {boolean} True if it has a vertical scrollbar.
 */
export function hasVerticalScrollbar(element) {
  const verticalScroll = element.scrollHeight > element.clientHeight;
  return verticalScroll;
}

/**
 * Tests if a DOM element has a horizontal scrollbar.
 * @param {Element} element The DOM element.
 * @return {boolean} True if it has a horizontal scrollbar.
 */
export function hasHorizontalScrollbar(element) {
  const horizontalScroll = element.scrollWidth > element.clientWidth;
  return horizontalScroll;
}

/**
 * Generates a unique ID which can be used for an element.
 * @param {string|undefined} [prefix] Unique ID prefix.
 * @return {string} The element unique ID.
 */
export function uniqueElemId(prefix = null) {
  const uniqueElementIdSuffix = uniqueId();
  return prefix + uniqueElementIdSuffix;
}

/**
 * Gets the computed style of an element.
 * @param {Element} element DOM element.
 * @return {CSSStyleDeclaration} The computed style.
 */
export function getElementComputedStyle(element) {
  return window.getComputedStyle(element);
}

/**
 * Gets element's inner dimensions (height and width without padding).
 * @param {Element} element An element.
 * @return {Object} An object with width and height properties.
 */
export function elementInnerDimensions(element) {
  const computedStyle = getElementComputedStyle(element);
  let elementHeight = element.clientHeight; // Height with padding.
  let elementWidth = element.clientWidth; // Width with padding
  elementHeight -=
    parseFloat(computedStyle.paddingTop) +
    parseFloat(computedStyle.paddingBottom);
  elementWidth -=
    parseFloat(computedStyle.paddingLeft) +
    parseFloat(computedStyle.paddingRight);
  return {
    width: elementWidth,
    height: elementHeight,
  };
}

/**
 * Returns the number of lines in a textarea, including wrapped lines.
 * @see https://stackoverflow.com/questions/28905965/textarea-how-to-count-wrapped-lines-rows#answer-45252226
 * @param {HTMLTextAreaElement} textarea A textarea element. Note that the textarea should
 * have an integer line height to avoid rounding errors.
 */
export function countTextareaLines(textarea) {
  let linesBuffer = document.createElement("textarea");
  linesBuffer.style.border = "none";
  linesBuffer.style.height = "0";
  linesBuffer.style.overflow = "hidden";
  linesBuffer.style.padding = "0";
  linesBuffer.style.position = "absolute";
  linesBuffer.style.left = "0";
  linesBuffer.style.top = "0";
  linesBuffer.style.zIndex = "-1";
  document.body.appendChild(linesBuffer);

  const cs = window.getComputedStyle(textarea);
  const pl = parseInt(cs.paddingLeft);
  const pr = parseInt(cs.paddingRight);
  let lh = parseInt(cs.lineHeight);
  // `cs.lineHeight` may return 'normal', which means line height = font size.
  if (isNaN(lh)) lh = parseInt(cs.fontSize);

  // Copy content width.
  linesBuffer.style.width = textarea.clientWidth - pl - pr + "px";
  // Copy text properties.
  linesBuffer.style.font = cs.font;
  linesBuffer.style.letterSpacing = cs.letterSpacing;
  linesBuffer.style.whiteSpace = cs.whiteSpace;
  linesBuffer.style.wordBreak = cs.wordBreak;
  linesBuffer.style.wordSpacing = cs.wordSpacing;

  // Copy value.
  linesBuffer.value = textarea.value;
  let result = Math.floor(linesBuffer.scrollHeight / lh);
  if (result == 0) result = 1;
  return result;
}

/**
 * Checks if the scroll of an element is on the bottom.
 * @param {Element} DOMNode Element.
 * @return {boolean} True if the scroll is on the bottom.
 */
export function isScrollOnBottom(DOMNode) {
  const ret = DOMNode.scrollTop + DOMNode.offsetHeight >= DOMNode.scrollHeight;
  return ret;
}

/**
 * Returns the default browser's vertical scrollbar width.
 * @return {Number} The scrollbar width.
 */
export function getVerticalScrollBarWidth() {
  const scrollDiv = document.createElement("div");
  scrollDiv.className = "vertical-scrollbar-measure";
  const sheet = document.createElement("style");
  sheet.innerHTML =
    "div.vertical-scrollbar-measure { width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px; }";
  document.body.appendChild(sheet);
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  const sheetParent = sheet.parentNode;
  sheetParent.removeChild(sheet);
  return scrollbarWidth;
}

/**
 * Checks if an element with "text-overflow: ellipsis;" has the ellipsis active
 * and therefore its text is truncated.
 * @param {Element} e The DOM element.
 * @return {boolean} True if ellipsis are present, false otherwise.
 */
export function isEllipsisActive(e) {
  return e.offsetWidth < e.scrollWidth;
}
