<template>
  <!-- Bootstrap 5 responsive navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">
        <i class="bi bi-boxes me-1"></i> MDB Intercom
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNavbar"
        aria-controls="mainNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="mainNavbar" class="collapse navbar-collapse">
        <!-- 1) The 5 route links -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/" exact-active-class="active"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/common-reply"
              active-class="active"
              >Common Reply</router-link
            >
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/common-links"
              active-class="active"
              >Common Links</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/faqs" active-class="active"
              >FAQs</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/gallery" active-class="active"
              >Images</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/macros" active-class="active"
              >Macros</router-link
            >
          </li>
        </ul>

        <!-- 2) Three icons, each opens its own Bootstrap modal.
             data-bs-toggle="modal" + data-bs-target is all Bootstrap needs;
             no extra JS wiring required, it's handled by bootstrap.bundle.js. -->
        <div class="d-flex gap-3">
          <a
            href="#"
            class="text-light fs-5"
            title="Quick Search"
            data-bs-toggle="modal"
            data-bs-target="#searchModal"
            @click.prevent
          >
            <i class="bi bi-search"></i>
          </a>

          <a
            href="#"
            class="text-light fs-5"
            title="Info"
            data-bs-toggle="modal"
            data-bs-target="#infoModal"
            @click.prevent
          >
            <i class="bi bi-info-circle"></i>
          </a>
          <a
            href="#"
            class="text-light fs-5"
            title="Contact"
            data-bs-toggle="modal"
            data-bs-target="#contactModal"
            @click.prevent
          >
            <i class="bi bi-envelope"></i>
          </a>
          <a
            href="#"
            class="text-light fs-5"
            title="Settings"
            data-bs-toggle="modal"
            data-bs-target="#settingsModal"
            @click.prevent
          >
            <i class="bi bi-gear"></i>
          </a>

          <form
            class="d-flex"
            action="https://www.google.com/search"
            method="GET"
            target="_blank"
          >
            <input
              class="form-control me-2"
              type="search"
              name="q"
              placeholder="Search Google"
            />
            <button class="btn btn-outline-light">
              <i class="bi bi-search-heart-fill"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </nav>

  <!-- ===================== MODALS ===================== -->
  <!-- Each modal is a plain Bootstrap 5 modal markup block. They live here
       so they're available site-wide (site header renders on every route). -->

  <!-- Info modal -->
  <div
    class="modal fade"
    id="infoModal"
    tabindex="-1"
    aria-labelledby="infoModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="infoModalLabel">
            <i class="bi bi-info-circle me-2"></i>About this site
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            This is a demo static site built with Vue 3, Vue Router and
            Bootstrap 5, intended to be deployed to an AWS S3 static website
            bucket.
          </p>
          <p class="mb-0">
            Explore the navigation links above to see collapsible cards, tabs
            with accordions, FAQ panels and a JSON-driven image gallery.
          </p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Contact modal -->
  <div
    class="modal fade"
    id="contactModal"
    tabindex="-1"
    aria-labelledby="contactModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="contactModalLabel">
            <i class="bi bi-envelope me-2"></i>Contact us
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- Static demo form - wire up to your own backend/API/Lambda as needed -->
          <form @submit.prevent="submitContact">
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input
                v-model="contactForm.name"
                type="text"
                class="form-control"
                placeholder="Your name"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Message</label>
              <textarea
                v-model="contactForm.message"
                class="form-control"
                rows="3"
                placeholder="How can we help?"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="submitContact">
            Send
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Settings modal -->
  <div
    class="modal fade"
    id="settingsModal"
    tabindex="-1"
    aria-labelledby="settingsModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="settingsModalLabel">
            <i class="bi bi-gear me-2"></i>Settings
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-check form-switch mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              id="darkModeSwitch"
              v-model="settings.darkMode"
            />
            <label class="form-check-label" for="darkModeSwitch"
              >Dark mode (demo only)</label
            >
          </div>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="notifSwitch"
              v-model="settings.notifications"
            />
            <label class="form-check-label" for="notifSwitch"
              >Enable notifications (demo only)</label
            >
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Search modal -->
  <!-- A single text input plus a grid of "search engine" buttons loaded from
       an external JSON file (public/data/search-engines.json). Buttons are
       grouped by their `source` field (in a fixed display order) with an
       <hr> separating each group, mirroring the reference vanilla-JS version. -->
  <div
    class="modal fade"
    id="searchModal"
    tabindex="-1"
    aria-labelledby="searchModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="searchModalLabel">
            <i class="bi bi-search me-2"></i>Quick Search
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- The simple query form. We prevent default submit (no page
               reload) - buttons below read this input's value on click. -->
          <form class="mb-4" @submit.prevent>
            <label for="searchQueryInput" class="form-label">Query:</label>
            <input
              id="searchQueryInput"
              v-model="searchQuery"
              type="text"
              class="form-control"
              placeholder="Type a search term..."
              @keyup.enter.prevent
            />
          </form>

          <div
            v-if="searchEnginesLoading"
            class="d-flex align-items-center gap-2 text-muted"
          >
            <span class="spinner-border spinner-border-sm"></span> Loading
            search engines...
          </div>
          <div v-else-if="searchEnginesError" class="alert alert-danger">
            Failed to load search engines: {{ searchEnginesError }}
            <button
              class="btn btn-sm btn-outline-danger ms-2"
              @click="loadSearchEngines()"
            >
              Retry
            </button>
          </div>

          <!-- One block per source group, separated by <hr> -->
          <div v-else>
            <div
              v-for="(group, index) in groupedSearchEngines"
              :key="group.source"
            >
              <h5 class="mb-3">{{ group.source }}</h5>
              <div class="d-flex flex-wrap gap-2">
                <button
                  v-for="engine in group.items"
                  :key="engine._id"
                  type="button"
                  :class="[
                    'btn',
                    sourceButtonClasses[group.source] || 'btn-dark',
                    'btn-sm',
                  ]"
                  @click="handleSearch(engine)"
                >
                  {{ engine.label }}
                </button>
              </div>
              <hr v-if="index < groupedSearchEngines.length - 1" class="my-4" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useFetch } from "../composables/useFetch";

