<template>
  <div class="collegeGauntlet">
    <section id="header">
      <h1>College Gauntlet</h1>
      <p>Ten ballers. Ten colleges. Can you make it to the end?</p>
    </section>

    <section id="features">
      <div class="row aln-center">
        <div class="col-4 col-6-medium col-12-small">
          <section>
            <form v-on:submit.prevent="submit()">
              <input type="string" placeholder="Guess" v-model="guess" />
            </form>
            <br />

            <br />
            <div v-for="baller in randomBallers" v-bind:key="baller.id">
              <h3 v-if="baller.show == true">
                {{ baller.name }}
                <span v-if="baller.guessed == false && done == false">?</span>
                <span v-if="baller.guessed == true || done == true">{{ baller.college }}</span>
              </h3>
            </div>
            <br />
            <button v-if="done == false" v-on:click="giveUp()">Give Up</button>
            <br />
            <br />
            <section id="heat" v-if="done == true">
              <h1>{{ endMessage }}</h1>
              <br />
              <button v-on:click="newGauntlet()">Try Again</button>
            </section>
          </section>
        </div>
      </div>
    </section>

    <!-- <h1>College Gauntlet</h1>
    <form v-on:submit.prevent="submit()">
      <label>Guess</label>
      <br />
      <input type="string" v-model="guess" />
    </form> -->
    <!-- <button v-on:click="giveUp()">Give Up</button> -->
    <!-- <div v-for="baller in randomBallers" v-bind:key="baller.id">
      <h3 v-if="baller.show == true">{{ baller.name }} {{ baller.college }} {{ baller.guessed }}</h3>
    </div>
    <div v-if="done == true">
      <h1>{{ endMessage }}</h1>
      <button v-on:click="newGauntlet()">Try Again</button>
    </div> -->
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
        this.endMessage = "You're NBA Champions!";
        this.done = true;
      }
    },
    giveUp: function () {
      if (this.correct <= 3) {
        this.endMessage = "You're in the draft lottery.";
        this.done = true;
      } else if (this.correct <= 6) {
        this.endMessage = "You're a first round exit.";
        this.done = true;
      } else {
        this.endMessage = "You went on a deep playoff run.";
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
