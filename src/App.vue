<template>
  <v-app id="app"  :class="[nightMode ? 'theme-dark' : 'theme-light']">
    <div class="container mb-5">
      <nav :class="[nightMode ? 'bg-black' : 'bg-white']">
        <img src="./assets/logoSW.png" alt="logo" />
        <v-icon
          class="icons"
          :class="{ 'icon-sun': nightMode }"
          v-if="nightMode"
          @click="setNightMode()"
        >
          mdi-white-balance-sunny
        </v-icon>
        <v-icon
          class="icons"
          :class="{ 'icon-moon': !nightMode }"
          v-else
          @click="setNightMode()"
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
    nightMode: function () {
      localStorage.setItem("nightMode", JSON.stringify(this.nightMode));
      this.$store.commit("setNightMode", this.nightMode);
    },
  },
  methods: {
    setNightMode() {
      this.nightMode = !this.nightMode;
    },
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
    position: fixed;
    z-index: 2;
    height: 80px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    img {
      height: 100%;
      width: auto;
    }
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
  .bg-black {
    background: #000;
  }

  .bg-white {
    background: rgb(255, 255, 255);
  }
  &.theme-dark {
    color: #efefef;
    background-color: #333;
  }
   &.theme-light {
    color: #333;
    background-color: #efefef;
  }
}
</style>
