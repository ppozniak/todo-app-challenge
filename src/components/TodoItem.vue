<script setup lang="ts">
import type { ITodo } from "types/todo";
import fontColorContrast from "font-color-contrast";

const props = defineProps<{ todo: ITodo }>();
const textColor = fontColorContrast(props.todo.color || "", 0.5);
</script>

<template>
  <li
    class="p-4 shadow-lg flex flex-col min-h-[100px] relative group"
    :style="{ backgroundColor: props.todo.color, color: textColor }"
  >
    <div>
      <h2 class="text-xl font-bold">{{ props.todo.title }}</h2>
      <p v-if="props.todo.body">
        {{ props.todo.body }}
      </p>
    </div>
    <footer class="mt-auto text-right text-sm opacity-70">
      <address class="not-italic">
        {{ props.todo.username }}
      </address>
    </footer>
    <!-- @TODO: Show delete button only for author -->
    <button
      class="absolute top-1 right-1 bg-white rounded-full w-8 h-8 flex items-center justify-center border-slack border invisible opacity-0 group-hover:opacity-100 group-hover:visible shadow-lg text-black text-3xl hover:bg-slate-200 transition-all"
      type="button"
      @click="$emit('onDeleteClick', props.todo.id)"
      aria-label="Remove this todo"
      title="Remove this todo"
    >
      &times;
    </button>
  </li>
</template>
