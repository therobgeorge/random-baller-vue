<template>
  <div class="home">
    <h1>Random Baller</h1>
    <img :src="randomBaller.PhotoUrl" alt="" />
    <img :src="currentTeam.WikipediaLogoUrl" alt="" />
    <h2>{{ randomBaller.FirstName }} {{ randomBaller.LastName }}</h2>
    <p>
      player object {{ randomBaller.Team }} {{ randomBaller.Position }} {{ randomBaller.College }}
      {{ randomBaller.Jersey }}
    </p>
    <p>guess params: {{ guessParams }}</p>
    <p>team object: {{ currentTeam }}</p>
    <p>College:</p>
    <input type="string" v-model="guessParams.College" />
    <h1 v-if="guessParams.College == randomBaller.College">YES</h1>
    {{ guessParams.College }}
    <br />
    <p>Team:</p>
    <input type="string" v-model="guessParams.Team" />
    <h1
      v-if="
        guessParams.Team == randomBaller.Team ||
        guessParams.Team == currentTeam.City ||
        guessParams.Team == currentTeam.Name ||
        guessParams.Team == `${currentTeam.City} ${currentTeam.Name}`
      "
    >
      YES
    </h1>
    <br />
    <p>Position:</p>
    <input type="string" v-model="guessParams.Position" />
    <h1 v-if="guessParams.Position == randomBaller.Position">YES</h1>
    <br />
    <p>Jersey Number:</p>
    <input type="string" v-model="guessParams.Jersey" />
    <h1 v-if="guessParams.Jersey == randomBaller.Jersey">YES</h1>
    <br />
    <button v-on:click="setRandomBaller(), setCurrentTeam()">Set</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      ballers: [],
      teams: [],
      randomBaller: [],
      currentTeam: [],
      guessParams: {},
    };
  },
  created: function () {
    axios
      .get(`https://api.sportsdata.io/v3/nba/scores/json/Players?key=c19b029585bf4933ac52af085391e1f5`)
      .then((response) => {
        console.log("ballers", response.data);
        this.ballers = response.data;
        this.setRandomBaller();
        this.setCurrentTeam();
      });
    axios
      .get(`https://api.sportsdata.io/v3/nba/scores/json/teams?key=c19b029585bf4933ac52af085391e1f5`)
      .then((response) => {
        console.log("teams", response.data);
        this.teams = response.data;
      });
  },
  mounted: function () {},
  methods: {
    setRandomBaller: function () {
      this.randomBaller = this.ballers[Math.floor(Math.random() * this.ballers.length)];
      console.log(this.randomBaller);
      this.guessParams = {};
    },
    setCurrentTeam: function () {
      this.currentTeam = this.teams.find(({ Key }) => Key === this.randomBaller.Team);
    },
  },
};
</script>
