<script setup lang="ts">
import { useRouter } from 'vue-router'
import { toRefs } from 'vue'
import { type Event } from '@/types'
import { useMessageStore} from '@/stores/message'
const router = useRouter()
const props = defineProps<{
    event: Event
} > () 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
const store = useMessageStore()
const register = () => {
  store.updateMessage(`you are successfully registered for the ${props.event.title}!`)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.event.id }})
}
</script>
<template>
  <p>Register event here</p>
  <button @click="register">Register</button>
</template>