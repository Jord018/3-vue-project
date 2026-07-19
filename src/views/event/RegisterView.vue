<script setup lang="ts">
import { useRouter } from 'vue-router'
import { toRefs } from 'vue'
import { type Event } from '@/types'
const router = useRouter()
const props = defineProps<{
    event: Event
} > () 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
const register = () => {
  // If the Registration API call successful
  // push back to the event details view
  router.push({ name: 'event-detail-view'})
}
</script>
<template>
  <p>Register event here</p>
  <button @click="register">Register</button>
</template>