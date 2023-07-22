<template>
  <div class="d-flex justify-content-center position-relative">
    <i class="material-symbols-rounded fs-1" :id="refId"
       :style="'font-variation-settings: \'FILL\' ' + fill + ',\'wght\' ' + weight + ', \'GRAD\' 0, \'opsz\' 48; color: ' + color">{{
        icon
      }}</i>
    <i @click="changeOrDeleteIcon()" :id="refId+'overlay'" :class="'material-symbols-rounded top-0 editIcon position-absolute fs-1 '+ (this.deleteIcons ? 'text-danger' : '')">{{ overlayIcon }}</i>
  </div>
</template>

<script>
import axios from 'axios';
import authHeader from '@/services/auth-headers';
import authService from '@/services/auth.service';

export default {
  name: 'IconStore',
  props: {
    deleteIcons: Boolean,
    refId: String,
    editIdx: Number,
    editFavorites: Boolean,
    icon: String,
    color: {type: [Number, String]},
    fill: Number,
    weight: {type: [Number, String]}
  },
  computed: {
    overlayIcon(){
      return this.deleteIcons ? 'delete' : 'tune'; 
    }
  },
  mounted() {
    let el = document.getElementById(this.refId);

    /**
     * set hover edit button
     */
    let editIcon = document.getElementById(this.refId + "overlay");
    el.onmouseover = function () {
      editIcon.style.display = "block";
      el.style.filter = "blur(3px)"
    }
    el.onmouseleave = function () {
      editIcon.style.display = "none";
      el.style.filter = "blur(0px)"
    }
    editIcon.onmouseover = function () {
      editIcon.style.display = "block";
      el.style.filter = "blur(3px)"
    }
    editIcon.onmouseleave = function () {
      editIcon.style.display = "none";
      el.style.filter = "blur(0px)"
    }

  },
  methods: {
    changeOrDeleteIcon() {
      /**
       * reset, because user can switch from zusammenfassung zu profile and back
       * Zusammenfassung with new icon is still shown but not the steps
       */
      this.$store.commit('icon/reset');
      this.$store.commit('icon/setEditMode', true);
      this.$store.commit('icon/setEditIdx', this.editIdx);
      this.$store.commit('icon/setIcon', this.icon)
      this.$store.commit('icon/setFill', this.fill)
      this.$store.commit('icon/setColor', this.color)
      this.$store.commit('icon/setWeight', this.weight)

      if (this.deleteIcons) {
        let url = 'http://localhost:3000/icons/delete';
        if (this.editFavorites) {
          url += 'Favorite';
        } else {
          url += 'History';
        }
        axios.patch(url, this.$store.getters['icon/getFinalIcon'], {headers: authHeader()})
            .then(() => {
              this.$store.commit('message/setMessage', 'Icon erfolgreich gelöscht');
              this.$emit('icon-removed');
            })
            .catch(err => {
              authService.jwtExpired(err);
        });
      } else {
        this.$router.push('/');
      }
    }
  }
}
</script>

<style scoped>
.editIcon {
  display: none;
}

.material-symbols-rounded {
  font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 48;
}
</style>
