<template>
  <!-- Header lives outside <router-view> so it's present on every route -->
  <AppHeader />

  <main class="container my-4">
    <!-- transition adds a subtle fade between route changes -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>

  <footer class="bg-light border-top text-center py-3 mt-5">
    <small class="text-muted"
      >&copy; 2026 MongoDB Static Site &middot; Deployed on AWS S3</small
    >
  </footer>
</template>

<script setup>
import AppHeader from "./components/AppHeader.vue";
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
