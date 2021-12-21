<template>
  <v-bottom-navigation
      align="center"
      style="background-color: white"
  >
    <v-spacer></v-spacer>
    <v-btn text @click="gameMethod('post', '/')">
     New Game
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn text @click="gameMethod('post', '/random')">
      Random Game
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn text @click="gameMethod('put', '/undo')">
      Undo
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn text @click="gameMethod('put', '/redo')">
      Redo
    </v-btn>
    <v-spacer></v-spacer>
  </v-bottom-navigation>
</template>

<script>
import MillService from '../service/millService'

export default {
  name: 'GameButtons',
  methods: {
    gameMethod(type, path) {
      MillService.changeGame(type, path).then(() => this.$emit('callParentFunction'))
    }
  }
}
</script>

<style scoped>

</style>