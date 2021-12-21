<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-alert v-if="showAlert" type="error">
              {{ errorMsg }}
            </v-alert>
            <v-form
                ref="form"
                v-model="valid"
            >
              <v-text-field
                  prepend-icon="mdi-account"
                  name="email"
                  label="Email"
                  type="email"
                  v-model="email"
                  :rules="emailRules"
                  required
              />
              <v-text-field
                  id="password"
                  name="password"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  :rules="passwordRules"
                  required
              >
                <template #prepend>
                  <v-icon @click="showPassword = !showPassword">
                    {{ passwordIcon }}
                  </v-icon>
                </template>
              </v-text-field>
              <v-text-field
                  id="passwordRepeat"
                  name="passwordRepeat"
                  label="Enter Password again"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="passwordRepeat"
                  :rules="passwordRules"
                  required
              >
                <template #prepend>
                  <v-icon @click="showPassword = !showPassword">
                    {{ passwordIcon }}
                  </v-icon>
                </template>
              </v-text-field>
            </v-form>
            <div align="end">
              <router-link to="/login">Already registered?</router-link>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
                color="primary"
                class="flex"
                @click="submit()"
            >Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'Register',
  data: () => ({
    email: '',
    password: '',
    passwordRepeat : '',
    showPassword: false,
    emailRules: [
      v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v
    ],
    valid: true,
    showAlert: false,
    errorMsg: 'Something went wrong!'
  }),
  computed: {
    passwordIcon() {
      if (this.showPassword) {
        return 'mdi-lock-open'
      }
      return 'mdi-lock'
    }
  },
  methods: {
    async submit() {
      this.showAlert = false
      this.errorMsg = 'Something went wrong!'
      this.$refs.form.validate()
      if (!this.valid)
        return

      if (this.password === this.passwordRepeat) {
        const email = this.email
        const password = this.password

        try {
          await this.$store.dispatch('register', {email, password})
        } catch (e) {
          if(e.toString().includes("email-already-in-use")) {
            this.errorMsg = "Email is already in use!"
          } else {
            this.errorMsg = "Something went wrong!"
          }
          this.showAlert = true
          return
        }
        this.$router.push('/')
      } else {
        this.errorMsg = 'Passwords do not match!'
        this.showAlert = true
      }
    }
  }
};
</script>
