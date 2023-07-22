<template>
  <router-view v-slot="{ Component }">
    <transition name="switch-route" mode="in-out">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script>
export default {
  name: 'App',
  components: {
}
}
</script>

<style>
*{
  overflow: hidden !important;
}

.switch-route-enter-from{
  transform: translateY(-100%);
}
.switch-route-enter-active{
  position: absolute;
  top: 0;
  bottom: 0;
  transition: .7s ease-in-out;
}
.switch-route-enter-to{
  transform: translate(0);
}

.switch-route-leave-from{
  transform: translate(0);
}
.switch-route-leave-active{
  z-index: -1;
  position: absolute;
  top: 0;
  bottom: 0;
  transition: .7s ease-in-out;
}
.switch-route-leave-to{
  transform: translateY(100%);
}
</style>
