<script setup lang="ts">
import { ref,onMounted } from 'vue'
import StudentService from '@/services/StudentService'
import Student from '@/components/StudentCard.vue'


const students = ref<[] | null>(null)

onMounted(() => {
    StudentService.getEvents()
    .then((response) => {
      students.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})

</script>

<template>
  <h1>Student</h1>
  <div class="students">
    <Student v-for="student in students" :key="student.id" :student="student" />
  </div>
</template>
<style scoped>
.students {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
