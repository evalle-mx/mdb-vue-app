/**
 * templateActions.js
 * ------------------
 * HTML injected via the `v-template-url` directive is raw markup - it is
 * NOT compiled by Vue, so things like `@click="someMethod"` inside a
 * public/templates/**\/*.html partial simply won't work (Vue never sees
 * that markup as a template).
 *
 * The pattern used here instead:
 *   1. A partial marks an element with `data-action="someActionName"`
 *      (see public/templates/reply/tab1-item1.html for an example).
 *   2. This file exports a plain object mapping action names to functions.
 *   3. The `v-template-url` directive (src/directives/templateUrl.js), after
 *      injecting the fetched HTML, scans it for `[data-action]` elements and
 *      attaches a click listener that looks up and calls the matching
 *      function from this registry.
 *
 * This keeps "business logic" out of the static HTML files (no inline
 * `onclick="..."` soup, no globals on `window`) while still letting plain
 * HTML partials trigger real JS behavior. Add new actions here and reference
 * them by name from any partial.
 */

// Generic action: replaces the innerHTML of a target element (found by ID,
// anywhere in the document) with the markup of a "source" element found
// inside the same partial. Two data-attributes on the button drive this:
//
//   data-target="someElementId"   (required) - id of the element to update
//   data-source="[css-selector]"  (optional) - selector for the content to
//                                  copy from, scoped to the button's own
//                                  partial. Defaults to "[data-content]".
//
// Example partial markup:
//   <div data-content>Some <strong>rich</strong> HTML to insert...</div>
//   <button data-action="replaceContent" data-target="replyPreview">
//     Insert into preview
//   </button>
function replaceContent(event, el) {
  const targetId = el.dataset.target;
  const sourceSelector = el.dataset.source || "[data-content]";

  if (!targetId) {
    console.warn(
      "replaceContent: button is missing data-target (the id of the element to update)",
    );
    return;
  }

  // The target can live anywhere in the document, not just inside this partial
  const targetEl = document.getElementById(targetId);
  if (!targetEl) {
    console.warn(`replaceContent: no element found with id="${targetId}"`);
    return;
  }

  // The source content is scoped to the button's own partial so multiple
  // instances of the same partial/button don't clash with each other
  const container = el.closest(".reply-body") || el.parentElement;
  const source = container?.querySelector(sourceSelector);

  if (!source) {
    console.warn(
      `replaceContent: no source element matching "${sourceSelector}" found near the button`,
    );
    return;
  }

  targetEl.innerHTML = source.innerHTML;
  flashButtonLabel(el, "Inserted!");
}

// Small helper: temporarily swaps a button's label to confirm an action fired
function flashButtonLabel(buttonEl, tempLabel, resetAfterMs = 1500) {
  const original = buttonEl.textContent;
  buttonEl.textContent = tempLabel;
  buttonEl.disabled = true;
  setTimeout(() => {
    buttonEl.textContent = original;
    buttonEl.disabled = false;
  }, resetAfterMs);
}

/**
 * Custom Fn that generates a random code based on pattern (Only A-Z & 0-9)
 * @param {*} pattern
 * @returns
 */
function genCodeFromPattern(pattern) {
  console.log("<genCodeFromPattern> pattern:", pattern);
  var chrs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let rdmCode = "";

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    /* By default,  if is not a number, will be String (TODO manage simbols) */
    if (isNaN(char)) {
      rdmCode += chrs.charAt(Math.floor(Math.random() * chrs.length));
    } else {
      rdmCode += Math.floor(Math.random() * 8) + 1;
    }
  }
  return rdmCode;
}
function genRdmCode(event, el) {
  console.log("replaceContent: button clicked", el);
  let rdmCode = genCodeFromPattern("AB01X2"); //XX00X0
  console.log(`rdmCode ${rdmCode}`);
  const targetId = el.dataset.target;
  if (!targetId) {
    console.warn(
      "genRdmCode: button is missing data-target (the id of the element to update)",
    );
    return;
  }
  const targetEl = document.getElementById(targetId);
  if (!targetEl) {
    console.warn(`genRdmCode: no element found with id="${targetId}"`);
    return;
  }
  targetEl.innerHTML = rdmCode;
  //flashButtonLabel(el, "Generated!");
}

// The registry itself - the directive looks up `data-action` values here.
export const templateActions = {
  replaceContent,
  genRdmCode,
};
