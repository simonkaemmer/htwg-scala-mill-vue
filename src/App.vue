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
  },
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpgradeUI = true;
      });
    }
  },
  methods: {
    async accept() {
      this.showUpgradeUI = false
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    }
  }
};
</script>
