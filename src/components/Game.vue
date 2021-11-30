<template>
  <v-card>
    <v-card-text align="center">
      <hr>
      <GameButtons class="my-3" @callParentFunction="loadField" />
      <hr>
      <table v-if="Object.keys(field).length !== 0" :key="reloadTrigger">
        <tr v-for="(tmp, i) in gameSize" :key="i">
          <td v-for="(tmp2, j) in gameSize" :key="j">
            <AvailableCell v-if="allowedPosition(i, j)" @click.native="makeMove(i, j)" :row="i" :col="j" :color="field[i * 7 + j].color" />
            <UnavailableCell v-else :row="i" :col="j" />
          </td>
        </tr>
      </table>
    </v-card-text>
  </v-card>
</template>

<script>
import MillService from '../service/millService'
import GameButtons from './GameButtons'
import UnavailableCell from './UnavailableCell'
import AvailableCell from './AvailableCell'

export default {
  name: 'Game',
  components: {
    GameButtons,
    UnavailableCell,
    AvailableCell
  },
  data: () => ({
    gameSize: 7,
    imageRootPath: '../assets/media/',
    loading: true,
    reloadTrigger: false,
    field: {},
  }),
  mounted() {
    this.loadField()
  },
  methods: {
    makeMove(row, col) {
      this.loading = true
      MillService.makeMove(row, col).then(() => {
        this.loadField()
      })
    },
    loadField() {
      MillService.getGame().then(result => {
        this.field = result.game.field
        this.reloadTrigger = !this.reloadTrigger
      })
    },
    allowedPosition(row, col) {
      const allowedPositions = [[0, 0], [0, 3], [0, 6], [1, 1], [1, 3], [1, 5], [2, 2], [2, 3], [2, 4], [3, 0],
        [3, 1], [3, 2], [3, 4], [3, 5], [3, 6], [4, 2], [4, 3], [4, 4], [5, 1], [5, 3], [5, 5], [6, 0], [6, 3], [6, 6]];
      return allowedPositions.some((item) => {
        if (JSON.stringify(item) === JSON.stringify([Number(row), Number(col)])) {
          return true;
        }
      })
    }
  }
}
</script>