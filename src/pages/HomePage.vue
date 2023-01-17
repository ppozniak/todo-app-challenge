<script setup lang="ts">
import { io } from "socket.io-client";

const socket = io("127.0.0.1:3000");
socket.on("connect", () => {
  console.log(`Connection established with id: ${socket.id}`);
});
</script>

<template>Home</template>
