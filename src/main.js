import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// --- Bootstrap 5 ---
// CSS gives us the grid, cards, accordions, tabs, modals, utilities, etc.
// The JS bundle (includes Popper) powers the interactive bits: collapse,
// tabs, modals, dropdowns - all driven declaratively via data-bs-* attributes.
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Project-level overrides / tweaks on top of Bootstrap
import './assets/styles/custom.css'

// Custom directive that mimics AngularJS's `templateUrl`: fetches an external
// HTML partial and injects it into the element it's bound to.
// See src/directives/templateUrl.js for details.
import templateUrlDirective from './directives/templateUrl'

const app = createApp(App)

app.use(router)
app.directive('template-url', templateUrlDirective)

app.mount('#app')
