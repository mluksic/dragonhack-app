<template>
  <div class="campaign">
    <h1 class="subheading grey--text">Campaigns</h1>

    <v-container class="my-5">
      <v-expansion-panel focusable>
        <v-expansion-panel-content v-for="camp in campaigns" :key="camp.name">
          <div slot="header">{{ camp.name }} - {{camp.id}}</div>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <v-layout row wrap class="pa-3">
                <v-flex xs2 sm4 md2>
                  <!--<v-btn color="primary" dark>Create Ad</v-btn>-->
                  <PopupAd v-bind:campaignId="camp.id"/>
                </v-flex>
                <!--<v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Person</div>
                  <div>The Net Ninja</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Due by</div>
                  <div>1st Jan 2019</div>
                </v-flex>
                <v-flex xs2 sm4 md2>
                  <div class="caption grey--text">Status</div>
                  <div>ongoing</div>
                </v-flex>-->
              </v-layout>

              <v-container fluid grid-list-md>
                <v-layout row wrap>
                  <v-flex xs12 md6 lg3 v-for="ad in camp.ads" :key="ad">
                    <v-flex xs12>
                      <v-card color="rgba(25, 118, 210, 0.91)" class="white--text">
                        <v-layout>
                          <v-flex xs5>
                            <v-img :src="camp.image" height="125px" contain></v-img>
                          </v-flex>
                          <v-flex xs7>
                            <v-card-title primary-title>
                              <div>
                                <div class="headline">{{ad.name}}</div>
                                <div>
                                  <b>Reach:</b>
                                  {{ad.id}}
                                </div>
                                <div>
                                  <b>Display number:</b>
                                  {{ad.id}}
                                </div>
                                <div>
                                  <b>Location:</b>
                                  {{ad.location}}
                                </div>
                              </div>
                            </v-card-title>
                          </v-flex>
                        </v-layout>
                        <v-divider light></v-divider>
                        <v-card-actions class="pa-3">
                          <v-chip>{{ad.tag}}</v-chip>
                          <v-spacer></v-spacer>
                          <v-btn v-on:click="deleteAd(ad.id)" color="white--grey">DELETE</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-flex>
                  </v-flex>
                </v-layout>
              </v-container>

              <!--<div class="font-weight-bold">Due by {{ camp.name }}</div>
              <div>{{ camp.name }}</div>-->
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>

    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <!--<v-container>
      <v-list>
        <template v-for="(camp, index) in campaign">
          <v-list-tile :key="camp.name" ripple router :to="detailLink(camp)">
            <v-list-tile-content>
    <v-list-tile-title>{{ camp.name }}</v-list-tile-title>-->
    <!--<v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title>-->
    <!--<v-list-tile-sub-title>{{ camp.role }}</v-list-tile-sub-title>
    </v-list-tile-content>-->
    <!--<v-list-tile-action>  
                <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                <v-icon color="grey lighten-1">star_border</v-icon>
    </v-list-tile-action>-->
    <!--</v-list-tile>
          <v-divider v-if="index + 1 < campaign.length" :key="`divider-${camp}`"></v-divider>
        </template>
    </v-list>-->

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
    <!--</v-container>-->
    <!--<v-btn @refrest="refreshData()" hidden></v-btn>-->
  </div>
</template>

<script>
import PopupAd from "../components/PopupAd.vue";
import axios from "axios";

export default {
  components: {
    PopupAd
  },
  mounted() {
    this.campaigns = this.getCampaigns();
  },
  data() {
    return {
      /*headers: [
        {
          text: "Campaigns",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Name", value: "name" },
        { text: "Role", value: "role" }
      ],*/
      campaigns: null
      /*[
        {
          name: "The Net Ninja",
          role: "Web developer",
          avatar: "/avatar-1.png",
          ads: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }]
        },
        {
          name: "Ryu",
          role: "Graphic designer",
          avatar: "/avatar-2.png",
          ads: [{ id: "1" }, { id: "2" }]
        },
        {
          name: "Chun Li",
          role: "Web developer",
          avatar: "/avatar-3.png",
          ads: [{ id: "1" }, { id: "2" }]
        },
        {
          name: "Gouken",
          role: "Social media maverick",
          avatar: "/avatar-4.png",
          ads: [{ id: "1" }, { id: "2" }]
        },
        {
          name: "Yoshi",
          role: "Sales guru",
          avatar: "/avatar-5.png",
          ads: [{ id: "1" }, { id: "2" }]
        }
      ]*/
    };
  },

  methods: {
    detailLink(camp) {
      return "/detail/" + camp.name;
    },
    async deleteAd(adId) {
      //console.log("Delete" + ad.id);
      await axios.delete(`http://193.2.178.254:3000/ads/${adId}`);
      this.getCampaigns();
    },
    getCampaigns() {
      axios.get("http://193.2.178.254:3000/campaigns").then(response => {
        //console.log(response + "ASasSasAS");
        this.campaigns = response.data;
      });
    }
  }
};
</script>
