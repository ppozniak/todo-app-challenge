<script setup lang="ts">
import router from '@/router';
import { socket } from '@/services/socket';
import { onUnmounted, onMounted, ref } from 'vue';
import type { ITodo } from '@/../types/todo';

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

</script>

<!-- @TODO: Create new todo -->
<!-- @TODO: Removing todos -->

<template>
  <!-- @TODO: Aria label for author? -->
  <ul class="todos">
    <li v-for="{ body, username } in todos" class="todo">
      <div>
        {{ body }}
      </div>
      <footer>
        <address rel="author">
          {{ username }}
        </address>
      </footer>
    </li>
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

.todo {
  padding: 0.3rem;
  background-color: yellow;
  list-style-type: none;
}
</style>