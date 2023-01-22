<script setup lang="ts">
import router from '@/router';
import { socket } from '@/services/socket';
import { onUnmounted, onMounted, ref } from 'vue';
import type { ITodo } from '@/../types/todo';
import TodoItem from '@/components/TodoItem.vue';

if (!socket.connected) {
  // @TODO: This will be replaced once auth is persisted
  router.replace('/login');
}

let todos = ref<ITodo[]>([]);

socket.on('todos', (receivedTodos) => {
  console.log(receivedTodos)
  todos.value = receivedTodos;
})

onMounted(() => {
  socket.emit('request todos');
})

onUnmounted(() => {
  socket.off('todos');
})

function handleCreate() {
  socket.emit('new todo', {
    username: 'hi',
    body: 'new todo, nice',
  })
}

function handleDelete(id: ITodo["id"]) {
  socket.emit('delete todo', id)
}

</script>

<template>
  <ul class="todos">
    <TodoItem v-for="todo in todos" :todo="todo" :key="todo.id" @onDeleteClick="handleDelete" />
  </ul>
  <button @click="handleCreate" type="button">
    Create new todo
  </button>
</template>

<style scoped>
.todos {
  padding: 0;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: minmax(150px, auto);
}
</style>