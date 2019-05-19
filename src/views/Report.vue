<template>
  <div id="chart">
    <h1 class="subheading grey--text">Reports</h1>

    <line-chart style="margin-top:30px" :data="dataForDays"></line-chart>
    <bar-chart style="margin-top:30px" :data="chartData"></bar-chart>

    <!-- <geo-chart :data="[['United States', 44], ['Germany', 23], ['Brazil', 22]]"></geo-chart> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  created() {
    this.getReports();
    this.getAds();
  },
  data() {
    return {
      reports: [],
      ads: [],
      adsNames: [],
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [],
      chartOptions: {
        chart: {
          title: "Ads Performance",
          subtitle: "Reach: 2017-2019"
        }
      },
      dataForDays: {}
    };
  },
  methods: {
    getReports() {
      axios.get("http://193.2.178.254:3000/reports").then(response => {
        //console.log(response + "ASasSasAS");
        this.reports = response.data;
        let adsReport = [];
        for (let reportIndex in this.reports) {
          const report = this.reports[reportIndex];

          let index = -1;
          for (let ad in adsReport) {
            if (adsReport[ad].name === report.ad.name) {
              index = ad;
            }
          }

          let dates = { name: report.ad.name, data: {} };
          if (index !== -1) {
            dates = adsReport.splice(index, 1).pop();
          }
          console.log({ dates, index });

          const current_datetime = new Date(report.createdAt);
          let formatted_date =
            current_datetime.getFullYear() +
            "-" +
            (current_datetime.getMonth() + 1) +
            "-" +
            current_datetime.getDate();
          let data = dates["data"];
          if (data.hasOwnProperty(formatted_date)) {
            dates.data[formatted_date] += report.numberOfPeople;
          } else {
            dates.data[formatted_date] = 1;
          }
          adsReport = [...adsReport, dates];

          console.log(adsReport);
        }

        let allTimeDataAd = [];
        for (let adReport in adsReport) {
          const ad = adsReport[adReport];
          let name = ad.name;
          let data = ad.data;
          let allViews = 0;
          for (let key in data) {
            allViews += data[key];
          }
          allTimeDataAd = [...allTimeDataAd, [name, allViews]];
        }
        this.dataForDays = adsReport;
        this.chartData = allTimeDataAd;
      });
    },
    getAds() {
      axios.get("http://193.2.178.254:3000/ads").then(response => {
        //console.log(response + "ASasSasAS");
        this.ads = response.data;

        for (const ad in this.ads) {
          console.log(this.ads[ad].name);
          this.adsNames = [...this.adsNames, this.ads[ad].name];
        }
      });
    }
  }
};
</script>