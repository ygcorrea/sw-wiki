import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#BB86FC',
            secondary: '#03dac5',
            accent:'#F2E7FE',
            error: '#b71c1c',
          },
        },
      },
});
