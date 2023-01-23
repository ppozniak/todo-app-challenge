<script setup lang="ts">
import type { ITodo } from "types/todo";
import fontColorContrast from "font-color-contrast";

const props = defineProps<{ todo: ITodo }>();
const textColor = fontColorContrast(props.todo.color || "", 0.5);
</script>

<template>
  <li
    class="todo"
    :style="{ backgroundColor: props.todo.color, color: textColor }"
  >
    <div>
      <h2>{{ props.todo.title }}</h2>
      <p v-if="props.todo.body">
        {{ props.todo.body }}
      </p>
    </div>
    <footer>
      <address rel="author">
        {{ props.todo.username }}
      </address>
    </footer>
    <!-- @TODO: Show delete button only for author -->
    <button type="button" @click="$emit('onDeleteClick', props.todo.id)">
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
