<template>
  <v-container class="mt-10">
    <v-row justify="space-around">
      <v-card min-width="200">
        <v-img
        class="img__bg"
          height="200px"
          src="https://cdn.pixabay.com/photo/2020/05/07/19/20/spaceship-5142848_960_720.jpg"
        >
          <v-app-bar flat color="rgba(0, 0, 0, 0)">
            <!-- <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon> -->
            <v-spacer></v-spacer>
          </v-app-bar>

          <v-card-title class="white--text mt-16">
            <v-avatar size="30">
              <img
                alt="user"
                src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
              />
            </v-avatar>
            <p class="ml-3 font-weight-bold">
              {{ infoCharacter.name }}
            </p>
          </v-card-title>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">Sobre:</div>

          <v-timeline align-top dense>
            <v-timeline-item
              v-for="message in infoCharacter"
              :key="message"
              small
            >
              <!-- :color="message.color" -->
              <div>
                <div>{{ message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      infoCharacter: JSON.parse(this.$route.params.info),
    };
  },
};
</script>

<style>
.img__bg{
  opacity: 0.8;
}
</style>