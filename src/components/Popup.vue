<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Create Campaign!</v-btn>
    <v-card>
      <v-card-title>
        <h2>Create Campaign!</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
          <v-textarea label="Content" v-model="content" prepend-icon="edit" :rules="inputRules"></v-textarea>
          <v-menu>
            <v-text-field
              :rules="inputRules"
              slot="activator"
              :value="formattedDate"
              label="Due date"
              prepend-icon="date_range"
            ></v-text-field>
            <v-date-picker v-model="due"></v-date-picker>
          </v-menu>
          <v-spacer></v-spacer>
          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Add Campaign</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {};
</script>

<style>
</style>
