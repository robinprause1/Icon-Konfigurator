<template>
  <div>
    <div @click="this.$router.push('/')" class="d-flex row button-pointer z-index-1000 bg-primary rounded-4 ms-2 mt-2 shadow position-absolute px-2 text-white align-items-center">
      <i class="material-symbols-rounded display-4 w-auto">library_add</i>
      <div class="w-auto">zum Konfigurator</div>
    </div>
    <div class="vh-100 bg-image d-flex vw-100 align-items-center justify-content-center">
      <div class="col-12 col-md-8 p-3 position-absolute card border-0 shadow p-2 rounded-4">
        <div class="alert alert-success" role="alert" v-if="serverConfirm">
          {{ serverConfirm }}
        </div>
        <div class="row m-0 align-items-center">
          <div class="col-12 col-md-4 bg-primary rounded-3 ms-0 row">
            <img src="../assets/img/login_background.png" class="p-2 col-6 col-md-12 p-4 ratio-1x1 px-0 px-sm-4 p-md-2" alt="background image"/>
            <p class="text-white pt-2 col-6 col-md-12 align-self-center">Logge dich ein um bereits erstellt Icons wiederzufinden und Favoriten zu speichern</p>
          </div>
          <div class="col-12 col-md-8 pe-0 ps-0 ps-md-4">
            <h1 class="pt-2">Icon Konfigurator</h1>
            <h3 class="pb-2 text-grey">Einloggen</h3>
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label" for="username">Nutzername</label>
                <input class="form-control shadow-none" id="username" type="text" placeholder="Nutzername" v-model="user.username"
                      required/>
              </div>
              <div class="mb-3">
                <label class="form-label" for="password">Password</label>
                <input class="form-control shadow-none" id="password" type="password" placeholder="Passwort" v-model="user.password"
                      required/>
              </div>
              <div class="d-flex justify-content-end align-content-center">
                <router-link to="/register" class="text-decoration-none text-center align-self-center me-4">Jetzt registrieren</router-link>
                <button class="btn btn-primary btn-lg" id="loginButton" type="submit">Einloggen</button>
              </div>
            </form>
            <div class="alert alert-danger mt-2" role="alert" v-if="serverError">
              {{ serverError }}
            </div>
            <div class="alert alert-danger mt-2" role="alert" v-if="errorMsg">
              {{ errorMsg }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from '@/models/user';

export default {
  name: 'LoginViewV2',
  data() {
    return {
      user: new User('', ''),
      serverError: '',
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    serverConfirm(){
      return this.$store.state.message.message;
    },
    errorMsg(){
      return this.$store.state.message.error;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      if (this.user.username && this.user.password) {
        this.$store.dispatch('auth/login', this.user)
        .then(
            () => {
              this.$router.push('/profile');
              this.$store.commit('message/setMessage', '');
            },
            error => {
              this.serverError = error.response.data.message;
            }
        );
      }
    },
  }
}
</script>


<style scoped>
.top-start-25 {
  transform: translateY(25%) translateX(25%)
}

.glass {
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px) brightness(0.9);
  border-radius: 1rem;
}
.bg-image{
  background-image: url("../assets/img/bg.jpg");
  background-size: cover;
  background-blend-mode: darken;
  background-color: rgba(0,0,0,0.2);
}
.text-grey{
  color: gray;
}

#newIcon{
  font-size: 5rem;
}

.button-pointer{
  cursor: pointer;
}

.z-index-1000{
  z-index: 1000;
}
</style>
