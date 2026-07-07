<template>
  <div>
    <h2 class="mb-3"><i class="bi bi-link-45deg me-2"></i>Common Links</h2>
    <p class="text-muted">
      Each category below is a Bootstrap "card" whose body is a collapsible
      panel (Bootstrap's <code>collapse</code> component - the modern
      replacement for the old Bootstrap 3 "panel").
    </p>

    <!-- Loading / error states for the remote/local JSON fetch -->
    <div v-if="loading" class="d-flex align-items-center gap-2 text-muted">
      <span class="spinner-border spinner-border-sm"></span> Loading links...
    </div>
    <div v-else-if="error" class="alert alert-danger">
      Failed to load common links: {{ error }}
      <button class="btn btn-sm btn-outline-danger ms-2" @click="load()">Retry</button>
    </div>

    <!-- 3) One collapsible card per category, data-driven from JSON -->
    <div v-else class="row g-3">
      <div class="col-md-6" v-for="category in data" :key="category.id">
        <div class="card shadow-sm">
          <div class="card-header d-flex justify-content-between align-items-center">
            <div>
              <h5 class="mb-0">{{ category.title }}</h5>
              <small class="text-muted">{{ category.description }}</small>
            </div>
            <!-- Bootstrap collapse trigger: data-bs-toggle + data-bs-target -->
            <button
              class="btn btn-sm btn-outline-secondary"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="'#collapse-' + category.id"
              :aria-expanded="false"
              :aria-controls="'collapse-' + category.id"
            >
              <i class="bi bi-chevron-down"></i>
            </button>
          </div>
          <!-- The collapsible body itself -->
          <div :id="'collapse-' + category.id" class="collapse">
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="link in category.links" :key="link.label">
                <a :href="link.url" class="text-decoration-none">
                  <i class="bi bi-arrow-right-short me-1"></i>{{ link.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFetch } from '../composables/useFetch'

// 4) Reading from a remote/local resource: this JSON lives in /public/data
// so it's served as a static file (e.g. https://your-bucket/data/common-links.json).
// import.meta.env.BASE_URL respects the Vite `base` config, so this resolves
// correctly whether the site is hosted at a domain root or a sub-path.
// Swap the URL for a full https://... endpoint to read from a remote API instead.
const { data, error, loading, load } = useFetch(`${import.meta.env.BASE_URL}data/common-links.json`)

onMounted(load)
</script>
