<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import category_organize from './../components/category_organize.vue'
import type { Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'


const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  return page.value < totalPages
})
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
      totalEvents.value = response.headers['x-total-count']
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="pagination">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <category_organize v-for="event in events" :key="event.id" :event="event" />
  </div>
  <RouterLink
  id="page-prev"
  :to="{ name: 'event-list-view', query: { page: page - 1 } }"
  rel="prev"
  v-if="page != 1"
>
  Prev Page
</RouterLink>

<RouterLink
  id="page-next"
  :to="{ name: 'event-list-view', query: { page: page + 1 } }"
  rel="next"
  v-if="hasNextPage"
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
.pagination {
    display: flex;
    width: 290px;
}

.pagination a {
    flex: 1;
    text-decoration: none;
    color: #2c3e50;
}

#page-prev {
    text-align: left;
}

#page-next {
    text-align: right;
}
</style>