// Simple reactive state for the demo modals - replace with real logic/store as needed
const contactForm = reactive({ name: "", message: "" });
const settings = reactive({ darkMode: false, notifications: true });

function submitContact() {
  // Placeholder: wire this up to an API Gateway/Lambda endpoint, mailto link,
  // or a 3rd-party form service (Formspree, etc.) since S3 static hosting
  // has no server-side code of its own.
  console.log("Contact form submitted:", { ...contactForm });
  alert(
    `Thanks ${contactForm.name || "there"}! (demo only - not actually sent)`,
  );
}

/* ============================
   QUICK SEARCH MODAL
   ============================ */

// Bootstrap button class per "source" group (falls back to 'btn-dark')
const sourceButtonClasses = {
  "Cloud-Admin": "btn-success",
  Tools: "btn-warning",
  Documents: "btn-primary",
  External: "btn-secondary",
};

// Fixed display order for the source groups; any source not listed here
// still renders, just after these (via the "Other" bucket below)
const sourceOrder = ["Cloud-Admin", "Tools", "Documents", "External", "Other"];

// The search-engine list itself comes from an external JSON resource -
// same reusable useFetch composable used elsewhere in this project.
const {
  data: searchEngines,
  error: searchEnginesError,
  loading: searchEnginesLoading,
  load: loadSearchEngines,
} = useFetch(`${import.meta.env.BASE_URL}data/search-engines.json`);

onMounted(loadSearchEngines);

// The query typed into the "Query:" input
const searchQuery = ref("");

// Groups the flat engine list by `source`, in the order defined by
// sourceOrder, producing [{ source, items }, ...] for the template to render.
const groupedSearchEngines = computed(() => {
  const engines = searchEngines.value || [];

  const buckets = engines.reduce((acc, engine) => {
    const source = engine.source || "Other";
    if (!acc[source]) acc[source] = [];
    acc[source].push(engine);
    return acc;
  }, {});

  return sourceOrder
    .filter((source) => buckets[source]?.length)
    .map((source) => ({ source, items: buckets[source] }));
});

// Called when one of the search-engine buttons is clicked.
// Reads the current query, validates it isn't empty, swaps '<QUERY>' in the
// clicked engine's url for the (URL-encoded) query, and opens it in a new tab.
function handleSearch(engine) {
  const queryValue = searchQuery.value.trim();

  if (!queryValue) {
    alert("Please enter a search query!");
    return;
  }

  const finalUrl = engine.url.replace(
    /<QUERY>/g,
    encodeURIComponent(queryValue),
  );
  window.open(finalUrl, "_blank");
}
</script>
