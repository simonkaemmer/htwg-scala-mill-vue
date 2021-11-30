<template v-slot:activator="{ on, attrs }">
  <span>
    <v-slide-y-transition>

    </v-slide-y-transition>
    <img v-if="checkHorizontalCell(row, col)" src="../assets/media/UnavailableCellHorizontal.png" alt="horizontalCell" class="img-fluid">
    <span v-else>
      <img v-if="checkVerticalCell(row, col)" src="../assets/media/UnavailableCellVertical.png" alt="verticalCell" class="img-fluid">
      <img v-else src="../assets/media/Transparent.png" alt="transparentCell" class="img-fluid">
    </span>
  </span>
</template>

<script>
export default {
  name: 'Cell',
  props: {
    row: {
      type: Number,
      required: true
    },
    col: {
      type: Number,
      required: true
    }
  },
  methods: {
    checkHorizontalCell(row, col) {
      const cellHorizontal = [[0, 1], [0, 2], [0, 4], [0, 5], [1, 2], [1, 4], [5, 2], [5, 4], [6, 1], [6, 2], [6, 4], [6, 5]]
      return cellHorizontal.some((item) => {
        if (JSON.stringify(item) === JSON.stringify([Number(row), Number(col)])) {
          return true;
        }
      })
    },
    checkVerticalCell(row, col) {
      const cellVertical = [[1, 0], [1, 6], [2, 0], [2, 1], [2, 5], [2, 6], [4, 0], [4, 1], [4, 5], [4, 6], [5, 0], [5, 6]]
      return cellVertical.some((item) => {
        if (JSON.stringify(item) === JSON.stringify([Number(row), Number(col)])) {
          return true;
        }
      })
    }
  }
}
</script>

<style scoped>
.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>