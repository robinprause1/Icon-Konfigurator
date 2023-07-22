<template>
  <div class="alert alert-danger mx-2" v-if="this.errorMsg">{{ this.errorMsg }}</div>
  <div class="alert alert-success mx-2" v-if="this.serverConfirm">{{ this.serverConfirm }}</div>
  <div class="row flex-md-row flex-column justify-content-center align-items-center">
    <a @click="saveToFavorites()" ref="favoriteBtn" v-if="!editMode" class="col-6 m-1 d-flex justify-content-center text-white text-decoration-none">
      <button type="button" class="btn btn-success align-self-center">als Favorit speichern</button>
    </a>
    <a @click="patchFavorite()" ref="favoriteBtn" v-if="editMode" class="col-6 m-1 d-flex justify-content-center text-white text-decoration-none flex-column">
      <button type="button" class="btn btn-success align-self-center" v-if="editMode">Änderungen speichern</button>
    </a>
    <a @click="downloadIcon()" ref="downloadBtn" id="downloadBtn" class="col-6 m-1 d-flex justify-content-center text-white text-decoration-none">
      <button type="button" class="btn btn-secondary align-self-center">Download</button>
    </a>
  </div>
</template>

<script>
import axios from 'axios';
import authService from '@/services/auth.service';
import authHeader from '@/services/auth-headers';

export default {
  name: 'SummaryStep',
  data() {
    return {
      errorMsg: '',
      serverConfirm: '',
      iconWithColorBlob: ''
    }
  },
  methods: {
    saveToFavorites() {
      if (!this.loggedIn) {
        return this.errorMsg = "Bitte logge dich zunächst ein, um das Icon zu deinen Favoriten hinzufügen zu können"
      }

      //TODO auslagern in service für einheitliche architektur
      axios.post('http://localhost:3000/icons/saveFavorite', this.$store.getters['icon/getFinalIcon'], {headers: authHeader()})
          .then(res => {
            this.serverConfirm = res.data.message;
          })
          .catch(err => {
            authService.jwtExpired(err);
          })
    },
    downloadIcon() {
      let icon = this.$store.getters['icon/getFinalIcon'];
      /*let data = document.getElementById('svicon').outerHTML;
      let blob = new Blob([data], {type: 'image/xml+svg'});
      document.getElementById('downloadBtn').href = window.URL.createObjectURL(blob);
      document.getElementById('downloadBtn').download = "icon.svg";*/
      let url = "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/"
          + icon.icon + "/"
          + (icon.weight == 400 && icon.fill == 0 ?
              "default/" :
              ((icon.weight == 400 ? "" : "wght" + icon.weight) + (icon.fill == 0 ? "/" : "") + (icon.fill == 0 ? "" : "fill" + icon.fill + "/"))) + "48px.svg";
      fetch(url, {method: 'GET'})
      .then(r => r.text())
      .then(text =>new Blob([text], {type: 'image/xml+svg'}))
      .then(b => {
        let hexColor = icon.color;

        let myReader = new FileReader();
        //handler executed once reading(blob content referenced to a variable) from blob is finished.
        myReader.onloadend = (e) => {
          let iconWithColorBlob = new Blob([e.target.result.replace("<path", "<path fill=\"" + hexColor + "\"")], {type: "text/plain"});
          this.iconWithColorBlob = iconWithColorBlob;
        }
        myReader.readAsText(b);
      })
      setTimeout(() => {
        console.log(this.iconWithColorBlob);
        const a = document.createElement('a');
        a.style.display = "none";
        a.href = window.URL.createObjectURL(this.iconWithColorBlob);
        a.download = "icon.svg";
        document.body.appendChild(a);
        a.click();
      }, 300);
    },
    patchFavorite() {
      axios.patch('http://localhost:3000/icons/editFavorite', this.$store.getters['icon/getFinalIcon'], {headers: authHeader()})
          .then(() => {
          })
          .catch(err => {
            authService.jwtExpired(err);
          })
      this.$store.commit('icon/setEditMode', false);
      this.$store.commit('message/setMessage', 'Icon erfolgreich gespeichert');
      this.$router.push({name: 'profile'});
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    editMode() {
      return this.$store.state.icon.editMode;
    }
  },
}
</script>

<style scoped>
.material-symbols-rounded{
    cursor: pointer;
}
</style>
