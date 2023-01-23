<script setup lang="ts">
import { socket } from "@/services/socket";
import { onUnmounted, onMounted, ref } from "vue";
import type { ITodo } from "@/../types/todo";
import TodoItem from "@/components/TodoItem.vue";
import NewTodoForm from "@/components/NewTodoForm.vue";
import { useRouter } from "vue-router";

// @TODO: Ability to logout

const router = useRouter();

if (!socket.connected) {
  // @TODO: This will be replaced once auth is persisted
  router.replace("/login");
}

let todos = ref<ITodo[]>([]);

socket.on("todos", (receivedTodos) => {
  todos.value = receivedTodos;
});

onMounted(() => {
  socket.emit("request todos");
});

onUnmounted(() => {
  socket.off("todos");
});

function handleDelete(id: ITodo["id"]) {
  socket.emit("delete todo", id);
}
</script>

<template>
  <NewTodoForm />

  <main class="container pt-4">
    <ul v-if="todos.length" class="todos">
      <TodoItem
        v-for="todo in todos"
        :todo="todo"
        :key="todo.id"
        @onDeleteClick="handleDelete"
      />
    </ul>
    <div v-else class="opacity-50 text-center md:mt-[10vh]">
      <div>Nothing to do? 🤥</div>
      <div>Better add some todos</div>
    </div>
  </main>
</template>

<style scoped>
.todos {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: minmax(150px, auto);
}
</style>
