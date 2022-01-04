<template>
  <div id="app">
    <section id="header">
      <div class="container">
        <nav id="nav">
          <ul>
            <li>
              <router-link to="/" class="icon solid fa-home"><span>Home</span></router-link>
            </li>
            <li>
              <router-link to="/baller" class="icon solid fa-basketball-ball"><span>Baller</span></router-link>
            </li>
            <li>
              <router-link to="/squad" class="icon solid fa-users"><span>Squad</span></router-link>
            </li>
            <li>
              <router-link to="/collegegauntlet" class="icon solid fa-university">
                <span>College Gauntlet</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </section>

    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/baller">Baller</router-link>
      |
      <router-link to="/squad">Squad</router-link>
    </div> -->
    <router-view />
  </div>
</template>
