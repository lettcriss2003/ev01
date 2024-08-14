<template>
    <div>
        <v-navigation-drawer app v-model="drawer" temporary>
            <template v-slot:prepend>
                <div>
                <v-card class="fondo-user-logo " >
                    <v-list three-line style="width: 100%">
                    <v-list-item dark>
                        <v-list-item-avatar size="80" color="black">
                        <v-img alt="rayden" contain src="https://p4.wallpaperbetter.com/wallpaper/723/117/255/lightning-the-game-sparks-fighter-mortal-kombat-hd-wallpaper-preview.jpg">
                        </v-img>
                        </v-list-item-avatar>

                        <v-list-item-content max-width="100">
                        <v-list-item-title style="color: black"  >Alexander</v-list-item-title>
                        <v-list-item-subtitle style="color: black"> Usuario </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    </v-list>
                </v-card>
                </div>
            </template>
            <v-divider color="white"></v-divider>
            <v-list>
                <v-list-item-group >
                <v-list-item
                    v-for="(item, i) in menu"
                    :key="i"
                    link
                >
                    <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                    <v-list-item-title>
                        <strong v-text="item.text"></strong>
                    </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                </v-list-item-group>
            </v-list>
    
  </v-navigation-drawer>

        <v-toolbar dark>
            <v-app-bar-nav-icon @click="drawer = !drawer"> </v-app-bar-nav-icon>
            <v-toolbar-title>SISTEMA DE BECAS</v-toolbar-title>
            <v-spacer></v-spacer>

        </v-toolbar>
    </div>
</template>

<script>

export default {
    data: () => ({
        drawer: false,
        menu:[     {
            n: 1,
            text: "Inicio",
            icon: "mdi-home",
            name: "Inicio",
            },
            {
            n: 2,
            text: "Solicitudes",
            icon: "mdi-account",
            name: "Solicitudes",
            },            {
            n: 2,
            text: "Estudiantes",
            icon: "mdi-shopping",
            name: "Estudiantes",
            },            {
            n: 2,
            text: "Cerrar Sesion",
            icon: "mdi-logout",
            name: "Cerrar Sesion",
            },],
    })
}
</script>

<style>
</style>