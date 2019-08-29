<template>
  <v-layout justify-center>
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title>
          <div class="title">
            {{ $t('verify_email') }}
          </div>
        </v-card-title>
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
            <!-- Submit Button -->
            <v-btn
              :loading="form.busy"
              color="primary"
              type="submit"
            >
              {{ $t('send_verification_link') }}
            </v-btn>
          </v-card-actions>
          </form>
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
    return { title: this.$t('verify_email') }
  },

  data: () => ({
    status: '',
    form: new Form({
      email: ''
    })
  }),

  created () {
    if (this.$route.query.email) {
      this.form.email = this.$route.query.email
    }
  },

  methods: {
    async send () {
      const { data } = await this.form.post('/api/email/resend')

      this.status = data.status

      this.form.reset()
    }
  }
}
</script>
