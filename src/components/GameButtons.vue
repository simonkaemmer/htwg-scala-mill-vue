<template>
  <v-row
      align="center"
      justify="space-around"
  >
    <v-btn text @click="gameMethod('post', '/')">
     New Game
    </v-btn>
    <v-btn text @click="gameMethod('post', '/random')">
      Random Game
    </v-btn>
    <v-btn text @click="gameMethod('put', '/undo')">
      Undo
    </v-btn>
    <v-btn text @click="gameMethod('put', '/redo')">
      Redo
    </v-btn>
  </v-row>
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