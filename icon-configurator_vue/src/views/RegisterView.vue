<template>
  <div class="vw-100 bg-image d-flex vh-100 align-items-center justify-content-center">
    <div class="col-12 col-md-8 p-3 position-absolute card border-0 shadow p-2 rounded-4">
      <h1 class="pt-2">Icon Konfigurator</h1>
      <h3 class="pb-2 text-grey">Registrieren</h3>
      <form @submit.prevent="handleRegister()">
        <div class="mb-3">
          <label class="form-label" for="prename">Vorname</label>
          <input class="form-control shadow-none" id="prename" type="text" placeholder="Vorname" v-model="user.prename" required/>
        </div>
        <div class="mb-3">
          <label class="form-label" for="name">Nachname</label>
          <input class="form-control shadow-none" id="name" type="text" placeholder="Name" v-model="user.name" required/>
        </div>
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
        <div class="row me-0">
          <router-link to="login" class="col text-decoration-none text-center align-self-center">Du bist bereits registriert?</router-link>
          <button class="col-6 btn btn-primary btn-lg col-3 text-nowrap" id="submitButton" type="submit">Registrieren</button>
        </div>
      </form>
      <div class="col alert alert-danger mt-2" role="alert" v-if="serverError">
        {{ serverError }}
      </div>
    </div>
  </div>
</template>
<script>
import User from '@/models/user';

export default {
  name: 'registerViewV2',
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  data() {
    return {
      user: new User('', '', ''),
      serverError: '',
    };
  },
  methods: {
    handleRegister() {
      //this.message = '';
      this.$store.dispatch('auth/register', this.user)
          .then(data => {
                let serverConfirm = data.message;
                this.$store.commit('message/setMessage', serverConfirm);
                this.$router.push({name: 'login'});
              }, error => {
                this.serverError = error.response.data.message;
              }
          )
    }
  }
}
</script>
<style scoped>
.bg-image {
  background-image: url("../assets/img/bg.jpg");
  background-size: cover;
  background-blend-mode: darken;
  background-color: rgba(0, 0, 0, 0.2);
}
.text-grey{
  color: gray;
}
</style>