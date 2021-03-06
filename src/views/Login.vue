<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
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
                  v-model="form.email"
                  :rules="emailRules"
              />
              <v-text-field
                  id="password"
                  name="password"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="form.password"
                  :rules="passwordRules"
              >
                <template #prepend>
                  <v-icon @click="showPassword = !showPassword">
                    {{ passwordIcon }}
                  </v-icon>
                </template>
              </v-text-field>
            </v-form>
            <div align="end">
              <router-link to="/register">Haven't created an account yet?</router-link>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
                color="primary"
                class="flex"
                @click="submit()"
            >Login
            </v-btn>
            <v-btn
                color="primary"
                class="flex"
                @click="submitWithProvider('Google')"
            >Login with Google
              <v-icon class="ml-2">
                mdi-google
              </v-icon>
            </v-btn>
            <v-btn
                color="primary"
                class="flex"
                @click="submitWithProvider('Github')"
            >Login with GitHub
              <v-icon class="ml-2">
                mdi-github
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null,
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
    };
  },
  computed: {
    passwordIcon() {
      if (this.showPassword) {
        return 'mdi-lock-open'
      }
      return 'mdi-lock'
    }
  },
  methods: {
    async submitWithProvider(providerType) {
      this.showAlert = false
      try {
        await this.$store.dispatch('loginWithGoogle', providerType)
      } catch (e) {
        this.showAlert = true
        console.log(e)
        return
      }
      this.$router.push('/')
    },
    async submit() {
      this.showAlert = false
      this.errorMsg = ""
      this.$refs.form.validate()
      if (!this.valid)
        return

      const email = this.form.email
      const password = this.form.password

      try {
        await this.$store.dispatch('login', {email, password})
      } catch (e) {
        console.log(e)
        if(e.toString().includes("user-not-found")) {
          this.errorMsg = "User not found!"
        } else {
          this.errorMsg = "Something went wrong!"
        }
        this.showAlert = true
        return
      }
      this.$router.push('/')
    }
  }
};
</script>
