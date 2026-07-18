<script setup lang="ts">

defineProps<{
  student: []
}>()
</script>

<template>
  <div class="student-card">
    <div class="student-class">
      <h2>{{ student.name }}  {{ student.surname }}</h2>
    </div>
    <h2>{{ student.gpa }}</h2>
  </div>
</template>
<style scoped>
.student-class {
  display: flex;
}
.student-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.student-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
