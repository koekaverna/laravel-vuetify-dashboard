<template>
  <v-form
    @submit.prevent="update"
    @keydown="form.onKeydown($event)"
  >
    <v-card-title>
      <div class="title">
        {{ $t('your_password') }}
      </div>
    </v-card-title>
    <v-card-text>
      <v-alert
        v-model="form.successful"
        dismissible
        type="success"
      >
        {{ $t('password_updated') }}
      </v-alert>
      <!-- Password -->
      <v-text-field
        v-model="form.password"
        prepend-icon="mdi-lock"
        type="password"
        :label="$t('new_password')"
        :error-messages="form.errors.errors.password"
      />

      <!-- Password Confirmation -->
      <v-text-field
        v-model="form.password_confirmation"
        prepend-icon="mdi-lock"
        type="password"
        :label="$t('confirm_password')"
        :error-messages="form.errors.errors.password_confirmation"
      />
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <!-- Submit button -->
      <v-btn
        color="primary"
        :loading="form.busy"
        depressed
        type="submit"
      >
        {{ $t('update') }}
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import Form from 'vform'

export default {
  scrollToTop: false,

  metaInfo () {
    return { title: this.$t('settings') }
  },

  data: () => ({
    form: new Form({
      password: '',
      password_confirmation: ''
    })
  }),

  methods: {
    async update () {
      await this.form.patch('/api/settings/password')

      this.form.reset()
    }
  }
}
</script>
