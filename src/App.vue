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
  <header class="py-2 bg-slate-300 bg-opacity-80 shadow-lg font-bold">
    <div class="container">
      <h1>TODO.io</h1>
    </div>
  </header>
  <RouterView />
</template>
