<template>
  <div class="home">
    <section id="header">
      <h1 id="logo">Random Baller</h1>
    </section>

    <section id="features">
      <div class="row aln-center">
        <div class="col-4 col-6-medium col-12-small">
          <section>
            <header>
              <h3>{{ randomBaller.FirstName }} {{ randomBaller.LastName }}</h3>
            </header>
            <img :src="randomBaller.PhotoUrl" alt="" />
            <br />
            <br />

            <form v-on:submit.prevent="submit()">
              <input type="string" placeholder="Guess" v-model="guess" />
            </form>
            <br />
            <h3>
              Current Team:
              <span v-if="team.Guessed === true">{{ randomBaller.Team }}</span>
            </h3>
            <h3>
              College:
              <span v-if="college.Guessed === true">{{ randomBaller.College }}</span>
            </h3>
            <h3>
              Number:
              <span v-if="number.Guessed === true">{{ randomBaller.Jersey }}</span>
            </h3>
            <h3>
              Position:
              <span v-if="position.Guessed === true">{{ randomBaller.Position }}</span>
            </h3>
            <br />
            <section
              id="header"
              v-if="
                position.Guessed === true &&
                college.Guessed === true &&
                number.Guessed === true &&
                team.Guessed === true
              "
            >
              <h1 id="logo">{{ heatCheck }}</h1>
              <p>Shooting Streak: {{ streak }}</p>
            </section>
            <br />
            <button v-on:click="setRandomBaller(), setCurrentTeam()">New Baller</button>
          </section>
        </div>
      </div>
    </section>
    <p>
      player object {{ randomBaller.Team }} {{ randomBaller.Position }} {{ randomBaller.College }}
      {{ randomBaller.Jersey }}
    </p>

    <!-- <h1>Random Baller</h1>
    <h1 v-if="streak >= 2">{{ heatCheck }}</h1>
    <h1
      v-if="position.Guessed === true && college.Guessed === true && number.Guessed === true && team.Guessed === true"
    >
      YOU BALLED OUT! Shooting Streak: {{ streak }}
    </h1>
    <img :src="randomBaller.PhotoUrl" alt="" />
    <img v-if="team.Guessed === true" :src="currentTeam.WikipediaLogoUrl" alt="" />
    <h2>{{ randomBaller.FirstName }} {{ randomBaller.LastName }}</h2>
    <p>
      player object {{ randomBaller.Team }} {{ randomBaller.Position }} {{ randomBaller.College }}
      {{ randomBaller.Jersey }}
    </p>
    <form v-on:submit.prevent="submit()">
      <label>Guess</label>
      <br />
      <input type="string" v-model="guess" />
      <input type="submit" value="Guess" />
    </form>
    <p>College:</p>
    <h1 v-if="college.Guessed === true">{{ randomBaller.College }}</h1>
    <br />
    <p>Team:</p>
    <h1 v-if="team.Guessed === true">{{ currentTeam.City }} {{ currentTeam.Name }}</h1>
    <br />
    <p>Position:</p>
    <h1 v-if="position.Guessed === true">{{ randomBaller.Position }}</h1>
    <br />
    <p>Jersey Number:</p>
    <h1 v-if="number.Guessed === true">{{ randomBaller.Jersey }}</h1>
    <br />
    <button v-on:click="setRandomBaller(), setCurrentTeam()">Set</button> -->
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
      guess: "",
      college: {},
      team: { City: "" },
      position: {},
      number: {},
      streak: 0,
      heatCheck: "You Balled Out!",
    };
  },
  created: function () {
    axios
      .get(`https://api.sportsdata.io/v3/nba/scores/json/Players?key=c19b029585bf4933ac52af085391e1f5`)
      .then((response) => {
        console.log("ballers", response.data);
        this.ballers = response.data;
        this.setRandomBaller();
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
      console.log("baller", this.randomBaller);
      if (
        this.team.Guessed === false ||
        this.college.Guessed === false ||
        this.number.Guessed === false ||
        this.position.Guessed === false
      ) {
        this.streak = 0;
        this.heatCheck = "You Balled Out!";
      }
      this.college = { College: this.randomBaller["College"], Guessed: false };
      this.position = { Position: this.randomBaller["Position"], Guessed: false };
      this.number = { Number: this.randomBaller["Jersey"].toString(), Guessed: false };
      this.correctGuesses = [];
      this.setCurrentTeam();
    },
    setCurrentTeam: function () {
      this.currentTeam = this.teams.find(({ Key }) => Key === this.randomBaller.Team);
      console.log("team", this.currentTeam);
      this.team = { City: this.currentTeam["City"], Name: this.currentTeam["Name"], Guessed: false };
    },
    submit: function () {
      if (this.guess.toLowerCase() === this.college.College.toLowerCase()) {
        this.college["Guessed"] = true;
        this.guess = "";
        this.streakCheck();
      } else if (
        this.guess.toLowerCase() === this.team.City.toLowerCase() ||
        this.guess.toLowerCase() === this.team.Name.toLowerCase() ||
        this.guess.toLowerCase() === `${this.team.City.toLowerCase()} ${this.team.Name.toLowerCase()}`
      ) {
        this.team.Guessed = true;
        this.guess = "";
        this.streakCheck();
      } else if (this.guess.toLowerCase() === this.position.Position.toLowerCase()) {
        this.position["Guessed"] = true;
        this.guess = "";
        this.streakCheck();
      } else if (this.guess === this.number.Number) {
        this.number["Guessed"] = true;
        this.guess = "";
        this.streakCheck();
      }
    },
    streakCheck: function () {
      if (
        this.position.Guessed === true &&
        this.college.Guessed === true &&
        this.number.Guessed === true &&
        this.team.Guessed === true
      ) {
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
