<template>
  <div class="d-flex justify-content-center align-content-center preview-icon">
    <i class="display-1 material-symbols-rounded align-self-center" id="svicon">{{icon}}</i>
  </div>
</template>

<script>
export default {
  name: 'IconStore',
  computed: {
    icon() {
      return this.$store.state.icon.icon;
    },
    color() {
      return this.$store.state.icon.color;
    },
    fill() {
      return this.$store.state.icon.fill;
    },
    weight() {
      return this.$store.state.icon.weight;
    },
  },
  watch: {
    color() {
      document.getElementById('svicon').style.cssText = "font-variation-settings: 'FILL' " + this.fill + ", 'wght' " + this.weight + ", 'GRAD' 0, 'opsz' 48; color: " + this.color;
    },
    fill() {
      document.getElementById('svicon').style.cssText = "font-variation-settings: 'FILL' " + this.fill + ", 'wght' " + this.weight + ", 'GRAD' 0, 'opsz' 48; color: " + this.color;
    },
    weight(){
      document.getElementById('svicon').style.cssText = "font-variation-settings: 'FILL' " + this.fill + ", 'wght' " + this.weight + ", 'GRAD' 0, 'opsz' 48; color: " + this.color;
    }
  },

  /**
   * needs to be set, when icon is being edit (state is set from favorite icons / history)
   */
  mounted() {
    document.getElementById('svicon').style.cssText = "font-variation-settings: 'FILL' " + this.fill + ", 'wght' " + this.weight + ", 'GRAD' 0, 'opsz' 48; color: " + this.color;
  }
}
</script>

<style scoped>
.material-symbols-rounded {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48;
}


.preview-icon {
  height: 6rem;
}

</style>
