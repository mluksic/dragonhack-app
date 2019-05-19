<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Create Ad</v-btn>
    <v-card>
      <v-card-title>
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
          <v-text-field label="Name" v-model="name" prepend-icon="folder" :rules="inputRules"></v-text-field>
          <!--<v-textarea label="Content" v-model="content" prepend-icon="edit" :rules="inputRules"></v-textarea>-->
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
          <v-text-field
            label="Location"
            v-model="location"
            prepend-icon="location_city"
            :rules="inputRules"
          ></v-text-field>
          <v-menu>
            <v-text-field
              slot="activator"
              :value="formattedDate"
              label="Start"
              prepend-icon="date_range"
            ></v-text-field>
            <v-date-picker v-model="start"></v-date-picker>
          </v-menu>
          <v-menu>
            <v-text-field slot="activator" :value="formattedDate" label="Due"></v-text-field>
            <v-date-picker v-model="due"></v-date-picker>
          </v-menu>
          <v-combobox
            v-model="chips"
            :items="items"
            label="Your ad target interests"
            chips
            clearable
            prepend-icon="filter_list"
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
          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    start: null,
    chips: [],
    items: ["eyeglasses", "sunglasses", "beard", "Young", "Middle", "Old"],
    name: null,
    imageName: "",
    imageUrl: "",
    imageFile: "",
    location: null
  }),
  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },

    pickFile() {
      this.$refs.image.click();
    },

    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    }
  }
};
</script>

<style>
</style>
