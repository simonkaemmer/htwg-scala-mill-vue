<template>
  <span>
    <v-app-bar app clipped-left color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-app-bar-title>
        <img src="../assets/mill.png" alt="mill" style="width: 4vh" class="pt-2">
      </v-app-bar-title>
      <v-spacer />
      <v-menu v-if="$store.getters.isLoggedIn" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              class="mr-2"
          >
            Welcome {{ $store.state.name }}
          </v-btn>
        </template>
        <v-btn @click="logout">
          <v-icon>mdi-logout</v-icon>
          Logout
        </v-btn>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer :clipped="true" v-model="drawer" app dark class="primary lighten-2">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Navigation
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense nav>
        <v-list-item
            v-for="(item, index) in items"
            :key="index"
            link
            :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </span>
</template>

<script>
export default {
  name: "NavigationBar",
  data: () => ({
    drawer: false,
    items: [
      {
        icon: 'mdi-controller-classic-outline',
        title: 'Mill',
        path: '/'
      },
      {
        icon: 'mdi-information-outline',
        title: 'Info',
        path: '/about'
      }
    ]
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      await this.$router.push('/login')
    }
  }
}
</script>
