<template>
  <v-form
    @submit.prevent="update"
    @keydown="form.onKeydown($event)"
  >
    <v-card-title>
      <div class="title">
        {{ $t('your_info') }}
      </div>
    </v-card-title>
    <v-card-text>
      <v-alert
        v-model="form.successful"
        dismissible
        type="success"
      >
        {{ $t('info_updated') }}
      </v-alert>
      <!-- Name -->
      <v-text-field
        v-model="form.name"
        prepend-icon="mdi-account"
        :label="$t('name')"
        :error-messages="form.errors.errors.name"
      />

      <!-- Email -->
      <v-text-field
        v-model="form.email"
        prepend-icon="mdi-email"
        :label="$t('email')"
        :error-messages="form.errors.errors.email"
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
import { mapGetters } from 'vuex'

export default {
  scrollToTop: false,

  metaInfo () {
    return { title: this.$t('settings') }
  },

  data: () => ({
    form: new Form({
      name: '',
      email: ''
    })
  }),

  computed: mapGetters({
    user: 'auth/user'
  }),

  created () {
    // Fill the form with user data.
    this.form.keys().forEach(key => {
      this.form[key] = this.user[key]
    })
  },

  methods: {
    async update () {
      const { data } = await this.form.patch('/api/settings/profile')

      this.$store.dispatch('auth/updateUser', { user: data })
    }
  }
}
</script>
