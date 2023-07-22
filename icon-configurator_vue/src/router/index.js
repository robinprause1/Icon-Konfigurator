import { createRouter, createWebHistory } from 'vue-router';
import ProfileView from '@/views/ProfileView.vue';
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import ConfigureView from "@/views/ConfigureView";


const routes = [
    { path: '/profile',
      name:'profile', 
      component: ProfileView,
    },
    { path:'/login', 
      name:'login', 
      component: LoginView,
    },
    { path:'/register', 
      name:'register', 
      component: RegisterView
    },
    { path:'/', 
    name:'configure', 
    component: ConfigureView
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;