<template>
    <div class="car-list">
        <v-container class="my-5">

                <v-data-table                    
                    :headers="headers"
                    :items="booking"
                    sort-by="category"
                    class="elevation-1"
                >
               
                    <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Booking</v-toolbar-title>
                        <v-divider
                        class="mx-4"
                        inset
                        vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="teal" dark class="mb-2" v-on="on">New Item</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                            <v-container>
                                <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.userName" label="Username"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.carBrand" label="Car Brand"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.carModel" label="Car Model"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.startDate" label="Start Date"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.endDate" label="End Date"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.price" label="Price EUR"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.total" label="Total EUR"></v-text-field>
                                </v-col>
                                </v-row>
                            </v-container>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </v-toolbar>
                    </template>
                    <template v-slot:item.action="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                    >
                        far fa-edit
                    </v-icon>
                    <v-icon
                        small
                        @click="deleteItem(item)"
                    >
                        far fa-trash-alt
                    </v-icon>
                    </template>
                 </v-data-table>

        </v-container>

    </div>
</template>


<script>
import { db } from '@/fb'
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Username',
        align: 'left',
        sortable: true,
        value: 'userName',
      },
      { text: 'Car Brand', value: 'carBrand' },
      { text: 'Car Model', value: 'carModel' },
      { text: 'Start Date', value: 'startDate' },
      { text: 'End Date', value: 'endDate' },
      { text: 'Price (EUR)', value: 'price' },
      { text: 'Total (EUR)', value: 'total' },
      { text: 'Actions', value: 'action', sortable: false },
      { text: '', value: 'expand', align:'end' }
    ],
    booking: [],
    editedIndex: -1,
    editedItem: {
      userName: '',
      carModel: '',
      carBrand: '',
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      price: 0,
      total: 0,
    },
    defaultItem: {
      userName: '',
      carModel: '',
      carBrand: '',
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      price: 0,
      total: 0,
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    }
  },
  watch: {
    dialog (val) {
      val || this.close();
    },
  },

  methods: {
    //with realtime database listener
    initialize (change) {
      this.booking.push({
                  ...change.doc.data(),
                  id: change.doc.id
              });
    },

    editUI (change) {
      let modifiedItem = change.doc.data();
      let id = change.doc.id;
      let originalItem = this.booking.find(x => x.id === id);
      let index = this.booking.indexOf(originalItem);
      Object.assign(this.booking[index], modifiedItem);
    },

    deleteFromUI (change) {
      let item = change.doc.data();
      let index = this.booking.indexOf(item);
      this.booking.splice(index, 1);
    },

    editItem (item) {
      this.editedIndex = this.booking.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem (item) {
      if (confirm('Are you sure you want to delete this item?')) {
          db.collection('booking').doc(item.id).delete();
        }
    },

    close () {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        const bookingId = this.editedItem.id;
        //update table        
        db.collection('booking').doc(bookingId).set({
            userName: this.editedItem.userName,
            carBrand: this.editedItem.carBrand,
            carModel: this.editedItem.carModel,
            startDate: this.editedItem.startDate,
            endDate: this.editedItem.endDate,
            price: this.editedItem.price,
            total: this.editedItem.total
        }).then(() => {
              this.close();
            });          
      } else {
        //create item
        db.collection('booking').add({
            userName: this.editedItem.userName,
            carBrand: this.editedItem.carBrand,
            carModel: this.editedItem.carModel,
            startDate: this.editedItem.startDate,
            endDate: this.editedItem.endDate,
            price: this.editedItem.price,
            total: this.editedItem.total
        }).then(() => {
              this.close();        
            });            
      }        
    }
  },

  created () {
    //realtime database listener
    db.collection('booking').orderBy('userName').onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
          if (change.type === 'added') {
              this.initialize(change);

          } else if (change.type === 'modified') {
              this.editUI(change);

          } else if (change.type === 'removed') {
              this.deleteFromUI(change);
          }
      });
    });
  },
}
</script>