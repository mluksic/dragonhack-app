<template>
  <nav>
    <v-snackbar v-model="snackbar" :timeout="4000" color="success">
      <span>Awesome! You added a new Campaign.</span>
      <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <v-toolbar flat app>
      <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Holcar</span>
        <span>Ads</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn flat color="grey" @click="signOut">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="../assets/dragonhack.png">
          </v-avatar>
          <p class="white--text subheading mt-1">Dragon Power</p>
        </v-flex>
        <v-flex class="mt-3 mb-4">
          <Popup @projectAdded="snackbar = true"/>
        </v-flex>
      </v-layout>

      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import Popup from "./Popup.vue";
import Login from "../views/Login.vue";
export default {
  components: {
    Popup,
    Login
  },
  data() {
    return {
      drawer: true,
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/" },
        { icon: "folder", text: "Campaigns", route: "/campaigns" },
        { icon: "poll", text: "Reports", route: "/report" }
      ],
      snackbar: false
    };
  },
  methods: {
    signOut() {
      this.drawer = false;
      this.$router.push("Login");
    }
  }
};
</script>
<style>
</style>