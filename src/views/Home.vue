<template>
  <div>
    <v-row
      no-gutters
      class="filter__container mt-2"
      justify="center"
      cols="12"
      md="6"
      sm="4"
    >
      <h1 dark>Personagens</h1>
      <v-text-field
        :dark="nightMode"
        class="ma-3"
        md="6"
        v-model="search"
        append-icon="mdi-magnify"
      ></v-text-field>
    </v-row>
    <v-container class="main__container" dark>
      <table>
        <tr>
          <th>Personagem</th>
          <th>Ano de nascimento</th>
          <th>Altura</th>
          <th>Massa</th>
          <th>Gênero</th>
        </tr>
        <tr v-for="(item, i) in charactersList" :key="i">
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      charactersList: null,
      search: null,
    };
  },
  methods: {
    getDataFromApi() {
      axios.get("https://swapi.dev/api/people").then((character) => {
        this.charactersList = character.data.results;
      });
    },
  },
  created() {
    this.getDataFromApi();
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
tr:nth-child(even) {
  background-color: #6091a5;
}
</style>