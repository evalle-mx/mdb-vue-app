/**
 * resolveTemplate(path)
 * ---------------------
 * Small shared helper for any view using the `v-template-url` directive.
 *
 * The JSON data files store template paths *relative to /public*
 * (e.g. "templates/reply/tab1-item1.html"). This prepends Vite's
 * `import.meta.env.BASE_URL` so the fetch inside the directive resolves
 * correctly whether the site is hosted at a domain root or a sub-path
 * (see vite.config.js `base` option).
 *
 * Centralized here instead of being redefined in every component
 * (CommonReply.vue, Macros.vue, etc.) that needs it.
 */
export function resolveTemplate(path) {
  return `${import.meta.env.BASE_URL}${path}`;
}

export function genRdmCode() {
  alert("Generating random code...");
  let rdmCode = genCodeFromPattern("AB01X2"); //XX00X0
  document.getElementById("rdmCode").innerHTML = rdmCode;
  copyText(document.getElementById("div-mfa"));
}
