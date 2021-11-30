<template>
  <v-bottom-navigation v-model="value">
    <h3>Kevin Schoch, Simon Kaemmer</h3>
  </v-bottom-navigation>
</template>

<script>
export default {
  data: () => ({ value: 'recent' }),
}
</script>