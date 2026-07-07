<template>
  <div>
    <div class="p-5 mb-4 bg-body-tertiary rounded-3 border">
      <h1 class="display-6 fw-bold">MDB Intercom helper</h1>
      <p class="col-md-8 fs-5">
        A minimal starting point with client-side routing, ready to build and
        drop into an AWS S3 static-website bucket. Use the nav above to see each
        demo section. <br />
        <small>Vue 3 + Bootstrap 5 static site</small>
      </p>
    </div>

    <div class="row g-4">
      <div class="col-sm-6 col-lg-3" v-for="card in cards" :key="card.to">
        <router-link :to="card.to" class="text-decoration-none">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <i
                :class="[
                  'bi',
                  card.icon,
                  'fs-1',
                  'text-primary',
                  'mb-3',
                  'd-block',
                ]"
              ></i>
              <h5 class="card-title">{{ card.title }}</h5>
              <p class="card-text text-muted small">{{ card.description }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// Simple static navigation cards - purely presentational
const cards = [
  {
    to: "/common-reply",
    icon: "bi-chat-square-text",
    title: "Common Reply",
    description: "Tabs + accordions",
  },
  {
    to: "/common-links",
    icon: "bi-link-45deg",
    title: "Common Links",
    description: "Collapsible card panels",
  },
  {
    to: "/faqs",
    icon: "bi-question-circle",
    title: "FAQs",
    description: "Grouped panel lists",
  },
  {
    to: "/gallery",
    icon: "bi-images",
    title: "Images",
    description: "JSON-driven gallery",
  },
  {
    to: "/macros",
    icon: "bi-valentine2",
    title: "Macros",
    description: "Intercom Macros listed",
  },
];
</script>
