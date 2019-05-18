<template>
  <div class="campaign">
    <h1 class="subheading grey--text">Details for XXX</h1>

    <v-container fluid>
      <v-layout>
        <v-flex>
          <v-card>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex xs12 md6 lg3 v-for="n in 12" :key="n">
                  <v-card flat tile>
                    <v-card-media
                      :src="`https://api.adorable.io/avatars/285/abott@adorable.png`"
                      height="400px"
                    ></v-card-media>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!--<v-list>
          <v-list-title></v-list-title>
    </v-list>-->
    <!--<v-data-table :items="campaign">
          <template v-slot:items="campaign">
            <td>{{campaign.item.name}}</td>
            <td>{{campaign.item.role}}</td>
          </template>
    </v-data-table>-->
    <!--<v-expansion-panel-content v-for="camp in campaign" :key="camp.name">
          <div slot="header">{{ camp.name }}</div>
    </v-expansion-panel-content>-->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      headers: [
        {
          text: "Campaigns",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Name", value: "name" },
        { text: "Role", value: "role" }
      ],
      campaign: [
        {
          name: "The Net Ninja",
          role: "Web developer",
          avatar: "/avatar-1.png"
        },
        { name: "Ryu", role: "Graphic designer", avatar: "/avatar-2.png" },
        { name: "Chun Li", role: "Web developer", avatar: "/avatar-3.png" },
        {
          name: "Gouken",
          role: "Social media maverick",
          avatar: "/avatar-4.png"
        },
        { name: "Yoshi", role: "Sales guru", avatar: "/avatar-5.png" }
      ]
    };
  }
};
</script>
