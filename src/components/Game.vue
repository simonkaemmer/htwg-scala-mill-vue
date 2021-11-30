<template>
  <v-card style="background-color: white">
    <v-card-text align="center">
      <GameButtons class="my-3" @callParentFunction="loadField" />
      <table v-if="Object.keys(field).length !== 0" :key="reloadTrigger">
        <tr v-for="(tmp, i) in gameSize" :key="i">
          <td v-for="(tmp2, j) in gameSize" :key="j">
            <AvailableCell v-if="allowedPosition(i, j)" :row="i" :col="j" :color="field[i * 7 + j].color" @callParentFunction="loadField" />
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
    loadField() {
      MillService.getGame().then(result => {
        this.field = result.game.field
        this.reloadTrigger = !this.reloadTrigger
        if (result.game.winner !== 0) {
          let winner = ''
          if (result.game.winner === 1) {
            winner = 'White'
          } else {
            winner = 'Black'
          }
          this.winningScreen(winner)
        }
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
    },
    winningScreen(winner) {
      this.$confetti.start();
      this.$swal({
        title: `Congratulations to <strong>${winner}</strong> for winning the game!`,
        width: 600,
        padding: '3em',
        closeOnClickOutside: false,
        allowOutsideClick: false,
        showConfirmButton: true,
        confirmButtonText: 'Yes',
        html: `<p>Do you like to start a new game?</p>`
      }).then(result => {
        if (result.isConfirmed) {
          MillService.changeGame('post', '/').then(() => {
            this.loadField()
            this.$confetti.stop();
          })
        }
      })
    }
  }
}
</script>