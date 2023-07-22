import axios from "axios";
import { store } from "@/main";
import router from "@/router";

const API_URL = 'http://localhost:3000/users/';


/**
 * Methods for authenticating users
 * Methods get called from action within auth module state
 */
class AuthService{
    login(user){
        return axios
        .post(API_URL + 'login', {
            username: user.username,
            password: user.password
        })
        .then(response => {
            if(response.data.accessToken){
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data
        });
    }

    logout(){
        localStorage.removeItem('user');
    }

    register(user){
        return axios.post(API_URL + 'register', {
            username: user.username,
            prename: user.prename,
            name: user.name,
            password: user.password
        });
    }

    jwtExpired(err){
        if(err.response.data.jwtExpired){
            store.dispatch('auth/logout', JSON.parse(localStorage.getItem('user')));
            store.commit('message/setError', this.serverError);
            router.push({name: 'login'});
        }
    }
}

export default new AuthService();