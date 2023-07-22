<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-row flex-md-column justify-content-center align-items-center my-3">
      <button @click="createRandomIcon()" type="button" class="btn btn-primary mb-md-3 m-1">
            Zufälliges Icon
      </button>
      <input @input="search()" v-model="searchInput" class="form-control ms-2 w-50 w-md-25 align-self-center rounded-3" type="text" name="search_favorites" id="search_favorites" placeholder="suchen..." />
    </div>
    <div class="edit-card glass-dark rounded-4 bottom-0 justify-content-center p-2">
      <div v-for="icon in this.filteredIcons" :key="icon"
          class="shadow-anim py-2 py-sm-2 px-3 rounded-3 bg-white m-2 button-hover"
          @click="saveIcon(icon)">
        <i class="material-symbols-rounded selectable align-self-center justify-content-center" :id="icon">{{icon}}</i>
      </div>
    </div>
    <div class="col-12">
        <div class="alert alert-danger text-center m-2 p-1" v-if="this.msg != '' && this.selectedIcon == ''">
          {{ this.msg }}
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'FirstStep',
  data() {
    return {
      icons: ["home", "mood", "cancel", "settings", "favorite", "savings", "star", "bolt", "map", "terminal",
        "person", "public", "eco", "sunny", "rocket", "rainy", "cloudy", "bedtime", "cookie","psychiatry", "ent", "lunch_dining", "emoji_nature"],
      selectedIcon: this.$store.state.icon.icon,
      iconSaved: false,
      searchInput: '',
      filteredIcons: [],
    }
  },
  props: {
    msg: String
  },
  methods: {
    saveIcon(icon) {
      if (this.selectedIcon != "") {
        document.getElementById(this.selectedIcon).parentElement.style.border = "white 4px solid";
      }
      this.$store.commit("icon/setIcon", icon.toLowerCase());
      document.getElementById(icon).parentElement.style.border = "#0d6efd 4px solid";
      this.selectedIcon = icon;
      this.iconSaved = true;
    },
    search(){
      this.filteredIcons = this.icons.filter(icon => {
        return icon.toLowerCase().indexOf(this.searchInput.toLowerCase()) != -1;
      });
    },
    createRandomIcon(){
      //set random icon
      let icons = this.$store.state.icon.icons;
      let randomIconIdx = Math.round(Math.random()*icons.length);
      let randomIcon = icons[randomIconIdx];
      this.$store.commit('icon/setIcon', randomIcon);

      //set random filled/outline
      let iconFill = Math.round(Math.random());
      this.$store.commit('icon/setFill', iconFill);

      //set random weight
      let randomWeight = Math.round(Math.random()*7)*100;
      this.$store.commit('icon/setWeight', randomWeight);

      //set random rgb color
      let r = Math.round(Math.random()*255);
      let g = Math.round(Math.random()*255);
      let b = Math.round(Math.random()*255);
      let rgb = "rgb("+r+","+g+","+b+")";
      this.$store.commit('icon/setColor', rgb);

      this.$store.commit('icon/setStep', 3);
    }
  },
  mounted() {
    if (this.$store.state.icon.icon) {
      setTimeout(() => { 
        document.getElementById(this.$store.state.icon.icon).parentElement.style.border = "#0d6efd 5px solid";
      }, 10);
    }
    this.filteredIcons = this.icons;
  }
}
</script>

<style>

.icon-size {
  width: 1em;
  height: 1rem;
}

.shadow-anim {
  border: white 4px solid;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.4);
  z-index: 100;
  height: fit-content;
}

.shadow-anim:hover {
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.4);
  z-index: 1000;
  transition-duration: 500ms;
  border-radius: 40px;
}

.edit-card {
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto !important;
}
@media screen and (max-width: 768px) {
  .edit-card {
  max-height: 50vh;
}
}

.button-hover {
  cursor: pointer;
}

.glass-dark {
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(20, 20, 20, 0.3);
  backdrop-filter: blur(10px) brightness(0.9);
  border-radius: 1rem;
}

.material-symbols-rounded .selectable{
  font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 48;

  line-height: 1.5;
}

.icon-enter-anim-enter-from{
  transform: scale(0);
}
.icon-enter-anim-enter-active{
  transition: 1s ease-in-out;
}
.icon-enter-anim-enter-to{
  transform: scale(1);
}
</style>