<template>
  <v-container id="container" class="mt-10">
    <v-row justify="space-around">
      <v-card :dark="isDark" min-width="200">
        <v-img
          class="img__bg"
          height="200px"
          src="https://cdn.pixabay.com/photo/2020/05/07/19/20/spaceship-5142848_960_720.jpg"
        >
          <v-card-title
            :class="[isDark ? 'bg-dark' : 'bg-light']"
            class="white--text font-weight-bold"
          >
            <p class="ml-3">
              {{ infoCharacter.name }}
            </p>
          </v-card-title>
        </v-img>

        <v-card-text>
            <v-tabs show-arrows left>
              <v-tab>Characteristics</v-tab>
              <v-tab>Films</v-tab>
              <v-tab>Starships</v-tab>

              <v-tab-item
                :class="[isDark ? 'theme-dark' : 'theme-light']"
                v-for="n in 3"
                :key="n"
              >
                <v-container fluid>
                  <v-card-text v-if="n == 1">
                    <v-list>
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-bold">Name</v-list-item-title>
                          <v-list-item-subtitle>{{
                            infoCharacter.name
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-bold">Height</v-list-item-title>
                          <v-list-item-subtitle>
                            {{ infoCharacter.height }}</v-list-item-subtitle
                          >
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-bold">Mass</v-list-item-title>
                          <v-list-item-subtitle>
                            {{ infoCharacter.mass }}</v-list-item-subtitle
                          >
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-bold">Hair color</v-list-item-title>
                          <v-list-item-subtitle>{{
                            infoCharacter.hair_color
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-bold">Skin color</v-list-item-title>
                          <v-list-item-subtitle>{{
                            infoCharacter.skin_color
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-bold">Eye color</v-list-item-title>
                          <v-list-item-subtitle>{{
                            infoCharacter.eye_color
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title  class="font-weight-bold"
                            >Homeworld</v-list-item-title
                          >
                          <v-list-item-subtitle>{{
                            homeworldItem
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                  <v-card-text v-if="n == 2">
                    <v-list-item
                      v-for="(film, i) in filmItems"
                      :key="i"
                      two-line
                    >
                      <v-list-item-content
                        :class="[isDark ? 'theme-dark' : 'theme-light']"
                      >
                        {{ film }}
                      </v-list-item-content>
                    </v-list-item>
                  </v-card-text>
                  <v-card-text v-if="n == 3">
                    <v-list-item
                      v-for="(starship, i) in starshipItems"
                      :key="i"
                      two-line
                    >
                      <v-list-item-content
                        :class="[isDark ? 'theme-dark' : 'theme-light']"
                      >
                        {{ starship }}
                      </v-list-item-content>
                    </v-list-item></v-card-text
                  >
                </v-container>
              </v-tab-item>
            </v-tabs>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      infoCharacter: JSON.parse(this.$route.params.info),
      homeworldItem: null,
      nightMode: this.$store.state.nightMode,
      filmItems: [],
      starshipItems: [],
    };
  },
  methods: {
    getHomeWorld() {
      let urlHomeworld = this.infoCharacter.homeworld;
      axios.get(urlHomeworld).then((res) => {
        this.homeworldItem = res.data.name;
      });
    },
    getCharacterFilms() {
      let urlFilms = this.infoCharacter.films;
      urlFilms.forEach((el) => {
        axios.get(el).then((film) => {
          this.filmItems.push(film.data.title);
        });
      });
    },
    getCharacterStarship() {
      let urlStarships = this.infoCharacter.starships;
      urlStarships.forEach((el) => {
        axios.get(el).then((starship) => {
          this.starshipItems.push(starship.data.name);
        });
      });
    },
  },
  computed: {
    ...mapState({
      isDark: (state) => state.nightMode,
    }),
  },
  created() {
    this.getHomeWorld();
    this.getCharacterFilms();
    this.getCharacterStarship();
  },
};
</script>

<style lang="scss" scoped>
#container {
  min-height: 100vh;
  .theme-dark {
    color: #dddddd;
    background-color: #161616;
  }
  .theme-light {
    color: #333;
    background-color: #dddddd;
  }
}
.img__bg {
  opacity: 0.8;
}
.bg-dark {
  background: #0009;
}
.bg-light {
  background: #fff9;
  p {
    color: #000;
  }
}
</style>