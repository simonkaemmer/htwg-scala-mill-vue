<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                  prepend-icon="mdi-account"
                  name="email"
                  label="Email"
                  type="text"
                  v-model="email"
              />
              <v-text-field
                  id="password"
                  name="password"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'Register',
  data: () => ({
    email: '',
    password: '',
    passwordRepeat : '',
    showPassword: false
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
    submit() {
      if (this.password === this.passwordRepeat) {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, this.email, this.password)
            .then(result => {
              alert('success')
              console.log(result)
            }).catch(error => {
          alert('error')
          console.log(error)
        })
      }
    }
  }
};
</script>
