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

<style lang="scss">
  .container {
    color: #636b6f;
    height: 100vh;
    font-weight: 100;
    position: relative;

    .links > a {
      color: #636b6f;
      padding: 0 25px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: .1rem;
      text-decoration: none;
      text-transform: uppercase;
    }
  }
</style>
