<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Create Ad</v-btn>
    <v-card>
      <v-card-title class="grey lighten-4">
        <h2>Create Ad!</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <!--
                name
                image
                tag
                locations
                from
                to
                campaign_id
          -->
          <v-text-field label="Name" v-model="name" prepend-icon="folder"></v-text-field>
          <!--<v-textarea label="Content" v-model="content" prepend-icon="edit" ></v-textarea>-->
          <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
            <img :src="imageUrl" height="150" v-if="imageUrl">
            <v-text-field
              label="Select Image"
              @click="pickFile"
              v-model="imageName"
              prepend-icon="attach_file"
            ></v-text-field>
            <input
              type="file"
              style="display: none"
              ref="image"
              accept="image/*"
              @change="onFilePicked"
            >
          </v-flex>
          <!-- <v-text-field label="Tag" v-model="tag" prepend-icon="location_city"></v-text-field> -->
          <!-- <v-text-field label="Location" v-model="location" prepend-icon="location_city"></v-text-field> -->
          <v-layout wrap align-center>
            <v-flex xs12 d-flex>
              <v-select :items="locations" label="Location" prepend-icon="location_city"></v-select>
            </v-flex>
          </v-layout>
          <v-layout wrap align-center>
            <v-flex xs12 d-flex>
              <v-select :items="gender" label="Gender" @change="this.gender" prepend-icon="face"></v-select>
            </v-flex>
          </v-layout>
          <v-menu>
            <v-text-field
              xs6
              slot="activator"
              :value="formattedDateStart"
              label="Start"
              prepend-icon="date_range"
            ></v-text-field>
            <v-date-picker v-model="start"></v-date-picker>
          </v-menu>
          <v-menu>
            <v-text-field xs6 slot="activator" :value="formattedDateDue" label="To"></v-text-field>
            <v-date-picker v-model="due"></v-date-picker>
          </v-menu>
          <v-combobox
            v-model="chips"
            :items="tags"
            label="Your ad target interests"
            chips
            clearable
            prepend-icon="loyalty"
            solo
            multiple
          >
            <template v-slot:selection="data">
              <v-chip :selected="data.selected" close @input="remove(data.item)">
                <strong>{{ data.item }}</strong>&nbsp;
                <span>(interest)</span>
              </v-chip>
            </template>
          </v-combobox>
          <v-spacer></v-spacer>
          <v-btn flat class="success mx-0 mt-3" @click="addAd" :loading="loading">Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import format from "date-fns/format";

export default {
  data: () => ({
    dialog: false,
    start: null,
    due: null,
    chips: [],
    tags: [
      "eyeglasses",
      "sunglasses",
      "beard",
      "Young",
      "Middle",
      "Old",
      "default"
    ],
    gender: ["Male", "Female"],
    name: null,
    imageName: "",
    imageUrl: "",
    imageFile: "",
    locations: "Ljubljana",
    test: ["Foo", "Bar", "Fizz", "Buzz"]
  }),
  props: ["campaignId"],
  computed: {
    formattedDateDue() {
      return this.due ? format(this.due, "Do MMM YYYY") : "";
    },
    formattedDateStart() {
      return this.start ? format(this.start, "Do MMM YYYY") : "";
    }
  },
  methods: {
    addAd() {
      const object = {
        name: this.name,
        tag:
          this.chips.length > 1 ? this.chips[0] + this.chips[1] : this.chips[0],
        image: this.image,
        location: this.locations,
        gender: this.gender,
        campaign: this.campaignId
      };
      console.table(object);
      axios({
        method: "post",
        url: "http://193.2.178.254:3000/ads",
        data: object
      })
        .then(response => {
          this.createResp = response.status;
          this.dialog = false;
          this.image = null;
          this.name = null;
          this.tag = null;
          this.location = null;
          this.gender = null;
          this.$emit("reload");
        })
        .catch(error => {
          console.error(error);
        });
    },
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      console.log(files);
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0];
          this.image = fr.result;
          //   this.image = fr.result.replace(/^data:(.*;base64,)?/, "");
          console.log("imageeee" + this.image);
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }

      //   this.image = e.target.files[0];
      //   console.table(this.image);
      //   console.log("file set");
    }
  }
};
</script>

<style>
</style>
