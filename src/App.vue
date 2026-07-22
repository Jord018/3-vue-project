<script setup lang="ts">
import { RouterLink, RouterView} from 'vue-router'
import { useMessageStore } from '@/stores/message'
import {storeToRefs} from 'pinia'
const store = useMessageStore()
const { message } = storeToRefs(store)

</script>

<template>
  <div id="layout">
    <header>
      <div id="flashMessage" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav>
          <Router-Link :to="{name: 'event-list-view'}">Event</Router-Link>
          <Router-Link :to="{name: 'about'}">About</Router-Link>
          <Router-Link :to="{name: 'student'}">Student</Router-Link>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
#layout {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight:bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
h2 {
  font-size: 20px;
}
@keyframes yellowFade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}
#flashMessage {
  animation: yellowFade 3s ease-in-out;
}
</style>
