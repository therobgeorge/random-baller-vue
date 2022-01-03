<template>
  <div class="home">
    <!-- <section id="header">
      <h1>College Gauntlet</h1>
      <p>Can you make it to the end?</p>
    </section> -->

    <!-- <section id="features">
      <div class="row aln-center">
        <div class="col-4 col-6-medium col-12-small">
          <section>
            <header>
              <h3>{{ randomBallers.name }}</h3>
            </header>
            <img :src="randomBallers.photo" alt="" />
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
            <button v-on:click="setRandomBallers()">New Baller</button>
          </section>
        </div>
      </div>
    </section> -->

    <h1>College Gauntlet</h1>
    <form v-on:submit.prevent="submit()">
      <label>Guess</label>
      <br />
      <input type="string" v-model="guess" />
    </form>
    <button v-on:click="giveUp()">Give Up</button>
    <div v-for="baller in randomBallers" v-bind:key="baller.id">
      <h3 v-if="baller.show == true">{{ baller.name }} {{ baller.college }} {{ baller.guessed }}</h3>
    </div>
    <div v-if="done == true">
      <h1>{{ endMessage }}</h1>
      <button v-on:click="newGauntlet()">Try Again</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      randomBallers: [],
      guess: "",
      correct: 0,
      endMessage: "",
      ballerIndex: 0,
      done: false,
    };
  },
  created: function () {
    this.setRandomBallers();
  },
  mounted: function () {},
  methods: {
    setRandomBallers: function () {
      for (let i = 0; i < 10; i++) {
        axios.get(`/player`).then((response) => {
          console.log("baller", response.data);
          response.data["guessed"] = false;
          response.data["show"] = false;
          this.randomBallers.push(response.data);
          this.randomBallers[0]["show"] = true;
        });
      }
    },
    submit: function () {
      if (this.guess.toLowerCase() === this.randomBallers[this.ballerIndex].college.toLowerCase()) {
        this.randomBallers[this.ballerIndex]["guessed"] = true;
        this.ballerIndex += 1;
        this.guess = "";
        this.correct += 1;
        if (this.ballerIndex <= 9) {
          this.randomBallers[this.ballerIndex]["show"] = true;
        }
        this.correctCheck();
      }
    },
    correctCheck: function () {
      if (this.correct == 10) {
        this.endMessage = "NBA Champions!";
        this.done = true;
      }
    },
    giveUp: function () {
      if (this.correct <= 3) {
        this.endMessage = "Lottery Pick";
        this.done = true;
      } else if (this.correct <= 6) {
        this.endMessage = "First Round Exit";
        this.done = true;
      } else {
        this.endMessage = "Deep Playoff Run";
        this.done = true;
      }
    },
    newGauntlet: function () {
      this.randomBallers = [];
      this.correct = 0;
      this.ballerIndex = 0;
      this.done = false;
      this.setRandomBallers();
    },
  },
};
</script>
