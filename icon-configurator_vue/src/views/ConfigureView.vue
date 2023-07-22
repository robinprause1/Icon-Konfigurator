<template>
  <div>
    <div @click="this.$router.push('/profile')" class="d-flex row button-pointer z-index-1000 bg-primary rounded-4 ms-2 mt-2 shadow position-absolute px-2 text-white align-items-center">
      <i class="material-symbols-rounded display-4 w-auto">person</i>
      <div class="w-auto">zum Profil</div>
    </div>
    <div class="vh-100 bg-image d-flex flex-column vw-100 align-items-center justify-content-start">
      <transition :name="this.animClass" mode="out-in">
      <div :key="this.currentStep" class="d-flex align-items-center justify-content-center flex-grow-1 w-100">
        <div class="d-flex flex-column col-12 col-md-9 glass shadow rounded-4 p-1 mx-md-4 p-md-4">
          <div class="d-flex flex-column flex-grow-1">
            <h1 class="text-center text-white align-items-center py-1">{{ heading }}</h1>
            <div class="d-flex justify-content-center">
                <icon-store v-if="this.currentStep >= 1" class="align-self-center"/>
            </div>

              <first-step v-if="(this.currentStep == 0)" :msg="this.chooseIconMsg"/>
              <second-step v-if="(this.currentStep == 1)"/>
              <third-step v-if="(this.currentStep == 2)" :showColorPicker="this.showColorPicker"/>
              <summary-step v-if="(this.currentStep == 3)"/>

          </div>
          <div class="d-flex justify-content-end">
            <div class="flex-row d-flex flex-wrap rounded-pill card border-0 mt-2 mt-md-4 bg-white-50">
              <div @click="previousStep()" class="button-hover d-flex p-2">
                <i :class="'material-symbols-rounded text-white bg-primary rounded-4 p-1 fw-bold ' + (this.currentStep === 0 ? 'opacity-25' : 'opacity-100')">arrow_back_ios_new</i>
              </div>
              <div @click="nextStep()" class="d-flex p-2">
                <div class="button-hover d-flex">
                  <i class="material-symbols-rounded text-white bg-primary rounded-4 p-1 fw-bold" v-if="(this.currentStep <= 2)">arrow_forward_ios</i>
                </div>
                <button class="btn btn-primary rounded-pill p-1 ps-2 pe-2" v-if="((this.currentStep === 3))" @click="finishConfig()">
                  neues Icon
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
import firstStep from './subViews/FirstStep.vue'
import IconStore from './components/IconStore.vue';
import SecondStep from './subViews/SecondStep.vue';
import ThirdStep from './subViews/ThirdStep.vue';
import authHeader from '../services/auth-headers';
import axios from 'axios';
import authService from '../services/auth.service';
import SummaryStep from "../views/subViews/SummaryStep.vue";

export default {
  components: {SummaryStep, firstStep, SecondStep, ThirdStep, IconStore},
  name: 'ConfigView',
  methods: {
    nextStep() {
      this.setAnimClass(true);
      if (this.$store.state.icon.icon == '') {
        return this.chooseIconMsg = "Bitte wähle ein Icon aus";
      }
      this.$store.commit('icon/next');
    },
    previousStep() {
      this.setAnimClass(false);
      this.$store.commit('icon/previous');
    },
    finishConfig() {
      if(this.loggedIn){
        axios.post('http://localhost:3000/icons/saveHistory', this.$store.getters['icon/getFinalIcon'], {headers: authHeader()})
            .then(() => {
              this.$store.commit('icon/reset');
            })
            .catch(err => {
              authService.jwtExpired(err);
            })
      }else{
        this.$store.commit('message/setMessage', '');
        this.$store.commit('icon/reset');
      }
    },
    setAnimClass(isForward){
      if(isForward){
        this.animClass = 'card-anim-forward';
      }else{
        this.animClass = 'card-anim-backward';
      }
    }
  },
  data() {
    return {
      chooseIconMsg: '',
      animClass: 'card-anim-forward',
      showColorPicker: false,
    }
  },
  computed: {
    currentStep() {
      return this.$store.state.icon.currentStep;
    },
    heading() {
      if (this.currentStep == 0) {
        return "Icon auswählen"
      } else if (this.currentStep == 1) {
        return "Formeinstellungen"
      } else if (this.currentStep == 2) {
        return "Farbe auswählen"
      }
      return "Dein Icon"
    },
    editMode() {
      return this.$store.state.icon.editMode;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted(){
    this.$store.commit('message/setMessage', '');
  }
}
</script>

<style scoped>
.material-symbols-rounded{
    cursor: pointer;
}

.bg-image {
  background-image: url("../assets/img/bg.jpg");
  background-size: cover;
  background-blend-mode: darken;
  background-color: rgba(0, 0, 0, 0.2);
  min-height: 100vh;
}

.glass{
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255,255,255,0.4);
  backdrop-filter: blur(10px) brightness(0.9);
  box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  min-height: 85%;
  max-height: 85%;
}

.bg-white-50{
  background-color: rgba(255,255,255,0.5)!important;
}

.button-hover{
  cursor: pointer;
}

.h-fit-content{
  height: fit-content;
}

/* FORWARD ANIMATIONS */
.card-anim-forward-enter-from{
  transform: translateX(100%);
}
.card-anim-forward-enter-active{
  transition: .5s ease-in-out;
}
.card-anim-forward-enter-to{
  transform: translateX(0);
}

.card-anim-forward-leave-from{
  transform: translateX(0);
}
.card-anim-forward-leave-active{
  transition: .5s ease-in-out;
}
.card-anim-forward-leave-to{
  transform: translateX(-100%);
}

/* BACKWARD ANIMATIONS */
.card-anim-backward-enter-from{
  transform: translateX(-100%);
}
.card-anim-backward-enter-active{
  transition: .5s ease-in-out;
}
.card-anim-backward-enter-to{
  transform: translateX(0);
}

.card-anim-backward-leave-from{
  transform: translateX(0);
}
.card-anim-backward-leave-active{
  transition: .5s ease-in-out;
}
.card-anim-backward-leave-to{
  transform: translateX(100%);
}

.button-pointer{
  cursor: pointer;
}

.z-index-1000{
  z-index: 1000;
}
</style>