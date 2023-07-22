<template>
  <div class="edit-card glass-dark rounded-4 d-flex flex-md-row flex-column">
    <div class="col form-check form-switch d-flex align-items-center mb-0 justify-content-center">
      <input class="form-check-input switchBtn" type="checkbox" role="switch" id="outlineSwitch" @click="setFill()"
             v-model="fillBool">
      <label class="form-check-label text-white" for="outlineSwitch">Fill</label>
    </div>
    <div class="col d-flex align-items-center justify-content-center">
      <input type="range" class="form-range ps-1 pe-1" min="100" max="700" step="100" id="weightRange" @change="setWeight()" v-model="weightModel">
      <label for="weightRange" class="form-label text-white ps-4 mb-0 flex-nowrap">Weight: {{weightModel}}</label>
    </div>
  </div>
</template>

<script>
import "vue3-colorpicker/style.css";

export default {
  name: 'SecondStep',
  methods: {
    setFill() {
      this.fillBool = !this.fillBool;
      this.$store.commit('icon/setFill', this.fillBool ? 1 : 0);
    },
    setWeight() {
      this.$store.commit('icon/setWeight', this.weightModel);
    },
  },
  data() {
    return {
      fillBool: Boolean(this.$store.state.icon.fill),
      fill: this.$store.state.icon.fill,
      weightModel: this.$store.state.icon.weight,
      weight: this.$store.state.icon.weight,
      color: this.$store.state.icon.color,
    }
  },
}
</script>

<style scoped>
.switchBtn {
  transform: scale(2);
  margin: 0 2rem;
}

.form-switch {
  padding: 1rem 0 1rem 3.5rem
}
.form-label{
  width: 100%;
}

.edit-card {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
}

.glass-dark {
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(20, 20, 20, 0.3);
  backdrop-filter: blur(10px) brightness(0.9);
  border-radius: 1rem;
}

@import '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';
</style>