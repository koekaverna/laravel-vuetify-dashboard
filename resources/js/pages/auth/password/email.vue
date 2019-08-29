<template>
  <v-layout justify-center>
    <v-flex
      xs12
      sm8
      md4
    >
      <v-card>
        <v-form
          @submit.prevent="send"
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
            />
          </v-card-text>
          <v-divider class="mt-1" />
          <v-card-actions>
            <v-btn
              :loading="form.busy"
              color="primary"
              type="submit"
            >
              {{ $t('send_password_reset_link') }}
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
      email: ''
    })
  }),

  methods: {
    async send () {
      const { data } = await this.form.post('/api/password/email')

      this.status = data.status

      this.form.reset()
    }
  }
}
</script>
