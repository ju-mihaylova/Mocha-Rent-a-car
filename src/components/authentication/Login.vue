<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
                <span class="mx-1">Login</span>
            </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field color="brown" label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field color="brown" label="Password*" type="password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <!-- <v-layout justify-center> -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="brown" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="brown" text @click="dialog = false">Login</v-btn>
        </v-card-actions>
        <!-- </v-layout> -->
      </v-card>
    </v-dialog>
</template>


<script>
  export default {
    data: () => ({
      dialog: false,
    }),
  }
</script>
