<template>
  <div class="home">
    <h1>Random Baller</h1>
    <img :src="randomBaller.PhotoUrl" alt="" />
    <h2>{{ randomBaller.FirstName }} {{ randomBaller.LastName }}</h2>
    <p>{{ randomBaller.Team }} {{ randomBaller.Position }} {{ randomBaller.College }} {{ randomBaller.Jersey }}</p>
    {{ guessParams }}
    <p>College:</p>
    <input type="string" v-model="guessParams.College" />
    <h1 v-if="guessParams.College == randomBaller.College">YES</h1>
    <br />
    <p>Team:</p>
    <input type="string" v-model="guessParams.Team" />
    <h1 v-if="guessParams.Team == randomBaller.Team">YES</h1>
    <br />
    <p>Position:</p>
    <input type="string" v-model="guessParams.Position" />
    <h1 v-if="guessParams.Position == randomBaller.Position">YES</h1>
    <br />
    <p>Jersey Number:</p>
    <input type="string" v-model="guessParams.Jersey" />
    <h1 v-if="guessParams.Jersey == randomBaller.Jersey">YES</h1>
    <br />
    <button v-on:click="setRandomBaller()">Set</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      ballers: [],
      randomBaller: [],
      guessParams: {},
    };
  },
  created: function () {
    axios
      .get(`https://api.sportsdata.io/v3/nba/scores/json/Players?key=c19b029585bf4933ac52af085391e1f5`)
      .then((response) => {
        console.log("ballers", response.data);
        this.ballers = response.data;
      });
  },
  mounted: function () {
    this.setRandomBaller();
  },
  methods: {
    setRandomBaller: function () {
      this.randomBaller = this.ballers[Math.floor(Math.random() * this.ballers.length)];
      console.log(this.randomBaller);
    },
  },
};
</script>
