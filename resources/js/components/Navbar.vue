<template>
  <v-app-bar
    color="grey lighten-3"
    dense
    fixed
    clipped-left
    app
  >
    <v-app-bar-nav-icon
      v-if="user"
      class="hidden-lg-and-up mr-2"
      @click="$emit('side-icon-click')"
    />

    <v-toolbar-title class="pl-0">
      <router-link class="title text--primary" :to="{ name: 'home' }">
        {{ appName }}
      </router-link>
    </v-toolbar-title>
    <v-spacer />

    <v-toolbar-items>
      <locale-dropdown />
      <!-- Authenticated -->
      <template v-if="user">
        <v-menu
          offset-y
          offset-x
        >
          <template v-slot:activator="{ on }">
            <v-btn
              slot="activator"
              text
              v-on="on"
            >
              <v-avatar
                size="32"
                color="white"
              >
                <v-img
                  :src="user.photo_url"
                />
              </v-avatar>
              <span class="hidden-xs-only ml-2">{{ user.name }}</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              :to="{ name: 'settings.profile' }"
            >
              <v-list-item-title>
                <v-icon>mdi-settings</v-icon>
                {{ $t('settings') }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              @click.prevent="logout"
            >
              <v-list-item-title>
                <v-icon>mdi-logout</v-icon>
                {{ $t('logout') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <!-- Guest -->
      <template v-else>
        <v-btn
          :to="{ name: 'login' }"
          text
        >
          {{ $t('login') }}
        </v-btn>
        <v-btn :to="{ name: 'register' }" text>
          {{ $t('register') }}
        </v-btn>
      </template>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import LocaleDropdown from './LocaleDropdown'

export default {
  components: {
    LocaleDropdown
  },

  head () {
    return { title: this.appName }
  },

  data: () => ({
    appName: window.config.appName
  }),

  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },

  methods: {
    async logout () {
      // Log out the user.
      await this.$store.dispatch('auth/logout')

      // Redirect to login.
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    text-decoration: none !important;
  }
</style>
