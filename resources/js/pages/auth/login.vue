<template>
  <v-layout justify-center>
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card ref="form">
        <v-form
          @submit.prevent="login"
          @keydown="form.onKeydown($event)"
        >
          <v-card-title>
            <div class="title">
              {{ $t('login') }}
            </div>
          </v-card-title>
          <v-card-text>
            <!-- Email -->
            <v-text-field
              v-model="form.email"
              prepend-icon="mdi-email"
              :label="$t('email')"
              :error-messages="form.errors.errors.email"
            />

            <!-- Password -->
            <v-text-field
              v-model="form.password"
              prepend-icon="mdi-lock"
              type="password"
              :label="$t('password')"
              :error-messages="form.errors.errors.password"
            />

            <!-- Remember Me -->
            <v-checkbox
              v-model="remember"
              color="green"
            >
              <div slot="label">
                {{ $t('remember_me') }}
              </div>
            </v-checkbox>
          </v-card-text>
          <v-divider class="mt-1" />
          <v-card-actions>
            <v-btn
              color="primary"
              :loading="form.busy"
              type="submit"
            >
              {{ $t('login') }}
            </v-btn>
            <v-spacer />
            <v-btn
              color="secondary"
              text
              :to="{ name: 'password.request' }"
            >
              {{ $t('forgot_password') }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Form from 'vform'

export default {
  middleware: 'guest',

  metaInfo () {
    return { title: this.$t('login') }
  },

  data: () => ({
    form: new Form({
      email: '',
      password: ''
    }),
    remember: false
  }),

  methods: {
    async login () {
      // Submit the form.
      const { data: { token, remember } } = await this.form.post('/api/login')

      // Save the token.
      this.$store.dispatch('auth/saveToken', {
        token,
        remember
      })

      // Fetch the user.
      await this.$store.dispatch('auth/fetchUser')

      // Fetch teams
      await this.$store.dispatch('auth/fetchTeams')

      // Redirect home.
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
