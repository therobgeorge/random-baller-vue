<template>
  <div class="squad">
    <section id="header">
      <h1 id="logo">Random Squad</h1>
    </section>
    <section id="features">
      <div class="container">
        <div class="row aln-center">
          <div class="col-4 col-6-medium col-12-small">
            <section>
              <header>
                <h3>Team Name</h3>
              </header>
              <img :src="currentTeam.logo" alt="" />
              <br />
              <br />
              <form v-on:submit.prevent="submit()">
                <input type="string" placeholder="Guess" v-model="guess" />
              </form>
              <br />
              <h3>
                Stadium:
                <span v-if="stadium.guessed === true">{{ stadium.name }}</span>
              </h3>
              <div v-for="baller in ballers" v-bind:key="baller.id">
                <h3>
                  Baller: {{ baller.position }}
                  <span v-if="baller.guessed === true">{{ baller.full_name }}</span>
                </h3>
              </div>
              <br />
              <section id="heat" v-if="allBallersGuessed === true && stadium.guessed === true">
                <h1>{{ heatCheck }}</h1>
                <p>Shooting Streak: {{ streak }}</p>
              </section>
              <br />
              <button v-on:click="setCurrentTeam()">New Squad</button>
            </section>
          </div>
        </div>
      </div>
    </section>

    <!-- <h1>Random Squad</h1>
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
    <button v-on:click="setCurrentTeam()">Set</button> -->
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
      stadium: { guessed: false },
      streak: 0,
      heatCheck: "You Balled Out!",
    };
  },
  created: function () {
    this.setCurrentTeam();
  },
  mounted: function () {},
  methods: {
    setCurrentTeam: function () {
      axios.get(`/team`).then((response) => {
        console.log("teams", response.data);
        this.currentTeam = response.data;
        if (this.stadium.Guessed === false || this.allBallersGuessed === false) {
          this.streak = 0;
        }
        this.allBallersGuessed = false;
        this.ballers = this.currentTeam["players"];
        this.ballers.forEach((baller) => (baller["guessed"] = false));
        this.stadium = { name: this.currentTeam["stadium"] };
      });
    },

    checkAllBallers: function () {
      if (this.ballers.every((baller) => baller["guessed"] === true)) {
        this.allBallersGuessed = true;
      }
    },
    submit: function () {
      if (this.stadium.name.toLowerCase() === this.guess.toLowerCase()) {
        this.stadium.guessed = true;
        this.guess = "";
        this.streakCheck();
      } else if (this.ballers.some((baller) => baller.last_name.toLowerCase() === this.guess.toLowerCase())) {
        this.ballers.find((baller) => baller["last_name"].toLowerCase() === this.guess.toLowerCase())["guessed"] = true;
        this.guess = "";
        this.checkAllBallers();
        this.streakCheck();
      } else if (this.ballers.some((baller) => baller.full_name.toLowerCase() === this.guess.toLowerCase())) {
        this.ballers.find((baller) => baller["full_name"].toLowerCase() === this.guess.toLowerCase())["guessed"] = true;
        this.guess = "";
        this.checkAllBallers();
        this.streakCheck();
      }
    },
    streakCheck: function () {
      if (this.stadium["guessed"] === true && this.allBallersGuessed === true) {
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
