<template>
  <v-app>
    <navbar />

    <v-container
      bg
      fill-height
      grid-list-md
      text-xs-center
    >
      <v-content>
        <child />
      </v-content>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss" scoped>
  .container {
    color: #636b6f;
    height: 100vh;
    position: relative;

    &::v-deep  .links > a {
      color: #636b6f;
      padding: 0 25px;
      font-size: 12px;
      letter-spacing: .1rem;
      text-decoration: none;
      text-transform: uppercase;
    }
  }
</style>
