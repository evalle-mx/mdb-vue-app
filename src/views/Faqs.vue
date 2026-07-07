<template>
  <div>
    <h2 class="mb-3"><i class="bi bi-question-circle me-2"></i>Frequently Asked Questions</h2>
    <p class="text-muted">Grouped into 5 main topics, each with its own panel list (accordion).</p>

    <div v-if="loading" class="d-flex align-items-center gap-2 text-muted">
      <span class="spinner-border spinner-border-sm"></span> Loading FAQs...
    </div>
    <div v-else-if="error" class="alert alert-danger">
      Failed to load FAQs: {{ error }}
      <button class="btn btn-sm btn-outline-danger ms-2" @click="load()">Retry</button>
    </div>

    <div v-else class="row g-4">
      <div class="col-lg-6" v-for="topic in data" :key="topic.id">
        <div class="card shadow-sm h-100">
          <div class="card-header bg-primary-subtle">
            <h5 class="mb-0">{{ topic.title }}</h5>
          </div>
          <div class="card-body">
            <!-- Each topic gets its own independent accordion of Q&A panels -->
            <div class="accordion" :id="'faq-' + topic.id">
              <div class="accordion-item" v-for="(panel, i) in topic.panels" :key="i">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    :class="{ collapsed: i !== 0 }"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#faq-' + topic.id + '-' + i"
                    :aria-expanded="i === 0"
                  >
                    {{ panel.q }}
                  </button>
                </h2>
                <div
                  :id="'faq-' + topic.id + '-' + i"
                  class="accordion-collapse collapse"
                  :class="{ show: i === 0 }"
                  :data-bs-parent="'#faq-' + topic.id"
                >
                  <div class="accordion-body">{{ panel.a }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFetch } from '../composables/useFetch'

// FAQ content is data-driven from JSON too - same reusable useFetch composable
// used across views for remote/local resource loading.
const { data, error, loading, load } = useFetch(`${import.meta.env.BASE_URL}data/faqs.json`)

onMounted(load)
</script>
