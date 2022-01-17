<template>
  <div>
    <v-row
      no-gutters
      class="filter__container mt-10 ma-5"
      justify="center"
      cols="12"
      md="6"
      sm="4"
    >
      <h1 dark>Personagens</h1>
      <v-text-field
        :dark="isDark"
        class="ma-3"
        md="6"
        v-model="searchName"
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
        <v-btn :disabled="!previousPage" @click="goToPreviousPage()" small>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span class="ml-3 mr-3">
          {{ currentPage }}
        </span>
        <v-btn :disabled="!nextPage" @click="goToNextPage()" small
          ><v-icon>mdi-chevron-right</v-icon></v-btn
        >
      </div>
    </v-row>
    <v-container v-if="!emptyState" class="main__container" dark>
      <table>
        <tr>
          <th>Personagem</th>
          <th>Ano de nascimento</th>
          <th>Altura</th>
          <th>Massa</th>
          <th>Gênero</th>
        </tr>
        <tr
          v-for="(item, i) in charactersList"
          :key="i"
          @click="goToAboutPage(item)"
        >
          <td>{{ item.name }}</td>
          <td v-if="item.birth_year == 'unknown'">Desconhecido</td>
          <td v-else>{{ item.birth_year }}</td>
          <td>{{ item.height }}</td>
          <td>{{ item.mass }}</td>
          <td v-if="item.gender == 'male'">Macho</td>
          <td v-else-if="item.gender == 'female'">Fêmea</td>
          <td v-else>n/a</td>
        </tr>
      </table>
    </v-container>
    <v-container class="empty__state" v-else>
      <h3>{{ this.emptyState }}</h3>
      <img src="../assets/empty.svg" alt="Não encontrado" />
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
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
          console.log(this.nextPage);
          console.log(this.previousPage);
        });
    },
    getFilteredData() {
      if (this.searchName) {
        axios
          .get(
            `https://swapi.dev/api/people/?search=${this.searchName}&page=${this.currentPage}`
          )
          .then((filteredResult) => {
            if (!filteredResult.data.results.length) {
              this.emptyState =
                "Não encontramos nenhum rersultado para essa busca";
            }
            this.charactersList = filteredResult.data.results;
            console.log(this.charactersList);
          });
      } else {
        this.getDataFromApi();
      }
    },
    clearForm() {
      this.getDataFromApi();
      this.$forceUpdate();
    },
    goToNextPage() {
      let url = this.nextPage;
      axios.get(url + `&search=${this.searchName}`).then((res) => {
        this.charactersList = res.data.results;
        this.currentPage++
        this.nextPage = res.data.next;
        this.previousPage = res.data.previous;
      });
    },
    goToPreviousPage() {
      let url = this.previousPage;
      axios.get(url + `&search=${this.searchName}`).then((res) => {
        this.charactersList = res.data.results;
        this.currentPage--
        this.nextPage = res.data.next;
        this.previousPage = res.data.previous;
      });
    },
    goToAboutPage(item){
      console.log(item);
      let infoCharacter = JSON.stringify(item)
      console.log(infoCharacter);

      this.$router.push({ name: 'About',params: { info: infoCharacter }})
    }
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
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  font-weight: 600;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
td {
  cursor: pointer;
}
tr {
  &:hover {
    &:first-child {
      opacity: 1;
    }
    opacity: 0.5;
  }
}
tr:nth-child(even) {
  background-color: #6091a5;
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
</style>
