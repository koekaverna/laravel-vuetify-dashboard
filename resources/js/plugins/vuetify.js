import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: colors.amber.darken1,
        secondary: colors.grey.darken1,
        accent: colors.amber,
        error: colors.red.accent3
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
