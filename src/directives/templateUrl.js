/**
 * v-template-url
 * ----------------
 * A small custom Vue directive that mimics AngularJS's `templateUrl` concept:
 * instead of writing markup inline, you point an element at an external
 * `.html` partial and its contents get fetched and injected at runtime.
 *
 * Usage in a component template:
 *
 *   <div v-template-url="'/templates/reply/tab1-item1.html'"></div>
 *
 * or with a dynamic/reactive value:
 *
 *   <div v-template-url="item.template"></div>
 *
 * Notes:
 * - The fetched HTML is treated as static markup (no Vue compilation of the
 *   fetched string happens here - it's injected via innerHTML). This is
 *   enough for content partials (FAQ answers, accordion bodies, etc.).
 *   If you needed the fetched HTML to contain *live* Vue components/directives,
 *   you'd need the Vue runtime compiler (@vue/compiler-sfc / compile+render),
 *   which is out of scope for a basic static-content include like this.
 * - A tiny in-memory cache avoids re-fetching the same partial twice.
 * - Because the injected HTML isn't compiled by Vue, `@click="..."` inside a
 *   partial does nothing. Instead, partials mark interactive elements with
 *   `data-action="someName"`, and after each injection this directive wires
 *   those elements up to matching functions from the shared
 *   `templateActions` registry (src/assets/scripts/templateActions.js).
 *   See public/templates/reply/tab1-item1.html for an example button.
 */
import { templateActions } from "../assets/scripts/templateActions";

const cache = new Map();

// Finds every `[data-action]` element inside `el` and binds a click listener
// that looks up and invokes the matching function from templateActions.
function bindActions(el) {
  el.querySelectorAll("[data-action]").forEach((node) => {
    const actionName = node.dataset.action;
    const action = templateActions[actionName];

    if (!action) {
      console.warn(`v-template-url: no action registered for "${actionName}"`);
      return;
    }

    node.addEventListener("click", (event) => action(event, node));
  });
}

async function loadTemplate(el, url) {
  if (!url) return;

  el.innerHTML =
    '<div class="text-muted small py-2"><span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading...</div>';

  try {
    let html = cache.get(url);
    if (!html) {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status} while fetching ${url}`);
      html = await res.text();
      cache.set(url, html);
    }
    el.innerHTML = html;
    bindActions(el);
  } catch (err) {
    el.innerHTML = `<div class="alert alert-danger py-2 mb-0 small">Could not load template: ${err.message}</div>`;
  }
}

export default {
  // Runs once the bound element is inserted into the DOM
  mounted(el, binding) {
    loadTemplate(el, binding.value);
  },
  // Re-fetch if the bound URL changes (e.g. switching tabs re-uses the node)
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      loadTemplate(el, binding.value);
    }
  },
};
