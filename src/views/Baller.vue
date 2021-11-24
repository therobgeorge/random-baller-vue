<template>
  <div class="home">
    <h1>Random Baller</h1>
    <h1
      v-if="
        correctGuesses.includes(randomBaller.Position.toLowerCase()) &&
        correctGuesses.includes(randomBaller.College.toLowerCase()) &&
        correctGuesses.includes(randomBaller.Jersey) &&
        correctGuesses.includes(randomBaller.Team.toLowerCase())
      "
    >
      YOU BALLED OUT!
    </h1>
    <img :src="randomBaller.PhotoUrl" alt="" />
    <img
      v-if="
        correctGuesses.includes(randomBaller.Team.toLowerCase()) ||
        correctGuesses.includes(currentTeam.City.toLowerCase()) ||
        correctGuesses.includes(currentTeam.Name.toLowerCase()) ||
        correctGuesses.includes(`${currentTeam.City.toLowerCase()} ${currentTeam.Name.toLowerCase()}`)
      "
      :src="currentTeam.WikipediaLogoUrl"
      alt=""
    />
    <h2>{{ randomBaller.FirstName }} {{ randomBaller.LastName }}</h2>
    <p>
      player object {{ randomBaller.Team }} {{ randomBaller.Position }} {{ randomBaller.College }}
      {{ randomBaller.Jersey }}
    </p>
    <form v-on:submit.prevent="submit()">
      {{ correctGuesses }}
      <label>Guess</label>
      <br />
      <input type="string" v-model="guess" />
      <input type="submit" value="Guess" />
    </form>
    <p>College:</p>
    <h1 v-if="correctGuesses.includes(randomBaller.College.toLowerCase())">{{ randomBaller.College }}</h1>
    <br />
    <p>Team:</p>
    <h1
      v-if="
        correctGuesses.includes(randomBaller.Team.toLowerCase()) ||
        correctGuesses.includes(currentTeam.City.toLowerCase()) ||
        correctGuesses.includes(currentTeam.Name.toLowerCase()) ||
        correctGuesses.includes(`${currentTeam.City.toLowerCase()} ${currentTeam.Name.toLowerCase()}`)
      "
    >
      {{ currentTeam.City }} {{ currentTeam.Name }}
    </h1>
    <br />
    <p>Position:</p>
    <h1 v-if="correctGuesses.includes(randomBaller.Position.toLowerCase())">{{ randomBaller.Position }}</h1>
    <br />
    <p>Jersey Number:</p>
    <h1 v-if="correctGuesses.includes(randomBaller.Jersey.toString())">{{ randomBaller.Jersey }}</h1>
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
      correctGuesses: [],
      guess: "",
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
      this.correctGuesses = [];
    },
    setCurrentTeam: function () {
      this.currentTeam = this.teams.find(({ Key }) => Key === this.randomBaller.Team);
    },
    submit: function () {
      if (
        this.guess.toLowerCase() == this.randomBaller.College.toLowerCase() ||
        this.guess.toLowerCase() == this.randomBaller.Team.toLowerCase() ||
        this.guess.toLowerCase() == this.currentTeam.City.toLowerCase() ||
        this.guess.toLowerCase() == this.currentTeam.Name.toLowerCase() ||
        this.guess.toLowerCase() == `${this.currentTeam.City.toLowerCase()} ${this.currentTeam.Name.toLowerCase()}` ||
        this.guess.toLowerCase() == this.randomBaller.Position.toLowerCase() ||
        this.guess.toLowerCase() == this.randomBaller.Jersey
      ) {
        this.correctGuesses.push(this.guess.toLowerCase());
        this.guess = "";
      }
    },
  },
};
</script>
