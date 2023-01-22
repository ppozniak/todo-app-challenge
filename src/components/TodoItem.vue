<script setup lang="ts">
import type { ITodo } from 'types/todo';
import fontColorContrast from 'font-color-contrast'

const { todo } = defineProps<{
  todo: ITodo,
}>()

const { id, body, username, title, color } = todo;
const textColor = fontColorContrast(color || '', 0.5);
</script>  

<template>
  <li class="todo" :style="{ backgroundColor: color, color: textColor }">
    <div>
      <h2>{{ title }}</h2>
      <p v-if="body">
        {{ body }}
      </p>
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
  background-color: #fefefe;
    color: #000;
  list-style-type: none;
}
</style>