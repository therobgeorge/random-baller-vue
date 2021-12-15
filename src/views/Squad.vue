<template>
  <div class="home">
    <h1>Random Squad</h1>
    <h1
      v-if="
        correctGuesses.includes(stadium.toLowerCase()) &&
        correctGuesses.includes(currentTeam.Conference.toLowerCase()) &&
        correctGuesses.includes(currentTeam.Division.toLowerCase()) &&
        ballers.length === correctBallers.length
      "
    >
      YOU BALLED OUT
    </h1>
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
    <h1 v-if="correctGuesses.includes(stadium.toLowerCase())">{{ stadium }}</h1>
    <p>Conference:</p>
    <h1 v-if="correctGuesses.includes(currentTeam.Conference.toLowerCase())">{{ currentTeam.Conference }}</h1>
    <p>Division:</p>
    <h1 v-if="correctGuesses.includes(currentTeam.Division.toLowerCase())">{{ currentTeam.Division }}</h1>
    <p>Players</p>
    <div v-for="baller in ballers" v-bind:key="baller.id">
      <p
        v-if="
          correctBallers.includes(baller.LastName.toLowerCase()) ||
          correctBallers.includes(baller.YahooName.toLowerCase())
        "
      >
        {{ baller.YahooName }}
      </p>
      <p>{{ baller.Position }}</p>
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
      correctGuesses: [],
      correctBallers: [],
      stadium: "",
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
          this.ballers.forEach((baller) => baller.guessed);
        });
    },
    setCurrentTeam: function () {
      this.currentTeam = this.teams[Math.floor(Math.random() * this.teams.length)];
      this.currentTeam.guessed = false;
      this.setCurrentBallers();
      this.setCurrentStadium();
    },
    setCurrentStadium: function () {
      axios
        .get(`https://api.sportsdata.io/v3/nba/scores/json/Stadiums?key=c19b029585bf4933ac52af085391e1f5`)
        .then((response) => {
          console.log("stadiums", response.data);
          this.stadium = response.data.find((stadium) => stadium.StadiumID === this.currentTeam.StadiumID).Name;
        });
    },
    submit: function () {
      if (
        this.guess.toLowerCase() === this.currentTeam.Conference.toLowerCase() ||
        this.guess.toLowerCase() === this.currentTeam.Division.toLowerCase() ||
        this.guess.toLowerCase() === this.stadium.toLowerCase()
      ) {
        this.correctGuesses.push(this.guess.toLowerCase());
        this.guess = "";
      } else if (
        this.ballers.some((baller) => baller.LastName.toLowerCase() === this.guess.toLowerCase()) ||
        this.ballers.some((baller) => baller.YahooName.toLowerCase() === this.guess.toLowerCase())
      ) {
        this.correctBallers.push(this.guess.toLowerCase());
        this.guess = "";
      }
    },
  },
};
</script>
