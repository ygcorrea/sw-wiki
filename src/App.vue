<template>
  <v-app id="app" :class="{ 'theme-dark': nightMode }">
    <div class="container">
      <nav>
        <v-icon
          class="icons"
          :class="{ 'icon-sun': nightMode }"
          v-if="nightMode"
          @click="nightMode = !nightMode"
        >
          mdi-white-balance-sunny
        </v-icon>
        <v-icon
          class="icons"
          :class="{ 'icon-moon': !nightMode }"
          v-else
          @click="nightMode = !nightMode"
        >
          mdi-weather-night</v-icon
        >
      </nav>
    </div>
    <router-view />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      nightMode: false,
    };
  },
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpgradeUI = true;
      });
    }
    this.nightMode = JSON.parse(localStorage.getItem("nightMode"));
  },
  watch: {
      nightMode: function() {
        localStorage.setItem("nightMode", JSON.stringify(this.nightMode));
      }
    },
    computed: {
    nightModeState () {
      return this.$store.state.nightMode
    },
    },
  methods: {
    async accept() {
      this.showUpgradeUI = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
  position: relative;

  nav {
    position: absolute;
    width: calc(100% - 15px);
    height: 50px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .icons {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 1.6rem;
      cursor: pointer;
    }
    .icon-sun {
      color: #fcda5f;
    }
    .icon-moon {
      color: #1478f3;
    }
  }
  &.theme-dark {
    color: #efefef;
    background-color: #333;
  }
}
</style>
