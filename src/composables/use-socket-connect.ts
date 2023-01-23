import { socket } from "@/services/socket";
import { useUserStore } from "@/stores/user";
import { onUnmounted, ref, type Ref } from "vue";
import { useRouter } from "vue-router";

export const useSocketConnect = (username: Ref<string>) => {
  const loading = ref(false);
  const errorMessage = ref("");

  const userStore = useUserStore();
  const router = useRouter();

  socket.on("connect_error", (error) => {
    console.log(error);
    errorMessage.value = error.message;
    loading.value = false;
  });

  socket.on("connect", () => {
    loading.value = false;
    userStore.login(username.value);
    router.replace("/board");
  });

  onUnmounted(() => {
    socket.off("connect_error");
    socket.off("connect");
  });

  function connect() {
    loading.value = true;
    errorMessage.value = "";

    socket.auth = { username: username.value };
    socket.connect();
  }

  return {
    connect,
    loading,
    errorMessage,
    username,
  };
};
