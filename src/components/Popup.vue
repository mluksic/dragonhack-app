<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Create Campaign!</v-btn>
    <v-card>
      <v-card-title>
        <h2>Create Campaign!</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Name" v-model="name" prepend-icon="folder"></v-text-field>
          <!--<v-textarea label="Content" v-model="content" prepend-icon="edit" :rules="inputRules"></v-textarea>
          <v-menu>
            <v-text-field
              :rules="inputRules"
              slot="activator"
              :value="formattedDate"
              label="Due date"
              prepend-icon="date_range"
            ></v-text-field>
            <v-date-picker v-model="due"></v-date-picker>
          </v-menu>-->
          <v-spacer></v-spacer>
          <v-btn
            flat
            class="success mx-0 mt-3"
            @click="createcampaign"
            :loading="loading"
          >Add Campaign</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: null,
      createResp: null,
      loading: false,
      dialog: false
    };
  },
  methods: {
    createcampaign() {
      //const url = "193.2.178.254:3000/campaigns";
      //const data {
      //  name: this.name;
      //},
      this.loading = true;
      axios({
        method: "post",
        url: "http://193.2.178.254:3000/campaigns",
        data: {
          name: this.name
        }
      })
        .then(response => {
          this.createResp = response.status;
          this.dialog = false;
          this.$emit("projectAdded");
          //this.$emit("refresh");
          //console.log(response);
        })
        .catch(error => {
          //console.error(error);
          this.$emit(error);
        });

      //console.log("dasdsad" + this.name);
    }
  }
};
</script>

<style>
</style>
