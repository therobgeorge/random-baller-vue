<template>
  <div class="home">
    <section id="header">
      <!-- Logo -->
      <h1 id="logo">Baller or Squad?</h1>
    </section>

    <section id="features">
      <div class="container">
        <div class="row aln-center">
          <div class="col-4 col-6-medium col-12-small">
            <!-- Feature -->
            <section>
              <router-link to="/baller" class="image featured">
                <img
                  src="https://cdn-media.theathletic.com/cdn-cgi/image/fit=cover,width=700,height=466/LHeWP4jsRoa6_LHeWP4jsRoa6_3TsA8orXMLgL_original_1440x960.jpg"
                  alt=""
                />
              </router-link>
              <header>
                <router-link to="/baller"><h3>Baller</h3></router-link>
              </header>
            </section>
          </div>
          <div class="col-4 col-6-medium col-12-small">
            <!-- Feature -->
            <section>
              <router-link to="/squad" class="image featured">
                <img
                  src="https://ca-times.brightspotcdn.com/dims4/default/7d8178f/2147483647/strip/true/crop/5396x3596+0+0/resize/2000x1333!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8e%2F85%2F5cee276847c5a1569dc345d3ce44%2Fmedia-day-bulls-basketball-10816.jpg"
                  alt=""
                />
              </router-link>
              <header>
                <router-link to="/squad"><h3>Squad</h3></router-link>
              </header>
            </section>
          </div>
        </div>
      </div>
    </section>

    <!-- <h1>Random Baller or Random Squad?</h1>
    <router-link to="/baller"><h3>Baller</h3></router-link>
    <router-link to="/baller">
      <img
        src="https://cdn-media.theathletic.com/cdn-cgi/image/fit=cover,width=700,height=466/LHeWP4jsRoa6_LHeWP4jsRoa6_3TsA8orXMLgL_original_1440x960.jpg"
        alt=""
      />
    </router-link>
    <router-link to="/squad"><h3>Squad</h3></router-link>
    <router-link to="/squad">
      <img
        src="https://ca-times.brightspotcdn.com/dims4/default/7d8178f/2147483647/strip/true/crop/5396x3596+0+0/resize/2000x1333!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8e%2F85%2F5cee276847c5a1569dc345d3ce44%2Fmedia-day-bulls-basketball-10816.jpg"
        alt=""
      />
    </router-link> -->
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data: function () {
    return {};
  },
  created: function () {},
  mounted: function () {},
  methods: {},
};
</script>
