<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService'
const event = ref<Event | null>(null)
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
  .catch((err) => {
    console.log('there was an error!',err)
  })
})
</script>
<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <router-link :to="{name: 'event-detail-view', param: {id}}">Details</router-link>|
      <router-link :to="{name: 'event-register-view', param: {id}}">Register</router-link>
      <router-link :to="{name: 'event-edit-view', param: {id}}">Edit</router-link>
    </nav>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>