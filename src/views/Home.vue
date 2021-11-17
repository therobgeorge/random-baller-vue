<template>
  <div class="home">TEST</div>
</template>

<script>
// import axios from "axios";

export default {
  data: function () {
    return {
      ballers: [],
      teams: [],
      randomBaller: [],
      currentTeam: [],
      guessParams: {},
    };
  },
  created: function () {
    // axios
    //   .get(`https://api.sportsdata.io/v3/nba/scores/json/Players?key=c19b029585bf4933ac52af085391e1f5`)
    //   .then((response) => {
    //     console.log("ballers", response.data);
    //     this.ballers = response.data;
    //     this.setRandomBaller();
    //     this.setCurrentTeam();
    //   });
    // axios
    //   .get(`https://api.sportsdata.io/v3/nba/scores/json/teams?key=c19b029585bf4933ac52af085391e1f5`)
    //   .then((response) => {
    //     console.log("teams", response.data);
    //     this.teams = response.data;
    //   });
  },
  mounted: function () {},
  methods: {
    // setRandomBaller: function () {
    //   this.randomBaller = this.ballers[Math.floor(Math.random() * this.ballers.length)];
    //   console.log(this.randomBaller);
    // },
    // setCurrentTeam: function () {
    //   this.currentTeam = this.teams.find(({ Key }) => Key === this.randomBaller.Team);
    // },
  },
};
</script>
