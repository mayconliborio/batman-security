<template>
  <div id="app">
    <v-app>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-app>
  </div>
</template>
