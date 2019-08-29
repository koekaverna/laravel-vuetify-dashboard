<template>
  <v-app>
    <sidebar v-model="show" />
    <navbar @side-icon-click="togleDrawer" />

    <v-container fluid>
      <v-content>
        <child />
      </v-content>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default {
  // TODO: make layout middlewares
  // middleware: 'auth',

  components: {
    Navbar,
    Sidebar
  },

  data: () => ({
    show: null
  }),

  methods: {
    togleDrawer () {
      this.show = !this.show
    }
  }
}
</script>
