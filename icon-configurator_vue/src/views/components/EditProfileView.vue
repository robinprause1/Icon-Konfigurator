<template>
    <div class="container px-md-4 px-1">
        <form @submit.prevent="edit()" class="editProfile">
            <h3>Nutzerdaten anpassen</h3>
            <div class="row">
                <div class="col-12 col-md-6">
                    <label class="form-label mb-0" for="name">Nachname</label>
                    <input id="name" class="form-control shadow-none" type="text" placeholder="name" v-model="name"/>
                </div>
                <div class="col-12 col-md-6">
                    <label class="form-label mb-0" for="prename">Vorname</label>
                    <input id="Vorname" class="form-control shadow-none" type="text" placeholder="Vorname" v-model="prename"/>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6">
                    <label class="form-label mb-0" for="username">Nutzername</label>
                    <input id="username" class="form-control shadow-none" type="text" placeholder="Nutzername" v-model="username"/>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6">
                    <label class="form-label mb-0" for="oldpw">Altes Passwort</label>
                    <input id="oldpw" class="form-control shadow-none" type="password" placeholder="altes Passwort" v-model="oldpw"/>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-12 col-md-6">
                    <label class="form-label mb-0" for="newpw">Neues Passwort</label>
                    <input id="newpw" class="form-control shadow-none" type="password" placeholder="neues Passwort" v-model="newpw"/>
                </div>
                <div class="col-12 col-md-6">
                    <label class="form-label mb-0" for="newpwrp">Neues Passwort wiederholen</label>
                    <input id="newpwrp" class="form-control shadow-none" type="password" placeholder="neues Passwort wiederholen" v-model="newpwrp"/>
                </div>
            </div>
            <div class="alert alert-danger mt-2" role="alert" v-if="serverError">
                {{serverError}}
            </div>
            <div class="row gy-2">
                <div class="col-12 col-md-6">
                    <button class="btn btn-success btn-md" id="saveButton" v-if="!confirm" type="submit">Speichern & Startseite</button>
                </div>
                <div class="col-12 col-md-6 mb-3">
                    <button class="btn btn-danger btn-md" id="submitButton" type="button" @click="(this.confirm = true)" v-if="!this.confirm">Account Löschen</button>
                        <p v-if="confirm" class=" mt-1 h4">Bist du sicher?</p>
                        <button class="btn btn-success col-3 btn-md mb-2" v-if="confirm" @click="deleteUser()">Ja</button>
                        <button class="btn btn-danger col-3 btn-md mb-2" v-if="confirm" @click="(this.confirm = false)">Nein</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import authHeader from '@/services/auth-headers';
import authService from '@/services/auth.service';
import axios from 'axios';

export default {
    name: 'registerView',
    computed: {
        loggedIn(){
            return this.$store.state.auth.status.loggedIn;
        },
        //wird erst beim mounten geladen -> kein direkter Zugriff möglich -> Umweg über data
        currentUser(){
            return this.$store.state.auth.user;
        },
        editedUser(){
            return {
                name: this.name,
                prename: this.prename,
                username: this.username,
                oldpw: this.oldpw,
                newpw: this.newpw,
                newpwrp: this.newpwrp
            }
        }
    },
    mounted(){
        if(!this.loggedIn){
            this.$router.push('/login');
        }else{
            this.name = this.currentUser.name;
            this.prename = this.currentUser.prename;
            this.username = this.currentUser.username;
        }
    },
    data(){
        return{
            name: '',
            prename: '',
            username: '',
            oldpw: '',
            newpw: '',
            newpwrp: '',
            confirm: false,
            serverError: '',
        }
    },
    methods: {
        edit(){
            axios.patch('http://localhost:3000/users/edit', this.editedUser, {headers: authHeader()})
            .then(data => {
                let serverConfirm = data.data.message;
                let currentUser = JSON.parse(localStorage.getItem('user'));
                currentUser.username = data.data.username;
                currentUser.name =  data.data.name;
                currentUser.prename = data.data.prename;
                localStorage.setItem('user', JSON.stringify(currentUser));
                this.$store.commit('message/setMessage', serverConfirm);
            })
            .catch(err => {
                this.serverError = err.response.data.message;
                authService.jwtExpired(err);
            });
        },
        deleteUser(){
            axios.patch('http://localhost:3000/users/delete', this.currentUser, {headers: authHeader()})
            .then(data => {
                let serverConfirm = data.data.message;
                this.$store.dispatch('auth/logout');
                this.$store.commit('message/setMessage', serverConfirm);
            })
            .catch(err => {
                this.serverError = err.response.data.message;
                authService.jwtExpired(err);
            });
        }
    }
}
</script>

<style scoped>
.editProfile{
    overflow-y: scroll !important; 
    max-height: 60vh;
}
</style>