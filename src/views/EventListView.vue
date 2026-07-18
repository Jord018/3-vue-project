<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import category_organize from './../components/category_organize.vue'
import type { Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'


const events = ref<Event[] | null>(null)
const props = defineProps({
    page: {
        type: Number,
        required: true
    }
})
const page = computed (() => props.page)
onMounted(() => {
  watchEffect(() => {
  EventService.getEvents(1, page.value)
    .then((response) => {
      events.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <category_organize v-for="event in events" :key="event.id" :event="event" />
  </div>
  <RouterLink
  :to="{ name: 'event-list-view', query: { page: page - 1 } }"
  rel="prev"
  v-if="page != 1"
>
  Prev Page
</RouterLink>

<RouterLink 
  :to="{ name: 'event-list-view', query: { page: page + 1 } }" 
  rel="next"
>
  Next Page
</RouterLink>
</template>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
