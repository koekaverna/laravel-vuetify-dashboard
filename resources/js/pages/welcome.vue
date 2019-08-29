<template>
  <div>
    <div class="text-center">
      <h1 class="display-3 mb-4">
        {{ title }}
      </h1>

      <div class="links">
        <a href="https://github.com/koekaverna/laravel-vuetify-dashboard">github.com/koekaverna/laravel-vuetify-dashboard</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  metaInfo () {
    return { title: this.$t('home') }
  },

  data: () => ({
    title: window.config.appName
  }),

  computed: mapGetters({
    authenticated: 'auth/check'
  })
}
</script>
