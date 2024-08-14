<template>
    <v-card >
      <v-footer>
        <v-card
          flat
          tile
          width="100%"
          class="red lighten-1 text-center"
        >
          <v-card-text>
            <v-btn v-for="icon in icons" :key="icon" class="mx-3" dark icon>
                <v-icon size="24px">{{icon}}</v-icon>
            </v-btn>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>BECAS UNL</strong>
          </v-card-text>
        </v-card>
      </v-footer>
  
    </v-card>
  </template>
  
  <script>
    export default {
      data: () => ({
        icons: [
        'mdi mdi-twitter mdi-24px box twitter',
        'mdi mdi-facebook mdi-24px box facebook',
        'mdi mdi-instagram mdi-24px box instagram',
        ],

      }),

    }
  </script>

