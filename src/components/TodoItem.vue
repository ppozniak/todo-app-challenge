<script setup lang="ts">
import type { ITodo } from "types/todo";
import fontColorContrast from "font-color-contrast";
import CheckIcon from "@heroicons/vue/20/solid/CheckIcon";

const props = defineProps<{ todo: ITodo }>();
const textColor = fontColorContrast(props.todo.color || "", 0.5);
</script>

<template>
  <li
    class="p-4 shadow-lg flex flex-col min-h-[100px] relative group"
    :style="{ backgroundColor: props.todo.color, color: textColor }"
  >
    <div>
      <h2 class="text-xl font-bold break-all">{{ props.todo.title }}</h2>
      <p v-if="props.todo.body">
        {{ props.todo.body }}
      </p>
    </div>

    <footer class="mt-auto text-right text-sm opacity-70">
      <address class="not-italic">
        Created by: {{ props.todo.username }}
      </address>
    </footer>

    <!-- @TODO: Show delete button only for author -->
    <button
      class="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center border-slack border invisible opacity-0 group-hover:opacity-100 group-hover:visible shadow-lg hover:bg-slate-200 transition-all text-black"
      type="button"
      @click="$emit('onDeleteClick', props.todo.id)"
      aria-label="Remove this todo"
      title="Remove this todo"
    >
      <CheckIcon />
    </button>
  </li>
</template>
