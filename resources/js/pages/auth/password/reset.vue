<template>
  <v-layout justify-center>
    <v-flex
      xs12
      sm8
      md4
    >
      <v-card>
        <v-form
          @submit.prevent="reset"
          @keydown="form.onKeydown($event)"
        >
          <v-alert
            v-model="form.successful"
            dismissible
            type="success"
          >
            {{ status }}
          </v-alert>
          <v-card-title>
            <div class="title">
              {{ $t('reset_password') }}
            </div>
          </v-card-title>
          <v-card-text>
            <!-- Email -->
            <v-text-field
              v-model="form.email"
              :label="$t('email')"
              :error-messages="form.errors.errors.email"
              prepend-icon="mdi-email"
              readonly
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
            <!-- Submit Button -->
            <v-btn
              :loading="form.busy"
              color="primary"
              type="submit"
            >
              {{ $t('reset_password') }}
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
    return { title: this.$t('reset_password') }
  },

  data: () => ({
    status: '',
    form: new Form({
      token: '',
      email: '',
      password: '',
      password_confirmation: ''
    })
  }),

  created () {
    this.form.email = this.$route.query.email
    this.form.token = this.$route.params.token
  },

  methods: {
    async reset () {
      const { data } = await this.form.post('/api/password/reset')

      this.status = data.status

      this.form.reset()
    }
  }
}
</script>
