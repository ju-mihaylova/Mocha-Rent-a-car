<template>
    <div class="contacts">
        <v-container>
        <h1 class="display-3 text-center grey--text text--darken-2 text-capitalize my-3">
            Contact Us        
        </h1>
        <v-layout row class="justify-space-around" mx-5>
            <v-flex xs12 md4 class="grey--text text--darken-2">
                <h2 class="heading grey--text text--darken-2">Office Location</h2>
                <p class="address">101 Aleksander Stamboliiski Blvd.</p>
                <p class="address">Mall of Sofia Building, Fl.5</p>
                <p class="address">Sofia, Bulgaria</p>
                <p class="address">02/955 55 55</p>
                <h2 class="heading grey--text text--darken-2">Working Hours</h2>
                <p class="address mb-5">9 am. - 9 pm.</p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1466.1237028502962!2d23.30847778350838!3d42.698481891275456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8541447effd9%3A0xe793c2a4f5bf1b27!2sbul.+%22Aleksandar+Stamboliyski%22+101%2C+1303+Zona+B-5%2C+Sofia!5e0!3m2!1sen!2sbg!4v1566482392768!5m2!1sen!2sbg" width="400" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>
            </v-flex>
            <v-flex xs12 md4>
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="px-5"
          >
            <v-col cols="12" sm="10">
            <v-text-field
              color="brown"
              v-model="name"
              :rules="nameRules"
              label="Name*"
              required
            ></v-text-field>
            </v-col>

            <v-col cols="12" sm="10">
            <v-text-field
              color="brown"
              v-model="email"
              :rules="emailRules"
              label="E-mail*"
              required
            ></v-text-field>
            </v-col>

            <v-col cols="12" sm="10">
            <v-textarea
            color="brown"
            v-model="message"
            :rules="messageRules"
            label="Your message"
            auto-grow
            outlined
            rows="3"
            row-height="25"
            class="mb-1"
            ></v-textarea>
            </v-col>

            <v-col>
            <v-btn
              :disabled="!valid"
              class="teal white--text"
            >
              submit
            </v-btn>
            </v-col>
          </v-form>
            </v-flex>
        </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      message: '',
      messageRules: [
        v => !!v || 'Message is required'
      ],
    }),
};
</script>

<style scoped>
.address {
    margin-bottom: 1px;
}
.heading {
    margin-top: 15px;
}
</style>