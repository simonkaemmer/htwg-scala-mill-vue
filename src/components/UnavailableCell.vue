<template>
  <span>
    <img v-responsive.lg.xl v-if="checkHorizontalCell(row, col)" src="../assets/media/UnavailableCellHorizontal.png" alt="horizontalCell" class="img-fluid">
    <img v-responsive.md v-if="checkHorizontalCell(row, col)" src="../assets/media/UnavailableCellHorizontal.png" width="10%" height="10%" alt="horizontalCell" class="img-fluid">
    <img v-responsive.sm.xs v-if="checkHorizontalCell(row, col)" src="../assets/media/UnavailableCellHorizontal.png" width="5%" height="5%" alt="horizontalCell" class="img-fluid">
    <span v-else>
      <span v-if="checkVerticalCell(row, col)">
        <img v-responsive.lg.xl src="../assets/media/UnavailableCellVertical.png" alt="verticalCell"  class="img-fluid">
        <img v-responsive.md src="../assets/media/UnavailableCellVertical.png" alt="verticalCell" width="10%" height="10%" class="img-fluid">
        <img v-responsive.sm.xs src="../assets/media/UnavailableCellVertical.png" alt="verticalCell" width="5%" height="5%" class="img-fluid">
      </span>
      <span v-else>
        <img v-responsive.lg.xl src="../assets/media/Transparent.png" alt="transparentCell" class="img-fluid">
        <img v-responsive.md src="../assets/media/Transparent.png" alt="transparentCell" width="10%" height="10%" class="img-fluid">
        <img v-responsive.sm.xs src="../assets/media/Transparent.png" alt="transparentCell" width="5%" height="5%" class="img-fluid">
      </span>
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