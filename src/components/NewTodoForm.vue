<script setup lang="ts">
import { computed, reactive } from "vue";
import { socket } from "@/services/socket";
import type { ITodo } from "types/todo";
import { useUserStore } from "@/stores/user";
import fontColorContrast from "font-color-contrast";

type TCreateTodoForm = Omit<ITodo, "id" | "username">;

// @TODO: Add validation, prevent submit if empty
// @TODO: Max and min values
// @TODO: Add ability to toggle this "popup"
// @TODO: Clear values after sending
const formValues = reactive<TCreateTodoForm>({
  title: "",
  body: "",
  color: "#fefefe",
});

const textColor = computed(() => {
  return fontColorContrast(formValues.color || "", 0.5);
});

const userStore = useUserStore();

function handleSubmit() {
  socket.emit("new todo", { ...formValues, username: userStore.username });
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="border-black p-4 md:rounded-md mb-4 md:max-w-sm space-y-4 md:border md:fixed md:bottom-6 md:right-6 bg-slate-800 md:shadow-md md:z-10"
    :style="{ color: textColor, backgroundColor: formValues.color }"
  >
    <h2>Add new todo</h2>
    <div class="flex flex-col">
      <label class="label" for="title">Title</label>
      <input
        class="input"
        type="text"
        id="title"
        v-model="formValues.title"
        placeholder="Buy chickems"
      />
    </div>

    <div class="flex flex-col">
      <label class="label" for="body">Body</label>
      <textarea
        class="input"
        id="body"
        name="body"
        v-model="formValues.body"
        placeholder="Go to a shop and get a lot of them"
      ></textarea>
    </div>

    <div class="flex gap-2 items-center">
      <label class="label" for="color">Colour</label>
      <input
        class="bg-slate-400 border border-black shadow-md"
        type="color"
        id="color"
        name="color"
        v-model="formValues.color"
      />
    </div>

    <button
      type="submit"
      class="button w-full bg-black border border-slate-400 text-white hover:bg-slate-900"
    >
      Add
    </button>
  </form>
</template>
