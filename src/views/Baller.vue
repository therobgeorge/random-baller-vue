<template>
  <div class="baller">
    <section id="header">
      <h1>Random Baller</h1>
    </section>

    <section id="features">
      <div class="row aln-center">
        <div class="col-4 col-6-medium col-12-small">
          <section>
            <header>
              <h3>{{ randomBaller.name }}</h3>
            </header>
            <img :src="randomBaller.photo" alt="" />
            <br />
            <br />

            <form v-on:submit.prevent="submit()">
              <input type="string" placeholder="Guess" v-model="guess" />
            </form>
            <br />
            <h3>
              Current Team:
              <span v-if="team.guessed === true">{{ team.city }} {{ team.name }}</span>
            </h3>
            <h3>
              College:
              <span v-if="college.guessed === true">{{ college.college }}</span>
            </h3>
            <h3>
              Number:
              <span v-if="number.guessed === true">{{ number.number }}</span>
            </h3>
            <h3>
              Position:
              <span v-if="position.guessed === true">{{ position.position }}</span>
            </h3>
            <br />
            <section
              id="heat"
              v-if="
                position.guessed === true &&
                college.guessed === true &&
                number.guessed === true &&
                team.guessed === true
              "
            >
              <h1>{{ heatCheck }}</h1>
              <p>Shooting Streak: {{ streak }}</p>
            </section>
            <br />
            <button v-on:click="setRandomBaller()">New Baller</button>
          </section>
        </div>
      </div>
    </section>

    <!-- <h1>Random Baller</h1>
    <h1 v-if="streak >= 2">{{ heatCheck }}</h1>
    <h1
      v-if="position.guessed === true && college.guessed === true && number.guessed === true && team.guessed === true"
    >
      YOU BALLED OUT! Shooting Streak: {{ streak }}
    </h1>
    <img :src="randomBaller.PhotoUrl" alt="" />
    <img v-if="team.guessed === true" :src="currentTeam.WikipediaLogoUrl" alt="" />
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
    <h1 v-if="college.guessed === true">{{ randomBaller.College }}</h1>
    <br />
    <p>Team:</p>
    <h1 v-if="team.guessed === true">{{ currentTeam.City }} {{ currentTeam.Name }}</h1>
    <br />
    <p>Position:</p>
    <h1 v-if="position.guessed === true">{{ randomBaller.Position }}</h1>
    <br />
    <p>Jersey Number:</p>
    <h1 v-if="number.guessed === true">{{ randomBaller.Jersey }}</h1>
    <br />
    <button v-on:click="setRandomBaller(), setCurrentTeam()">Set</button> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      randomBaller: [],
      guess: "",
      college: {},
      team: { city: "" },
      position: {},
      number: {},
      streak: 0,
      heatCheck: "You Balled Out!",
    };
  },
  created: function () {
    this.setRandomBaller();
  },
  mounted: function () {},
  methods: {
    setRandomBaller: function () {
      axios.get(`/player`).then((response) => {
        console.log("baller", response.data);
        this.randomBaller = response.data;
        if (
          this.team.guessed === false ||
          this.college.guessed === false ||
          this.number.guessed === false ||
          this.position.guessed === false
        ) {
          this.streak = 0;
          this.heatCheck = "You Balled Out!";
        }
        this.college = { college: this.randomBaller["college"], guessed: false };
        this.position = { position: this.randomBaller["position"], guessed: false };
        this.number = { number: this.randomBaller["jersey"].toString(), guessed: false };
        this.team = { city: this.randomBaller["team_city"], name: this.randomBaller["team_name"], guessed: false };
      });
    },
    submit: function () {
      if (this.guess.toLowerCase() === this.college.college.toLowerCase()) {
        this.college["guessed"] = true;
        this.guess = "";
        this.streakCheck();
      } else if (
        this.guess.toLowerCase() === this.team.city.toLowerCase() ||
        this.guess.toLowerCase() === this.team.name.toLowerCase() ||
        this.guess.toLowerCase() === `${this.team.city.toLowerCase()} ${this.team.name.toLowerCase()}`
      ) {
        this.team.guessed = true;
        this.guess = "";
        this.streakCheck();
      } else if (this.guess.toLowerCase() === this.position.position.toLowerCase()) {
        this.position["guessed"] = true;
        this.guess = "";
        this.streakCheck();
      } else if (this.guess === this.number.number) {
        this.number["guessed"] = true;
        this.guess = "";
        this.streakCheck();
      }
    },
    streakCheck: function () {
      if (
        this.position.guessed === true &&
        this.college.guessed === true &&
        this.number.guessed === true &&
        this.team.guessed === true
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
