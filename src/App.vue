<template>
  <v-app style="background-color: #85C8E9">
    <NavigationBar />
    <v-main>
      <router-view/>
    </v-main>
    <FooterBar />
  </v-app>
</template>

<script>
import NavigationBar from "./components/NavigationBar";
import FooterBar from "./components/FooterBar";

export default {
  name: 'App',
  components: {
    FooterBar,
    NavigationBar
  }
};
</script>
