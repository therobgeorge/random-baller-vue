<template>
  <div class="home">
    <h1>Random Baller</h1>
    <h1
      v-if="
        (correctGuesses.includes(randomBaller.Position) &&
          correctGuesses.includes(randomBaller.College) &&
          correctGuesses.includes(randomBaller.College) &&
          correctGuesses.includes(randomBaller.Team)) ||
        correctGuesses.includes(currentTeam.City) ||
        correctGuesses.includes(currentTeam.Name) ||
        correctGuesses.includes(`${currentTeam.City} ${currentTeam.Name}`)
      "
    >
      YOU BALLED OUT!
    </h1>
    <img :src="randomBaller.PhotoUrl" alt="" />
    <img
      v-if="
        correctGuesses.includes(randomBaller.Team) ||
        correctGuesses.includes(currentTeam.City) ||
        correctGuesses.includes(currentTeam.Name) ||
        correctGuesses.includes(`${currentTeam.City} ${currentTeam.Name}`)
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
    <h1 v-if="correctGuesses.includes(randomBaller.College)">{{ randomBaller.College }}</h1>
    {{ guessParams.College }}
    <br />
    <p>Team:</p>
    <h1
      v-if="
        correctGuesses.includes(randomBaller.Team) ||
        correctGuesses.includes(currentTeam.City) ||
        correctGuesses.includes(currentTeam.Name) ||
        correctGuesses.includes(`${currentTeam.City} ${currentTeam.Name}`)
      "
    >
      {{ currentTeam.City }} {{ currentTeam.Name }}
    </h1>
    <br />
    <p>Position:</p>
    <h1 v-if="correctGuesses.includes(randomBaller.Position)">{{ randomBaller.Position }}</h1>
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
      this.guessParams = {};
    },
    setCurrentTeam: function () {
      this.currentTeam = this.teams.find(({ Key }) => Key === this.randomBaller.Team);
    },
    submit: function () {
      if (
        this.guess == this.randomBaller.College ||
        this.guess == this.randomBaller.Team ||
        this.guess == this.currentTeam.City ||
        this.guess == this.currentTeam.Name ||
        this.guess == `${this.currentTeam.City} ${this.currentTeam.Name}` ||
        this.guess == this.randomBaller.Position ||
        this.guess == this.randomBaller.Jersey
      ) {
        this.correctGuesses.push(this.guess);
        this.guess = "";
      }
    },
  },
};
</script>
