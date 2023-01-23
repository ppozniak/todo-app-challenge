<script setup lang="ts">
import { onUnmounted } from "vue";
import { RouterView } from "vue-router";
import { socket } from "@/services/socket";
import "./index.css";

onUnmounted(() => {
  socket.disconnect();
});
</script>

<template>
  <header class="py-2 bg-emerald-700 bg-opacity-80 shadow-lg">
    <div class="container">
      <h1>TODO.io</h1>
    </div>
  </header>
  <RouterView />
</template>
