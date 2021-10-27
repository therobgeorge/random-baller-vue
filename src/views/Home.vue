<template>
  <div class="home">
    <h1>Random Baller</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      ballers: [],
    };
  },
  created: function () {
    axios
      .get(`https://www.api.sportsdata.io/v3/nba/scores/jsonPlayer/20000571?key=c19b029585bf4933ac52af085391e1f5`)
      .then((response) => {
        console.log("ballers", response.data);
      });
  },
};
</script>
