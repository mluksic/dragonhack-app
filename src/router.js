import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";
import Campaign from "./views/Campaign.vue";
import Report from "./views/Report.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/campaign",
      name: "campaign",
      component: Campaign
    },
    {
      path: "/report",
      name: "report",
      component: Report
    }
  ]
});
