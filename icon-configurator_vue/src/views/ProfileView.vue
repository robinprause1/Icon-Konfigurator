<template>
  <div>
    <div @click="this.$router.push('/')"
         class="d-flex row button-pointer z-index-1000 bg-primary rounded-4 ms-2 mt-2 shadow position-absolute px-2 text-white align-items-center">
      <i class="material-symbols-rounded display-4 w-auto">library_add</i> <!--this.$router.push('/')-->
      <div class="w-auto">zum Konfigurator</div>
    </div>
    <div class="vh-100 bg-image d-flex vw-100 align-items-center justify-content-center">
      <div class="col-12 col-md-8 p-3 card border-0 shadow p-2 rounded-4">
        <div class="alert alert-success p-0 px-2 p-1 text-center" role="alert" v-if="serverConfirm">
          {{ serverConfirm }}
        </div>
        <div class="mb-3 d-flex flex-row justify-content-between">
          <ul class="nav nav-pills" id="myTab" role="tablist">
            <li class="nav-item active" role="presentation">
              <button class="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane"
                      type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="true">Profil
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="favorites-tab" data-bs-toggle="tab" data-bs-target="#favorites-tab-pane"
                      type="button" role="tab" aria-controls="favorites-tab-pane" aria-selected="false">Favoriten
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="history-tab" data-bs-toggle="tab" data-bs-target="#history-tab-pane"
                      type="button" role="tab" aria-controls="history-tab-pane" aria-selected="false">Verlauf
              </button>
            </li>
          </ul>
        </div>

        <div class="tab-content overflow-scroll" id="myTabContent">
          <div class="tab-pane fade show active" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab"
               tabindex="0">
            <edit-view></edit-view>
          </div>
          <div class="tab-pane fade" id="favorites-tab-pane" role="tabpanel" aria-labelledby="favorites-tab"
               tabindex="0">
            <icon-list-view api_url="getFavorites"></icon-list-view>
          </div>
          <div class="tab-pane fade" id="history-tab-pane" role="tabpanel" aria-labelledby="history-tab" tabindex="0">
            <icon-list-view api_url="getHistory"></icon-list-view>
          </div>
        </div>
        <div class="d-flex flex-row justify-content-end">
          <button class="btn btn-outline-primary" @click="logout()">ausloggen</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import EditView from './components/EditProfileView';
import IconListView from './components/IconListView.vue';

export default {
  name: 'ProfileView',
  components: {EditView, IconListView},
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    serverConfirm() {
      return this.$store.state.message.message;
    }
  },
  created() {
    if (!this.loggedIn) {
      this.$router.push('/login');
    }
  },
  mounted() {
    this.setBreakpointMdAndDown(window.innerWidth)
    window.addEventListener('resize', () => {
      this.setBreakpointMdAndDown(window.innerWidth);
    });
  },
  methods: {
    logout() {
      this.$store.commit('icon/reset');
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    setBreakpointMdAndDown(windowWidth) {
      windowWidth <= '768' ? this.breakpointMdAndDown = true : this.breakpointMdAndDown = false;
    }
  },
  data() {
    return {
      breakpointMdAndDown: false
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

.material-symbols-rounded {
  cursor: pointer;
}

.tab-content {
  height: 65vh;
}

.button-pointer{
  cursor: pointer;
}

.z-index-1000{
  z-index: 1000;
}
</style>