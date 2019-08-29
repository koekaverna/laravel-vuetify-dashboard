<template>
  <v-layout>
    <h3 class="headline">
      {{ $t('you_are_logged_in') }}
    </h3>
  </v-layout>
</template>

<script>
export default {
  middleware: 'auth',

  layout: 'dashboard',

  metaInfo () {
    return { title: this.$t('home') }
  }
}
</script>
