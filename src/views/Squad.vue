<template>
  <div class="home">
    <h1>Random Squad</h1>
    <h1 v-if="streak >= 2">{{ heatCheck }}</h1>
    <h1 v-if="allBallersGuessed === true && stadium.Guessed === true">YOU BALLED OUT Shooting Streak {{ streak }}</h1>
    <img :src="currentTeam.WikipediaLogoUrl" alt="" />
    <h2>{{ currentTeam.City }} {{ currentTeam.Name }}</h2>
    <p>team object: {{ currentTeam }}</p>
    <form v-on:submit.prevent="submit()">
      <label>Guess</label>
      <br />
      <input type="string" v-model="guess" />
      <input type="submit" value="Guess" />
    </form>
    <p>Stadium:</p>
    <h1 v-if="stadium.Guessed === true">{{ stadium.Name }}</h1>
    <p>Players</p>
    <div v-for="baller in ballers" v-bind:key="baller.id">
      <p v-if="baller.Guessed === true">
        {{ baller.YahooName }}
      </p>
      <p>{{ baller.Position }}</p>
      <p>{{ baller.Guessed }}</p>
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
      guess: [],
      allBallersGuessed: false,
      stadium: { Guessed: false },
      streak: 0,
      heatCheck: "",
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
          this.ballers.forEach((baller) => (baller["Guessed"] = false));
        });
    },
    setCurrentTeam: function () {
      this.currentTeam = this.teams[Math.floor(Math.random() * this.teams.length)];
      if (this.stadium.Guessed === false || this.allBallersGuessed === false) {
        this.streak = 0;
      }
      this.allBallersGuessed = false;
      this.setCurrentBallers();
      this.setCurrentStadium();
    },
    setCurrentStadium: function () {
      axios
        .get(`https://api.sportsdata.io/v3/nba/scores/json/Stadiums?key=c19b029585bf4933ac52af085391e1f5`)
        .then((response) => {
          console.log("stadiums", response.data);
          this.stadium = {
            Name: response.data.find((stadium) => stadium.StadiumID === this.currentTeam.StadiumID).Name,
            Guessed: false,
          };
        });
    },
    checkAllBallers: function () {
      if (this.ballers.every((baller) => baller["Guessed"] === true)) {
        this.allBallersGuessed = true;
      }
    },
    submit: function () {
      if (this.stadium.Name.toLowerCase() === this.guess.toLowerCase()) {
        this.stadium.Guessed = true;
        this.guess = "";
        this.streakCheck();
      } else if (this.ballers.some((baller) => baller.LastName.toLowerCase() === this.guess.toLowerCase())) {
        this.ballers.find((baller) => baller["LastName"].toLowerCase() === this.guess.toLowerCase())["Guessed"] = true;
        this.guess = "";
        this.checkAllBallers();
        this.streakCheck();
      } else if (this.ballers.some((baller) => baller.YahooName.toLowerCase() === this.guess.toLowerCase())) {
        this.ballers.find((baller) => baller["YahooName"].toLowerCase() === this.guess.toLowerCase())["Guessed"] = true;
        this.guess = "";
        this.checkAllBallers();
        this.streakCheck();
      }
    },
    streakCheck: function () {
      if (this.stadium["Guessed"] === true && this.allBallersGuessed === true) {
        this.streak += 1;
        if (this.streak === 2) {
          this.heatCheck = "You're heating up!";
        } else if (this.streak >= 3) {
          this.heatCheck = "You're on fire!";
        }
      }
    },
  },
};
</script>
