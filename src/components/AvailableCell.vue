<template>
  <img :src="image" alt="availableCell" class="bounce img-fluid" @click="makeMove(row, col)" />
</template>

<script>
import MillService from '../service/millService'

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
    },
    makeMove(row, col) {
      MillService.makeMove(row, col).then(() => {
        this.$emit('callParentFunction')
      })
    },
  }
}
</script>

<style scoped>
.img-fluid {
  max-width: 100%;
  height: auto;
}

@-webkit-keyframes bounce {
  0%, 100% {
    -webkit-transform: translateY(0);
  }
  50% {
    -webkit-transform: translateY(-5px);
  }
}
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
.bounce:hover {
  -webkit-animation-name: bounce;
  animation-name: bounce;
  -webkit-animation-duration: .5s;
  animation-duration: .5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
}
</style>