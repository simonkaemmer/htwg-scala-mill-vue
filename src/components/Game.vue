<template>
  <v-card>
    <v-card-text align="center">
      <div v-if="field" :key="loading">
        <span v-for="(cell, index) in field" :key="index">
          <div v-if="index !== 0 && index % 7 === 0" />
          <AvailableCell v-if="allowedPosition(cell.row, cell.col)" @click.native="makeMove(cell.row, cell.col)" :row="cell.row" :col="cell.col" :color="cell.color" />
          <UnavailableCell v-else :row="cell.row" :col="cell.col" />
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import MillService from '../service/millService'
import UnavailableCell from './UnavailableCell'
import AvailableCell from './AvailableCell'

export default {
  name: 'Game',
  components: {
    UnavailableCell,
    AvailableCell
  },
  data: () => ({
    gameSize: 7,
    imageRootPath: '../assets/media/',
    loading: true,
    field: {}
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
        this.loading = false
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