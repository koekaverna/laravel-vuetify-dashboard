<template>
  <v-container
    fill-height
    style="height: calc(100vh - 58px);"
  >
    <v-layout align-center>
      <v-flex text-center>
        <h1 class="display-2 primary--text">
          {{ $t('title_404') }}
        </h1>
        <p>{{ $t('page_not_found') }}</p>
        <v-btn :to="{ name: 'welcome' }" outlined color="primary">
          <v-icon>mdi-home</v-icon>
          {{ $t('go_home') }}
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'NotFound',

  metaInfo () {
    return { title: this.$t('title_404') }
  }
}
</script>
