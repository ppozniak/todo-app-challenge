<script setup lang="ts">
import type { ITodo } from 'types/todo';

const { todo } = defineProps<{
  todo: ITodo,
}>()

const { id, body, username } = todo;

</script>  

<template>
  <li class="todo">
    <div>
      {{ body }}
    </div>
    <footer>
      <address rel="author">
        {{ username }}
      </address>
    </footer>
    <!-- @TODO: Show delete button only for author -->
    <button type="button" @click="$emit('onDeleteClick', id)">
      Delete that
    </button>
  </li>
</template>

<style scoped>
.todo {
  padding: 0.3rem;
  background-color: yellow;
  list-style-type: none;
}
</style>