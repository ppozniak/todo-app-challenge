<!-- @TODO: Add ability to toggle this "popup" -->
<script setup lang="ts">
import { computed, reactive } from "vue";
import { socket } from "@/services/socket";
import type { ITodo } from "types/todo";
import { useUserStore } from "@/stores/user";
import fontColorContrast from "font-color-contrast";

type TCreateTodoForm = Omit<ITodo, "id" | "username">;

const userStore = useUserStore();
const formValues = reactive<TCreateTodoForm>({
  title: "",
  body: "",
  color: "#155B44",
});

const textColor = computed(() => {
  return fontColorContrast(formValues.color || "", 0.5);
});

const isValid = computed(() => !!formValues.title.length);

function resetForm() {
  formValues.body = "";
  formValues.title = "";
}

function handleSubmit() {
  socket.emit("todos:create", { ...formValues, username: userStore.username });
  resetForm();
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="border-black md:rounded-md mb-4 md:max-w-sm md:border md:fixed md:bottom-6 md:right-6 bg-slate-800 md:shadow-md md:z-10"
    :style="{ color: textColor, backgroundColor: formValues.color }"
  >
    <header class="bg-black bg-opacity-20 px-4 py-3">
      <h2 class="font-bold drop-shadow-md">Add new todo</h2>
    </header>
    <div class="p-4 space-y-4">
      <div class="flex flex-col">
        <label class="label" for="title">Title</label>
        <input
          class="input"
          type="text"
          id="title"
          v-model="formValues.title"
          placeholder="Buy chimkens"
          maxlength="20"
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
          maxlength="80"
          rows="5"
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
        :disabled="!isValid"
      >
        Add
      </button>
    </div>
  </form>
</template>
