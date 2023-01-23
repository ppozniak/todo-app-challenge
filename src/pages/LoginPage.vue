<script setup lang="ts">
import { ref } from "vue";
import { useSocketConnect } from "@/composables/use-socket-connect";

// @TODO: Add persistance to user and redirect to board if logged in

let username = ref("");
const { loading, errorMessage, connect } = useSocketConnect(username);
</script>

<template>
  <main class="container">
    <div class="mx-auto mt-8 md:mt-[10vh] max-w-xl">
      <form @submit.prevent="connect" class="flex flex-col gap-2">
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
        :class="{ 'bg-red-700 text-white': !!errorMessage }"
        :aria-live="errorMessage ? 'polite' : 'off'"
        v-if="errorMessage || loading"
      >
        {{ errorMessage || "Joining... please wait." }}
      </strong>
    </div>
  </main>
</template>
