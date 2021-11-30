<template>
  <v-container>
    <h1 class="text-center">Information</h1>
    <v-row>
      <v-col>
        <v-expansion-panels v-model="panel1">
          <v-expansion-panel>
            <v-expansion-panel-header>About Mill</v-expansion-panel-header>
            <v-expansion-panel-content>
              {{ panel1Text }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col>
        <v-expansion-panels v-model="panel2">
          <v-expansion-panel>
            <v-expansion-panel-header>History</v-expansion-panel-header>
            <v-expansion-panel-content>
              {{ panel2Text }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <h1 class="text-center">Instructions</h1>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-flag-checkered</v-icon>
            Objective
          </v-card-title>
          <v-card-text>
            {{ card1Text }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-alert-circle-outline</v-icon>
            Rules
          </v-card-title>
          <v-card-text>
            <v-list>
              <template v-for="(item, index) in card2Text">
                <v-list-item :key="`item${index}`">
                  {{ item }}
                </v-list-item>
                <v-carousel v-if="index === 2" :key="`carousel${index}`">
                  <v-carousel-item
                      v-for="(image,i) in carouselImages"
                      :key="i"
                      reverse-transition="fade-transition"
                      transition="fade-transition"
                  >
                    <v-img :src="image.src"></v-img>
                  </v-carousel-item>
                </v-carousel>
                <v-divider
                    :key="`divider${index}`"
                    class="my-2"
                ></v-divider>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InfoService from "../service/infoService";

export default {
  name: 'About',
  data: () => ({
    panel1: false,
    panel1Text: '',
    panel2: false,
    panel2Text: '',
    card1Text: '',
    card2Text: [],
    carouselImages: [
      {
        src: require('../assets/mill_mill1.gif')
      },
      {
        src: require('../assets/mill_mill2.gif')
      }
    ]
  }),
  mounted() {
    InfoService.get('about').then(result => this.panel1Text = result)
    InfoService.get('history').then(result => this.panel2Text = result)
    InfoService.get('objective').then(result => this.card1Text = result)
    InfoService.get('rules').then(result => this.card2Text = result)
  }
}
</script>