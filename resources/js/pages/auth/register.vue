<template>
  <v-layout justify-center>
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card
        v-if="mustVerifyEmail"
      >
        <v-card-title>
          <div class="title">
            {{ $t('register') }}
          </div>
        </v-card-title>
        <v-card-text>
          <v-alert
            type="success"
          >
            {{ $t('verify_email_address') }}
          </v-alert>
        </v-card-text>
      </v-card>
      <v-card v-else>
        <v-form
          @submit.prevent="register"
          @keydown="form.onKeydown($event)"
        >
          <v-card-title>
            <div class="title">
              {{ $t('register') }}
            </div>
          </v-card-title>
          <v-card-text>
            <!-- Name -->
            <v-text-field
              v-model="form.name"
              :label="$t('name')"
              :error-messages="form.errors.errors.name"
              prepend-icon="mdi-account"
            />

            <!-- Email -->
            <v-text-field
              v-model="form.email"
              :label="$t('email')"
              :error-messages="form.errors.errors.email"
              prepend-icon="mdi-email"
            />

            <!-- Password -->
            <v-text-field
              v-model="form.password"
              :label="$t('password')"
              :error-messages="form.errors.errors.password"
              prepend-icon="mdi-lock"
              type="password"
            />

            <!-- Password Confirmation -->
            <v-text-field
              v-model="form.password_confirmation"
              :label="$t('confirm_password')"
              :error-messages="form.errors.errors.password_confirmation"
              prepend-icon="mdi-lock"
              type="password"
            />
          </v-card-text>
          <v-divider class="mt-1" />
          <v-card-actions>
            <v-btn
              :loading="form.busy"
              color="primary"
              type="submit"
            >
              {{ $t('register') }}
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
    return { title: this.$t('register') }
  },

  data: () => ({
    form: new Form({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }),
    mustVerifyEmail: false
  }),

  methods: {
    async register () {
      // Register the user.
      const { data } = await this.form.post('/api/register')

      // Must verify email fist.
      if (data.status) {
        this.mustVerifyEmail = true
      } else {
        // Log in the user.
        const { data: { token } } = await this.form.post('/api/login')

        // Save the token.
        this.$store.dispatch('auth/saveToken', { token })

        // Update the user.
        await this.$store.dispatch('auth/updateUser', { user: data })

        // Redirect home.
        this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>
