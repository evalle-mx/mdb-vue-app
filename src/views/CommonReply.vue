<template>
  <div>
    <h2 class="mb-3">
      <i class="bi bi-chat-square-text me-2"></i>Common Reply
    </h2>
    <p class="text-muted">
      Three Bootstrap "tabs", each with its own accordion of 4 items. Every
      accordion body is populated at runtime by the custom
      <code>v-template-url</code> directive, which fetches an external HTML
      partial - similar in spirit to AngularJS's <code>templateUrl</code>.
    </p>

    <!-- Loading / error states for the remote/local JSON fetch that now
         supplies the whole tabs/accordion structure (see script below) -->
    <div v-if="loading" class="d-flex align-items-center gap-2 text-muted">
      <span class="spinner-border spinner-border-sm"></span> Loading tabs...
    </div>
    <div v-else-if="error" class="alert alert-danger">
      Failed to load Common Reply content: {{ error }}
      <button class="btn btn-sm btn-outline-danger ms-2" @click="load()">
        Retry
      </button>
    </div>

    <template v-else>
      <!-- Bootstrap nav-tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li
          class="nav-item"
          v-for="(tab, idx) in tabs"
          :key="tab.id"
          role="presentation"
        >
          <button
            class="nav-link"
            :class="{ active: idx === 0 }"
            :id="tab.id + '-btn'"
            data-bs-toggle="tab"
            :data-bs-target="'#' + tab.id"
            type="button"
            role="tab"
            :aria-controls="tab.id"
            :aria-selected="idx === 0"
          >
            {{ tab.label }}
          </button>
        </li>
      </ul>

      <div class="tab-content border border-top-0 p-3 bg-white">
        <div
          v-for="(tab, idx) in tabs"
          :key="tab.id"
          class="tab-pane fade"
          :class="{ show: idx === 0, active: idx === 0 }"
          :id="tab.id"
          role="tabpanel"
        >
          <!-- Accordion with 4 items per tab -->
          <div class="accordion" :id="tab.id + '-accordion'">
            <div
              class="accordion-item"
              v-for="(item, i) in tab.items"
              :key="item.id"
            >
              <h2 class="accordion-header">
                <button
                  class="accordion-button"
                  :class="{ collapsed: i !== 0 }"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#' + item.id"
                  :aria-expanded="i === 0"
                  :aria-controls="item.id"
                >
                  {{ item.title }}
                </button>
              </h2>
              <div
                :id="item.id"
                class="accordion-collapse collapse"
                :data-bs-parent="'#' + tab.id + '-accordion'"
              >
                <!-- :class="{ show: i === 0 }" -->
                <!-- The accordion body's HTML is fetched from an external
                     file via the templateUrl-style directive. `resolveTemplate`
                     prefixes the path from the JSON with Vite's BASE_URL so it
                     resolves correctly whatever the deployment path is. -->
                <div
                  class="accordion-body reply-body"
                  v-template-url="resolveTemplate(item.template)"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useFetch } from "../composables/useFetch";

// The tabs/accordion structure (labels, items, template paths) now comes
// from an external JSON file instead of being hardcoded in the component.
// Swap this URL for a remote HTTPS endpoint to serve it from an API instead.
const { data, error, loading, load } = useFetch(
  `${import.meta.env.BASE_URL}data/common-reply.json`,
);

onMounted(load);

// `data` holds the raw JSON array once loaded; fall back to an empty array
// while loading/erroring so the template's v-for has something safe to iterate.
const tabs = computed(() => data.value || []);

// The JSON stores template paths relative to /public (e.g.
// "templates/reply/tab1-item1.html"); this prepends Vite's BASE_URL so the
// fetch inside v-template-url works whether the site is hosted at a domain
// root or a sub-path.
function resolveTemplate(path) {
  return `${import.meta.env.BASE_URL}${path}`;
}
</script>
