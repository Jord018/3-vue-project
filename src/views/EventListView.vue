<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import category_organize from './../components/category_organize.vue'
import type { Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageSize = computed(() => parseInt(route.query.pageSize as string) || 2)
const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 3)
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
  EventService.getEvents(3, page.value)
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
  <div class="events">
  <h1>Events For Good</h1>
  <div class="page-size-selector">
    Items per page:
    <RouterLink :to="{ name: 'event-list-view', query: { page: 1, pageSize: 1 }}">1</RouterLink> |
    <RouterLink :to="{ name: 'event-list-view', query: { page: 1, pageSize: 2 }}">2</RouterLink>
  </div>

    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <category_organize v-for="event in events" :key="event.id" :event="event" />
  <div class="pagination">
  <RouterLink
  id="page-prev"
  :to="{ name: 'event-list-view', query: { page: page - 1, pageSize: pageSize } }"
  rel="prev"
  v-if="page != 1"
>
  Prev Page
</RouterLink>

<RouterLink
  id="page-next"
  :to="{ name: 'event-list-view', query: { page: page + 1, pageSize: pageSize } }"
  rel="next"
  v-if="hasNextPage"
>
  Next Page,
</RouterLink>
    </div>
  </div>
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
.page-size-selector {
  margin-bottom: 20px;
}
</style>
