<template>
  <div class="d-flex rounded-4 w-100 h-20 d-flex flex-row justify-content-around glass-dark p-4">
    <div class="d-flex">
      <label for="colorpicker" class="pe-4 form-label text-white m-0">Farbe:</label>
      <input type="color" id="colorpicker" v-model="color" @input="setColor()" >
    </div>
  </div>
</template>

<script>

export default {
    name: 'ThirdStep',
    components: {},
    methods: {
      setColor() {
        this.$store.commit('icon/setColor', this.color);
      },
      rgbToHex(rgbString) {
        if (rgbString.includes("#")) return rgbString;
        let valuesArray =
            rgbString
                .replace("r", "")
                .replace("g", "")
                .replace("b", "")
                .replace("(", "")
                .replace(")", "").split(","); //rgb(10,0,20);
        let r = Number(valuesArray[0]);
        let g = Number(valuesArray[1]);
        let b = Number(valuesArray[2]);

        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
      },
      componentToHex(comp) {
        let hex = comp.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      }
    },
    data(){
        return{
          color: this.rgbToHex(this.$store.state.icon.color)
        }
    }
}
</script>
<style>
.glass-dark {
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(20, 20, 20, 0.3);
  backdrop-filter: blur(10px) brightness(0.9);
  border-radius: 1rem;
}
</style>