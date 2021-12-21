<template>
  <v-container>
    <v-row>
      <v-col cols="0" md="3" />
      <v-col cols="12" md="6">
        <Game />
      </v-col>
      <v-col cols="0" md="3" />
    </v-row>
  </v-container>
</template>

<script>
import Game from '../components/Game'

export default {
  name: 'Home',
  components: {
    Game
  }
}
</script>
