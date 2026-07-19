<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'
const event = ref<Event | null>(null)
const router = useRouter()
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})
onMounted(() => {
  EventService.getEvent(Number(props.id))
  .then((res) => {
    event.value = res.data
  })
  .catch(() => {
    router.push ({
      name: '404-resource-view',
      params: {
        resource: 'event'
      }
    })
  })
})
</script>
<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <RouterLink :to="{name: 'event-detail-view'}">Details</RouterLink>|
      <RouterLink :to="{name: 'event-register-view'}">Register</RouterLink>
      <RouterLink :to="{name: 'event-edit-view'}">Edit</RouterLink>
    </nav>
    <RouterView :event="event" />
  </div>
</template>