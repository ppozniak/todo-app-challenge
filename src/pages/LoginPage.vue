<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { socket } from "@/services/socket";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

// @TODO: Add persistance to user and redirect to board if logged in
const userStore = useUserStore();
const router = useRouter();

let username = ref("");
let loading = ref(false);
let errorMessage = ref("");

function handleSubmit() {
  loading.value = true;
  errorMessage.value = "";

  socket.auth = { username: username.value };
  socket.connect();
}

// @TODO: Split this into a hook?
socket.on("connect_error", (error) => {
  console.log(error);
  errorMessage.value = error.message;
  loading.value = false;
});

socket.on("connect", () => {
  console.log("Should not fire... sus");
  loading.value = false;
  userStore.login(username.value);
  router.replace("/board");
});

onUnmounted(() => {
  socket.off("connect_error");
  socket.off("connect");
});
</script>

<template>
  <main class="container">
    <div class="mx-auto mt-8 md:mt-[10vh] max-w-xl">
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
        <div class="flex flex-col">
          <label class="label" for="username">Username</label>
          <input
            class="input"
            type="text"
            v-model="username"
            id="username"
            placeholder="Enter your username..."
          />
        </div>

        <button type="submit" class="button">Login</button>
      </form>

      <strong
        class="px-4 py-1 rounded-sm mt-4 inline-block"
        :class="{ 'bg-red-700': !!errorMessage }"
        :aria-live="errorMessage ? 'polite' : 'off'"
        v-if="errorMessage || loading"
      >
        {{ errorMessage || "Joining... please wait." }}
      </strong>
    </div>
  </main>
</template>
