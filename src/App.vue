<script setup lang="ts">
import { onUnmounted } from "vue";
import { RouterView } from "vue-router";
import { socket } from "@/services/socket";

onUnmounted(() => {
  socket.disconnect();
})
</script>

<template>
  <RouterView />
</template>
