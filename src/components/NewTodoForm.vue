<script setup lang="ts">
import { reactive } from 'vue';
import { socket } from '@/services/socket';
import type { ITodo } from 'types/todo';
import { useUserStore } from '@/stores/user';

type TCreateTodoForm = Omit<ITodo, 'id' | 'username'>

// @TODO: Add validation
const formValues = reactive<TCreateTodoForm>({
  title: '',
  body: '',
  color: '#0096ff',
})

const userStore = useUserStore()


function handleSubmit() {
  socket.emit('new todo', { ...formValues, username: userStore.username })
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="title">Title</label>
      <input type="text" id="title" v-model="formValues.title">
    </div>

    <div>
      <label for="body">Body</label>
      <input type="text" id="body" name="body" v-model="formValues.body">
    </div>

    <div>
      <label for="color">Colour</label>
      <input type="color" id="color" name="color" v-model="formValues.color">
    </div>

    <button type="submit">
      Create new todo
    </button>
  </form>
</template>

<style>

</style>