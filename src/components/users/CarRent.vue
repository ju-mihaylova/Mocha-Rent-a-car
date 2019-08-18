<template>
    <v-dialog v-model="dialog" persistent max-width="550px">
        <template v-slot:activator="{ on }">
            <v-btn 
                text
                color="red darken-1"
                v-on="on"
            >
            Book</v-btn>
        </template>
        <v-card>
        <v-card-title>
            <span class="headline">Book Car</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="px-3"
          >
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <span class="display-1 blue-grey--text text--darken-1 font-weight-medium"  
                >{{ carBrand }} {{ carModel }}</span>
              </v-col>
              <v-col cols="12" sm="6" md="4">                
                <span v-if="totalPrice > 0" class="title blue-grey--text text--darken-1 font-weight-medium"  
                ><strong>Total:</strong> {{ totalPrice }} EUR</span>
                <span v-else class="title blue-grey--text text--darken-1 font-weight-medium"  
                ><strong>Price:</strong> {{ carPrice }} EUR</span>
              </v-col>
            </v-row>

            <v-text-field
              color="brown"
              v-model="license"
              :rules="licenseRules"
              label="Driving License"
              required
            ></v-text-field>

            <v-row>
                <v-col cols="12" sm="6" md="6">
                <v-menu
                    ref="menuStart"
                    v-model="menuStart"
                    :close-on-content-click="false"
                    :return-value.sync="dateStart"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="dateStart"
                        label="Start Date"
                        prepend-icon="far fa-calendar-alt"
                        readonly
                        v-on="on"
                        color="brown"
                    ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateStart" no-title scrollable color="brown">
                    <v-spacer></v-spacer>
                    <v-btn text color="brown" @click="menuStart = false">Cancel</v-btn>
                    <v-btn text color="brown" @click="onDateStartClick">OK</v-btn>
                    </v-date-picker>
                </v-menu>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="12" sm="6" md="6">
                <v-menu
                    ref="menuEnd"
                    v-model="menuEnd"
                    :close-on-content-click="false"
                    :return-value.sync="dateEnd"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="dateEnd"
                        label="End Date"
                        prepend-icon="far fa-calendar-alt"
                        readonly
                        v-on="on"
                        color="brown"
                    ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateEnd" no-title scrollable color="brown">
                    <v-spacer></v-spacer>
                    <v-btn text color="brown" @click="menuEnd = false">Cancel</v-btn>
                    <v-btn text color="brown" @click="onDateEndClick">OK</v-btn>
                    </v-date-picker>
                </v-menu>
                </v-col>
            </v-row>

            <v-layout justify-end>
            <v-btn
              dark
              color="brown"
              class="mr-4 mt-5"
              @click="cancel"
            >
              Cancel
            </v-btn>

            <v-btn
              :disabled="!valid"
              class="red darken-1 white--text mt-5"
              @click="book"
            >
              Book
            </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: [
    'carBrand',
    'carModel',
    'carId',
    'carPrice'
  ],
  data: () => ({
    dialog: false,
    valid: true,
    dateStart: new Date().toISOString().substr(0, 10),
    dateEnd: new Date().toISOString().substr(0, 10),
    menuStart: false,
    menuEnd: false,
    license: '',
    licenseRules: [
      v => !!v || 'License is required',
      v => /^\d{9}$/.test(v) || 'License must be valid',

    ]
  }),
  computed: {
    totalPrice() {
      let start = this.dateStart;
      let end = this.dateEnd;
      if(typeof start ===  'undefined' || typeof end === 'undefined') {
        return;
      }

      let startDateParts = start.split('-');
      let jsStartDate = new Date(startDateParts[0], startDateParts[1] - 1, startDateParts[2].substr(0,2));
      
      let endDateParts = end.split('-');
      let jsEndDate = new Date(endDateParts[0], endDateParts[1] - 1, endDateParts[2].substr(0,2));

      let diff = jsEndDate - jsStartDate;
      const divideBy = 86400000;

      let daysBooked = Math.floor(diff/divideBy);

      return daysBooked * this.carPrice;
    }
  },

  methods: {
    cancel () {
      this.dialog = false;
      this.$refs.form.reset();
      this.dateStart = new Date().toISOString().substr(0, 10);
      this.dateEnd = new Date().toISOString().substr(0, 10);
    },
    book () {
      if (!this.$refs.form.validate()) {
        this.snackbar = true;
      } else {
        


        // close dialog
        this.dialog = false;
        // reset form
        this.$refs.form.reset();
        this.dateStart = new Date().toISOString().substr(0, 10);
        this.dateEnd = new Date().toISOString().substr(0, 10);
      }
    },
    onDateStartClick () {
      this.$refs.menuStart.save(this.dateStart);
    },
    onDateEndClick () {
      this.$refs.menuEnd.save(this.dateEnd);
    }
  },
}
</script>