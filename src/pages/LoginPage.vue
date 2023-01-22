<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { socket } from '@/services/socket'
import router from "@/router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore()
// @TODO: Redirect to board if already logged in

let username = ref("");
let loading = ref(false)
let errorMessage = ref('')

function handleSubmit() {
  loading.value = true;
  errorMessage.value = '';

  socket.auth = { username: username.value }
  socket.connect();
}

socket.on("connect_error", (error) => {
  console.log(error);
  errorMessage.value = error.message;
  loading.value = false;
});

socket.on('connect', () => {
  loading.value = false;
  userStore.login(username.value);
  router.replace('/board')
})

onUnmounted(() => {
  socket.off('connect_error');
  socket.off('connect');
})
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label class="label" for="username">Username</label>
    <input type="text" v-model="username" id="username" placeholder="Enter your username..." />
    <button type="submit">Login</button>
    </form>
    <div v-if="loading">
      Joining... please wait.
  </div>
  <strong class="error" v-if="errorMessage">
    {{ errorMessage }}
  </strong>
</template>


<style scoped>
.label {
  display: block;
  font-weight: bold;
  margin-bottom: 3px;
}

.error {
  font-weight: bold;
  color: red;
}
</style>