<template>
  <v-row style="margin: 0px">
    <v-col
      cols="12"
      lg="7"
      xl="6"
      class="info d-none d-md-flex align-center justify-center"
    >
      <v-container>
        <div class="pa-10">
          <v-row justify="center">
            <v-col cols="8" xl="5">
              <div>
                <h2 class="display-1 white--text font-weight-medium">
                  Elegant Design with unlimited features, built with love
                </h2>
                <h6
                  class="subtitle-1 mt-4 white--text op-5 font-weight-regular"
                >
                  Wrappixel helps developers to build organized and well-coded
                  admin dashboards full of beautiful and feature rich modules.
                </h6>
              </div>
            </v-col>
          </v-row>
        </div>
        
      </v-container>
    </v-col>
    <v-col cols="12" lg="5" xl="6" class="d-flex align-center">
      <v-container>
        <div class="pa-7 pa-sm-12">
          <v-row>
            <v-col cols="12" lg="9" xl="6">
              <!-- <img src="@/assets/images/logo-icon.png" /> -->
              <h2 class="font-weight-bold mt-4 blue-grey--text text--darken-2">
                Sign in
              </h2>
              <!-- <h6 class="subtitle-1">
                Don't have an account?
                <a href="#/pages/fullregister" class>Sign Up</a>
              </h6> -->

              <v-form
                ref="form"
                v-model="valid"
                required
                lazy-validation
                action="/dashboards/analytical"
              >
                <v-text-field
                  v-model="id"
                  label="ID"
                  class="mt-4"
                  required
                  outlined
                  :rules="idRules"
                  @keydown="keydown"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :counter="10"
                  :rules="passwordRules"
                  label="Password"
                  required
                  outlined
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @keydown="keydown"
                ></v-text-field>

                <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
                  <h6>{{ message }}</h6>
                </div>
                <!-- <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Remember me?"
                    required
                  ></v-checkbox>
                  <div class="ml-auto">
                    <a href="javascript:void(0)" class="link">Forgot pwd?</a>
                  </div>
                </div> -->
                <v-btn
                  :disabled="!valid"
                  color="info"
                  block
                  class="mr-4 mt-4"
                  submit
                  @click="submit"
                  >Sign In</v-btn
                >
              </v-form>
              <!-- <div class="text-center mt-6">
                <v-chip pill class="mr-2">
                  <v-avatar left>
                    <v-btn color="blue lighten-1" class="white--text">
                      <v-icon>mdi-twitter</v-icon>
                    </v-btn> </v-avatar
                  >Twitter
                </v-chip>
                <v-chip pill>
                  <v-avatar left>
                    <v-btn color="teal lighten-2" class="white--text">
                      <v-icon>mdi-github</v-icon>
                    </v-btn> </v-avatar
                  >Github
                </v-chip>
              </div> -->
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { sync } from "vuex-pathify";
import apiHelper from "@/utils/apiHelper";
export default {
  name: "FullLogin",
  data: () => ({
    valid: true,
    password: "",
    show1: false,
    idRules: [
      (v) => !!v || "ID is required",
      (v) => (v && v.length <= 10) || "ID must be less than 10 characters",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length <= 10) || "Password must be less than 10 characters",
    ],
    id: "",
    checkbox: false,
    message: "",
  }),
  computed: {
    account: sync("account/account"),
    domain: sync("account/account@domain"),
  },
  methods: {
    keydown(e) {
      if (e.key === "Enter") {
        this.submit();
      }
    },
 
    async submit() {
      this.$refs.form.validate();
      const res = apiHelper.getMock("login");

      if (this.id == "admin" && this.password == "admin") {
        this.account = res;
        window.localStorage.setItem("account", res);
        await this.getZone();
        this.$router.push({ name: "HOME" });
      } else {
        this.message = "Incorrect ID or password.";
      }
    },
  },
};
</script>
