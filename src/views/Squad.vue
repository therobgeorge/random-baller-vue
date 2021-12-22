<template>
  <div class="home">
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
              <img :src="currentTeam.WikipediaLogoUrl" alt="" />
              <br />
              <br />
              <form v-on:submit.prevent="submit()">
                <input type="string" placeholder="Guess" v-model="guess" />
              </form>
              <br />
              <h3>
                Stadium:
                <span v-if="stadium.Guessed === true">{{ stadium.Name }}</span>
              </h3>
              <div v-for="baller in ballers" v-bind:key="baller.id">
                <h3>
                  Ballers: {{ baller.Position }}
                  <span v-if="baller.Guessed === true">{{ baller.YahooName }}</span>
                </h3>
              </div>
              <br />
              <section id="header" v-if="allBallersGuessed === true && stadium.Guessed === true">
                <h1 id="logo">{{ heatCheck }}</h1>
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
      stadium: { Guessed: false },
      streak: 0,
      heatCheck: "You Balled Out!",
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
