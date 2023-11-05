<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li
          :class="{ 'is-active': !register }"
          @click.prevent="register = false"
        >
          <a>Login</a>
        </li>
        <li :class="{ 'is-active': register }" @click.prevent="register = true">
          <a>Register</a>
        </li>
      </ul>
    </div>
    <div class="tcard auth-form">
      <div class="card-content">
        <div class="title has-text-centered">{{ formTitle }}</div>
        <form @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                v-model="credintials.email"
                class="input"
                type="email"
                placeholder="e.g. alexsmith@gmail.com"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                class="input"
                type="password"
                v-model="credintials.password"
                placeholder="Passsword"
              />
            </div>
          </div>
          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <button class="button is-primary">{{ formTitle }}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, reactive } from "vue";
import { useStoreAuth } from "@/stores/storeAuth";

const storeAuth = useStoreAuth();
const register = ref(false);
const formTitle = computed(() => {
  return register.value ? "Register" : "Login";
});
const credintials = reactive({
  email: "",
  password: "",
});
const onSubmit = () => {
  if (!credintials.email || !credintials.password) {
    alert("Please enter an email and an password darnit!");
  } else {
    if (register.value) {
        storeAuth.registerUser(credintials)
    } else {
        storeAuth.loginUser(credintials)
    }
  }
};
</script>
<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
