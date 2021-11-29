<template>
  <span>
    <img v-responsive.lg.xl :src="image" :key="image" alt="availableCell" class="img-fluid" />
    <img v-responsive.md :src="image" :key="image" width="10%" height="10%" alt="availableCell" class="img-fluid" />
    <img v-responsive.sm.xs :src="image" :key="image" width="5%" height="5%" alt="availableCell" class="img-fluid" />
  </span>
</template>

<script>

import vueResponsive from "vue-responsive";
import Vue from "vue";

Vue.directive('responsive', vueResponsive)
export default {
  name: 'AvailableCell',
  props: {
    row: {
      type: Number,
      required: true
    },
    col: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  data: () => ({
    image: require('../assets/media/Loading.png')
  }),
  mounted() {
    this.setImage()
  },
  methods: {
    setImage() {
      switch (this.color) {
        case 'white':
          this.image = require('../assets/media/WhiteStone.png')
          break;
        case 'black':
          this.image = require('../assets/media/BlackStone.png')
          break;
        case 'noColor':
          // eslint-disable-next-line no-case-declarations
          let image = this.getCellPosition()
          if (image === '') {
            image = 'Error'
          }
          this.image = require(`../assets/media/${image}.png`)
          break;
        default:
          this.image = require('../assets/media/Error.png')
          break;
      }
    },
    getCellPosition() {
      const cells = new Map()
          .set('AvailableCellTopLeft', [[0,0], [1,1], [2,2]])
          .set('AvailableCellTopRight', [[0,6], [1,5], [2,4]])
          .set('AvailableCellBottomRight', [[6,6], [5,5], [4,4]])
          .set('AvailableCellBottomLeft', [[6,0], [5,1], [4,2]])
          .set('AvailableCellMiddle', [[1,3], [3,5], [5,3], [3,1]])
          .set('AvailableCellHorizontalTop', [[0,3], [4,3]])
          .set('AvailableCellHorizontalBottom', [[2,3], [6,3]])
          .set('AvailableCellVerticalLeft', [[3,0], [3,4]])
          .set('AvailableCellVerticalRight', [[3,2], [3,6]])
      for (const [key, value] of cells.entries()) {
        const found = value.some((item) => {
          return JSON.stringify(item) === JSON.stringify([this.row, this.col]);
        });
        if (found) {
          return key;
        }
      }
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