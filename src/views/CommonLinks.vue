<template>
  <div>
    <h2 class="mb-3"><i class="bi bi-link-45deg me-2"></i>Common Links</h2>
    <p class="text-muted">
      Customer-facing MongoDB references, organized by task. Select a category
      to browse its documentation and support links.
    </p>

    <!-- Loading / error states for the remote/local JSON fetch -->
    <div v-if="loading" class="d-flex align-items-center gap-2 text-muted">
      <span class="spinner-border spinner-border-sm"></span> Loading links...
    </div>
    <div v-else-if="error" class="alert alert-danger">
      Failed to load common links: {{ error }}
      <button class="btn btn-sm btn-outline-danger ms-2" @click="load()">Retry</button>
    </div>

    <template v-else>
      <div class="d-flex flex-column flex-sm-row gap-2 justify-content-between align-items-sm-center mb-3">
        <div class="input-group common-links-search">
          <span class="input-group-text" aria-hidden="true"><i class="bi bi-search"></i></span>
          <input
            v-model="searchTerm"
            class="form-control"
            type="search"
            placeholder="Search links and categories"
            aria-label="Search common links"
          >
        </div>
        <button class="btn btn-outline-secondary flex-shrink-0" type="button" @click="toggleAll">
          <i :class="allVisible ? 'bi bi-arrows-collapse' : 'bi bi-arrows-expand'" class="me-2" aria-hidden="true"></i>
          {{ allVisible ? 'Collapse all' : 'Expand all' }}
        </button>
      </div>

      <p v-if="searchTerm && !filteredCategories.length" class="text-muted mb-0">
        No links match “{{ searchTerm }}”.
      </p>

      <!-- One collapsible card per category, data-driven from JSON -->
      <div v-else class="row g-3">
        <div class="col-md-6" v-for="category in filteredCategories" :key="category.id">
          <div class="card shadow-sm">
            <div class="card-header d-flex justify-content-between align-items-center">
              <div>
                <h5 class="mb-0">{{ category.title }}</h5>
                <small class="text-muted">{{ category.description }}</small>
              </div>
              <button
                class="btn btn-sm btn-outline-secondary"
                type="button"
                @click="toggleCategory(category.id)"
                :aria-expanded="isExpanded(category.id)"
                :aria-controls="'collapse-' + category.id"
              >
                <span class="visually-hidden">{{ isExpanded(category.id) ? 'Collapse' : 'Expand' }} {{ category.title }}</span>
                <i :class="isExpanded(category.id) ? 'bi bi-chevron-up' : 'bi bi-chevron-down'" aria-hidden="true"></i>
              </button>
            </div>
            <div
              :id="'collapse-' + category.id"
              class="collapse"
              :class="{ show: isExpanded(category.id) }"
            >
              <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="link in category.links" :key="link.label">
                  <a
                    :href="link.url"
                    class="text-decoration-none d-inline-flex align-items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="bi bi-box-arrow-up-right me-2 small" aria-hidden="true"></i>{{ link.label }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useFetch } from '../composables/useFetch'

// 4) Reading from a remote/local resource: this JSON lives in /public/data
// so it's served as a static file (e.g. https://your-bucket/data/common-links.json).
// import.meta.env.BASE_URL respects the Vite `base` config, so this resolves
// correctly whether the site is hosted at a domain root or a sub-path.
// Swap the URL for a full https://... endpoint to read from a remote API instead.
const { data, error, loading, load } = useFetch(`${import.meta.env.BASE_URL}data/common-links.json`)
const searchTerm = ref('')
const expandedCategories = ref(new Set())

const filteredCategories = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()
  if (!query) return data.value ?? []

  return (data.value ?? []).flatMap((category) => {
    const categoryMatches = [category.title, category.description]
      .some((text) => text.toLowerCase().includes(query))
    const links = categoryMatches
      ? category.links
      : category.links.filter((link) => link.label.toLowerCase().includes(query))

    return categoryMatches || links.length ? [{ ...category, links }] : []
  })
})

const allVisible = computed(() => {
  const categories = data.value ?? []
  return categories.length > 0 && categories.every((category) => expandedCategories.value.has(category.id))
})

function isExpanded(categoryId) {
  return expandedCategories.value.has(categoryId)
}

function toggleCategory(categoryId) {
  const next = new Set(expandedCategories.value)
  next.has(categoryId) ? next.delete(categoryId) : next.add(categoryId)
  expandedCategories.value = next
}

function toggleAll() {
  expandedCategories.value = allVisible.value
    ? new Set()
    : new Set((data.value ?? []).map((category) => category.id))
}

watch(searchTerm, (query) => {
  if (query.trim()) {
    expandedCategories.value = new Set(filteredCategories.value.map((category) => category.id))
  }
})

watch(data, (categories) => {
  if (categories?.length && !expandedCategories.value.size) {
    expandedCategories.value = new Set([categories[0].id])
  }
})

onMounted(load)
</script>

<style scoped>
.common-links-search {
  max-width: 32rem;
}
</style>
