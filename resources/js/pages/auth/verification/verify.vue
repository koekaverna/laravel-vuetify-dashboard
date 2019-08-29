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
        <template v-if="success">
          <v-card-text>
            <v-alert type="success">
              {{ success }}
            </v-alert>
          </v-card-text>
          <v-divider class="mt-1" />
          <v-card-actions>
            <v-btn
              color="primary"
              :to="{ name: 'login' }"
            >
              {{ $t('login') }}
            </v-btn>
          </v-card-actions>
        </template>
        <template v-else>
          <v-card-text>
            <v-alert type="error">
              {{ error || $t('failed_to_verify_email') }}
            </v-alert>
          </v-card-text>
          <v-divider class="mt-1" />

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="secondary"
              text
              :to="{ name: 'verification.resend' }"
            >
              {{ $t('resend_verification_link') }}
            </v-btn>
          </v-card-actions>
        </template>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

const qs = (params) => Object.keys(params).map(key => `${key}=${params[key]}`).join('&')

export default {
  middleware: 'guest',

  metaInfo () {
    return { title: this.$t('verify_email') }
  },

  async beforeRouteEnter (to, from, next) {
    try {
      const { data } = await axios.post(`/api/email/verify/${to.params.id}?${qs(to.query)}`)

      next(vm => { vm.success = data.status })
    } catch (e) {
      next(vm => { vm.error = e.response.data.status })
    }
  },

  data: () => ({
    error: '',
    success: ''
  })
}
</script>
