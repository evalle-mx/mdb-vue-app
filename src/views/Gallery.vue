<template>
  <div>
    <h2 class="mb-3"><i class="bi bi-images me-2"></i>Image Gallery</h2>
    <p class="text-muted">
      This grid is built entirely from an external JSON resource
      (<code>/public/data/gallery.json</code> by default - point it at any
      remote HTTPS endpoint instead and it works the same way).
    </p>

    <div v-if="loading" class="d-flex align-items-center gap-2 text-muted">
      <span class="spinner-border spinner-border-sm"></span> Loading gallery...
    </div>
    <div v-else-if="error" class="alert alert-danger">
      Failed to load gallery: {{ error }}
      <button class="btn btn-sm btn-outline-danger ms-2" @click="load()">Retry</button>
    </div>

    <div v-else class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
      <div class="col" v-for="img in data" :key="img.id">
        <div class="card h-100 shadow-sm">
          <!-- Clicking a thumbnail opens the shared modal below with the
               full-size image. We set `selected` first (in the Vue click
               handler), then Bootstrap's own delegated click handler (from
               data-bs-toggle) opens the modal - both fire on the same click,
               in that order, since this button's own listener runs before
               the document-level one during DOM event bubbling. -->
          <img
            :src="img.thumb"
            :alt="img.title"
            class="card-img-top gallery-thumb"
            data-bs-toggle="modal"
            data-bs-target="#imagePreviewModal"
            @click="selected = img"
          />
          <div class="card-body py-2">
            <p class="card-text small mb-0 text-truncate">{{ img.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Single shared modal, its content swaps based on `selected` -->
    <div class="modal fade" id="imagePreviewModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content" v-if="selected">
          <div class="modal-header">
            <h5 class="modal-title">{{ selected.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <img :src="selected.full" :alt="selected.title" class="img-fluid rounded mb-3" />
            <p class="text-muted mb-0">{{ selected.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useFetch } from '../composables/useFetch'

// currently-selected image shown in the preview modal
const selected = ref(null)

// Swap this URL for a remote endpoint (e.g. 'https://api.example.com/gallery')
// to demonstrate reading images from a remote HTTP resource instead of a
// local /public file - useFetch() works identically either way.
const { data, error, loading, load } = useFetch(`${import.meta.env.BASE_URL}data/gallery.json`)

onMounted(load)
</script>
