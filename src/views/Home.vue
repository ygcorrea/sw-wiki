<template>
  <v-container id="home" class="mx-auto">
    <v-row no-gutters class="filter__container mt-10" justify="center">
      <h1 dark>Personagens</h1>
      <v-text-field
        :dark="isDark"
        class="ma-3"
        color="primary"
        label="Search.."
        outlined
        dense
        v-model="searchName"
        @keyup="update"
        @keydown.enter.prevent="getFilteredData"
      >
        <template slot="append">
          <v-icon v-if="searchName" @click.prevent="clearForm"
            >mdi-close</v-icon
          >
          <v-icon @click="getFilteredData">mdi-magnify</v-icon>
        </template>
      </v-text-field>
    </v-row>
    <v-row
      no-gutters
      class="filter__container mt-2 ma-5"
      justify="end"
      align="end"
      cols="12"
      md="6"
      sm="4"
    >
      <div class="mb-2">
        <v-btn
          :dark="isDark"
          class="primary"
          :disabled="!previousPage"
          @click="goToPreviousPage()"
          small
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span class="ml-3 mr-3">
          {{ currentPage }}
        </span>
        <v-btn
          :dark="isDark"
          class="primary"
          :disabled="!nextPage"
          @click="goToNextPage()"
          small
          ><v-icon>mdi-chevron-right</v-icon></v-btn
        >
      </div>
    </v-row>
    <v-container v-if="!emptyState" class="main__container" dark>
      <table>
        <tr>
          <th>Character Name</th>
          <th>Birth year</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Gender</th>
        </tr>
        <tr
          v-for="(item, i) in charactersList"
          :key="i"
          @click="goToAboutPage(item)"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.birth_year }}</td>
          <td>{{ item.height }}</td>
          <td>{{ item.mass }}</td>
          <td>{{ item.gender }}</td>
        </tr>
      </table>
    </v-container>
    <v-container class="empty__state" v-else>
      <h3>{{ this.emptyState }}</h3>
      <img src="../assets/empty.svg" alt="not found" />
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import * as debounce from "lodash.debounce";

export default {
  data() {
    return {
      charactersList: null,
      nightMode: this.$store.state.nightMode,
      searchName: null,
      emptyState: null,
      nextPage: null,
      previousPage: null,
      currentPage: 1,
    };
  },
  methods: {
    getDataFromApi() {
      axios
        .get(`https://swapi.dev/api/people?page=${this.currentPage}`)
        .then((character) => {
          this.charactersList = character.data.results;
          this.nextPage = character.data.next;
          this.previousPage = character.data.previous;
          this.emptyState = null;
          this.searchName = "";
        });
    },
    getFilteredData() {
      console.log("opa");
      if (this.searchName) {
        axios
          .get(
            `https://swapi.dev/api/people/?search=${this.searchName}&page=${this.currentPage}`
          )
          .then((filteredResult) => {
            if (!filteredResult.data.results.length) {
              this.emptyState = "We didn't find any results for this search.";
            } else {
              this.emptyState = null;
            }
            this.charactersList = filteredResult.data.results;
          });
      } else {
        this.getDataFromApi();
      }
    },
     update: debounce(function() {
      this.getFilteredData()
    }, 300),
    clearForm() {
      this.getDataFromApi();
      this.$forceUpdate();
    },
    goToNextPage() {
      let url = this.nextPage;
      axios.get(url + `&search=${this.searchName}`).then((res) => {
        this.charactersList = res.data.results;
        this.currentPage++;
        this.nextPage = res.data.next;
        this.previousPage = res.data.previous;
      });
    },
    goToPreviousPage() {
      let url = this.previousPage;
      axios.get(url + `&search=${this.searchName}`).then((res) => {
        this.charactersList = res.data.results;
        this.currentPage--;
        this.nextPage = res.data.next;
        this.previousPage = res.data.previous;
      });
    },
    goToAboutPage(item) {
      let infoCharacter = JSON.stringify(item);
      this.$router.push({ name: "About", params: { info: infoCharacter } });
    },
  },
  created() {
    this.getDataFromApi();
    
  },
  computed: {
    ...mapState({
      isDark: (state) => state.nightMode,
    }),
  },
};
</script>

<style lang="scss">
.main__container {
  overflow: auto;

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    font-weight: bold;
  }

  td,
  th {
    border: 1px solid #cfcfcf;
    text-align: left;
    padding: 8px;
  }
  td {
    cursor: pointer;
  }
  tr:nth-child(even) {
    background-color: #bb86fc;
  }
  tr:first-child {
    background-color: #1e1e1e;
    color: #dddddd;
    font-size: 1.2em;
    border: 0;
  }
}
.filter__container {
  display: flex;
  flex-direction: column;
}
@media screen and (max-width: 600px) {
  .main__container img {
    width: 200px;
  }
}

.empty__state {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  img {
    height: 200px;
    width: auto;
    margin-top: 20px;
    animation: moveImg 2s linear infinite;
    position: relative;
  }
}
@keyframes moveImg {
  0%,
  100% {
    bottom: 0;
  }
  50% {
    bottom: 10px;
  }
}
#home {
  min-height: 100vh;
}
</style>
