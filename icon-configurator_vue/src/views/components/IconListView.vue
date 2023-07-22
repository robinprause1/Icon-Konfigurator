<template>
    <div class="d-flex flex-column">
        <div class="form-check form-switch d-flex align-items-center align-self-center my-3">
            <input class="form-check-input switchBtn" type="checkbox" role="switch" id="outlineSwitch" v-model="deleteIcons">
            <label class="form-check-label ms-2" for="outlineSwitch">Icons löschen</label>
        </div>
        <div class="row gy-4 m-0">
            <div v-for="(icon, index) in this.icons" :key="index" class="col-3 col-md-2">
                <icon-props @icon-removed="removeDeletedIcon()" :deleteIcons="this.deleteIcons" :refId="'icon_'+index + '_' + api_url.substring(3)" :editIdx="index" :editFavorites="this.api_url == 'getFavorites' ? true : false" :icon="icon.icon" :fill="icon.fill" :color="icon.color" :weight="icon.weight"></icon-props>
            </div>
            <p v-if="this.icons == ''">Schnell!!! Erstelle dein erstes Icon... :D</p>
        </div>
    </div>
</template>
<script>
import authHeader from '@/services/auth-headers';
import axios from 'axios'
import IconProps from './IconProps.vue';
import authService from '@/services/auth.service';
export default{
  components: { IconProps },
    name: 'FavoriteListView',
    props: {
        api_url: String
    },
    data(){
        return{
            icons: [],
            filteredIcons: [],
            deleteIcons: false
        }
    },
    mounted(){  
        this.loadIcons();  
    },
    methods: {
        loadIcons(){
            setTimeout(() => {
                axios.get('http://localhost:3000/icons/'+this.api_url, { headers: authHeader() })
                .then(res => {
                    this.icons = res.data.icons;
                })
                .catch(err => {
                    this.errorMsg = 'Beim laden der Icons ist ein Fehler aufgetreten';
                    authService.jwtExpired(err);
                });
            }, 100);
        },
        removeDeletedIcon(){
            let iconIdx = this.$store.state.icon.editIdx;
            this.icons.splice(iconIdx, 1);
        }
    }
}
</script>