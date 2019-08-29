<template>
  <v-navigation-drawer
    v-model="drawer"
    dark
    fixed
    clipped
    app
    width="200"
  >
    <v-list dense>
      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
      >
        <v-list-item-avatar>
          <v-icon>
            {{ link.icon }}
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-title
          v-text="link.text"
        />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    value: {
      type: Boolean,
      default: null
    }
  },

  data: () => ({
    appName: window.config.appName,
    links: [
      {
        to: { name: 'home' },
        icon: 'mdi-speedometer',
        text: 'Dashboard'
      },
      {
        to: '/products',
        icon: 'mdi-package-variant-closed',
        text: 'Products'
      },
      {
        to: '/settings',
        icon: 'mdi-account',
        text: 'Profile'
      }
    ]
  }),

  computed: {
    drawer: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
      }
    }
  }

}
</script>
