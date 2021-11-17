<template>
  <div class="home">
    <h1>Random Squad</h1>
    <img :src="currentTeam.WikipediaLogoUrl" alt="" />
    <h2>{{ currentTeam.City }} {{ currentTeam.Name }}</h2>
    <p>guess params: {{ guessParams }}</p>
    <p>team object: {{ currentTeam }}</p>
    <p>Conference:</p>
    <input type="string" v-model="guessParams.Conference" />
    <h1 v-if="guessParams.Conference == currentTeam.Conference">YES</h1>
    <p>Division:</p>
    <input type="string" v-model="guessParams.Division" />
    <h1 v-if="guessParams.Division == currentTeam.Division">YES</h1>
    <p>Players</p>
    <div v-for="baller in ballers" v-bind:key="baller.id">
      <p>{{ baller.YahooName }} {{ baller.Position }} {{ baller.guess }}</p>
    </div>
    <br />
    <button v-on:click="setCurrentTeam()">Set</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      teams: [],
      currentTeam: [],
      ballers: [],
      guessParams: {},
    };
  },
  created: function () {
    axios
      .get(`https://api.sportsdata.io/v3/nba/scores/json/teams?key=c19b029585bf4933ac52af085391e1f5`)
      .then((response) => {
        console.log("teams", response.data);
        this.teams = response.data;
        this.setCurrentTeam();
      });
  },
  mounted: function () {},
  methods: {
    setCurrentBallers: function () {
      axios
        .get(
          `https://api.sportsdata.io/v3/nba/stats/json/Players/${this.currentTeam.Key}?key=c19b029585bf4933ac52af085391e1f5`
        )
        .then((response) => {
          console.log("players", response.data);
          this.ballers = response.data;
        });
    },
    setCurrentTeam: function () {
      this.currentTeam = this.teams[Math.floor(Math.random() * this.teams.length)];
      this.setCurrentBallers();
    },
  },
};
</script>
