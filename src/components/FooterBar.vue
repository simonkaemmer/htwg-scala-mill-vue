<template>
  <v-footer
      padless
  >
    <v-card
        flat
        tile
        width="100%"
        color="primary"
        class="text-center"
        dark
    >
      <v-card-text>
        <a href="https://github.com/KzuDemEvin/htwg-scala-mill-play" class="text-decoration-none mr-5" target="_blank" >
          <v-icon class="footer-icon">mdi-heart</v-icon>
        </a>
        <a href="https://github.com/simonkaemmer/htwg-scala-mill-vue" class="text-decoration-none ml-5" target="_blank" >
          <v-icon class="footer-icon">mdi-github</v-icon>
        </a>
      </v-card-text>
      <v-divider />
      <v-card-text class="white--text">
        © {{ new Date().getFullYear() }} — <strong> Simon Kaemmer & Kevin Schoch</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterBar'
}
</script>

<style scoped>

</style>