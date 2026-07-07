import { createRouter, createWebHashHistory } from "vue-router";

// Views (lazy-loaded so each route is its own JS chunk - good for a static
// site since the initial bundle stays small)
const Home = () => import("../views/Home.vue");
const CommonLinks = () => import("../views/CommonLinks.vue");
const CommonReply = () => import("../views/CommonReply.vue");
const Faqs = () => import("../views/Faqs.vue");
const Gallery = () => import("../views/Gallery.vue");

const routes = [
  { path: "/", name: "home", component: Home, meta: { title: "Home" } },
  {
    path: "/common-links",
    name: "common-links",
    component: CommonLinks,
    meta: { title: "Common Links" },
  },
  {
    path: "/common-reply",
    name: "common-reply",
    component: CommonReply,
    meta: { title: "Common Reply" },
  },
  { path: "/faqs", name: "faqs", component: Faqs, meta: { title: "FAQs" } },
  {
    path: "/gallery",
    name: "gallery",
    component: Gallery,
    meta: { title: "Gallery" },
  },
  {
    path: "/macros",
    name: "macros",
    component: () => import("../views/Macros.vue"),
    meta: { title: "Macros" },
  },
  // Catch-all -> redirect unknown paths home (nice to have for a static site)
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

// NOTE on history mode for S3:
// We use createWebHashHistory() (URLs like /index.html#/faqs) instead of
// createWebHistory(). Plain S3 static website hosting has no server-side
// routing, so a direct link/refresh on '/faqs' would 404 with history mode
// unless you configure the S3 "Error document" to index.html (and ideally
// front the bucket with CloudFront to return 200 instead of 404/403).
// Hash history sidesteps all of that and works out-of-the-box on S3.
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// Keep the browser tab title in sync with the active route
router.afterEach((to) => {
  document.title = to.meta.title
    ? `${to.meta.title} · Vue Static Site`
    : "Vue Static Site";
});

export default router;
