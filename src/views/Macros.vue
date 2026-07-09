<template>
  <div>
    <h2 class="mb-3"><i class="bi bi-valentine2 me-2"></i>Macros</h2>
    <p class="text-muted">
      List of Intercom Macros, each with a title and description. The data is
      loaded from a JSON file via the same reusable
      <code>useFetch</code> composable used in other views.
    </p>

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
      <!-- Filter box: matches against macro number, title or tags -->
      <div class="mb-3">
        <label for="macroFilter" class="form-label">Filter:</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-search"></i></span>
          <input
            id="macroFilter"
            v-model="filterText"
            type="text"
            class="form-control"
            placeholder="Search by number, title or tag..."
          />
          <button
            v-if="filterText"
            class="btn btn-outline-secondary"
            type="button"
            title="Clear filter"
            @click="filterText = ''"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="form-text">
          {{ filteredMacros.length }} of {{ macros.length }} macros shown
        </div>
      </div>

      <!-- Message when the filter matches nothing -->
      <div v-if="filteredMacros.length === 0" class="alert alert-warning">
        No macros match "{{ filterText }}".
      </div>

      <!-- Accordion  -->
      <div v-else class="accordion" :id="'1-accordion'">
        <div
          class="accordion-item"
          v-for="(item, i) in filteredMacros"
          :key="item.number"
        >
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              :class="{ collapsed: i !== 0 }"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="'#macro-' + item.number"
              :aria-expanded="i === 0"
            >
              {{ item.number }}- {{ item.title }}
            </button>
          </h2>
          <div
            :id="'macro-' + item.number"
            class="accordion-collapse collapse"
            :data-bs-parent="'#1-accordion'"
          >
            <div
              v-if="item.template"
              class="accordion-body reply-body"
              v-template-url="resolveTemplate(item.template)"
            ></div>
            <div v-else class="accordion-body reply-body">
              <b>No Template</b> {{ item.tags }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useFetch } from "../composables/useFetch";
import { resolveTemplate } from "../assets/scripts/utils";

const { data, error, loading, load } = useFetch(
  `${import.meta.env.BASE_URL}data/intercom-macros.json`,
);

onMounted(load);

const macros = computed(() => data.value || []);

/* ============================
   FILTER / SEARCH
   ============================ */

// Bound to the filter input - matches on macro number, title or tags
const filterText = ref("");

// Filters `macros` against `filterText`, checking (in order):
//  - the macro's `number` (matched as a string, e.g. "51")
//  - the `title` (case-insensitive substring match)
//  - the `tags` array (case-insensitive substring match against any tag)
const filteredMacros = computed(() => {
  const query = filterText.value.trim().toLowerCase();
  if (!query) return macros.value;

  return macros.value.filter((item) => {
    const numberMatch = String(item.number ?? "")
      .toLowerCase()
      .includes(query);
    const titleMatch = (item.title ?? "").toLowerCase().includes(query);
    const tagsMatch = (item.tags ?? []).some((tag) =>
      String(tag).toLowerCase().includes(query),
    );

    return numberMatch || titleMatch || tagsMatch;
  });
});
</script>
