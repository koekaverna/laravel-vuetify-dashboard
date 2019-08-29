<template>
  <v-layout>
    <v-flex
      xs12
      sm10
      md8
      lg6
    >
      <v-card>
        <v-tabs dark>
          <v-tab
            v-for="tab in tabs"
            :key="tab.route"
            :to="{ name: tab.route }"
          >
            <v-icon>{{ tab.icon }}</v-icon>
            {{ tab.name }}
          </v-tab>
        </v-tabs>
        <transition
          name="fade"
          mode="out-in"
        >
          <router-view />
        </transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  middleware: 'auth',

  layout: 'dashboard',

  computed: {
    tabs () {
      return [
        {
          icon: 'mdi-account',
          name: this.$t('profile'),
          route: 'settings.profile'
        },
        {
          icon: 'mdi-lock',
          name: this.$t('password'),
          route: 'settings.password'
        }
      ]
    }
  }
}
</script>
