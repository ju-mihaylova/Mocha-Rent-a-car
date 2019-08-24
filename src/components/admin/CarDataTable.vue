<template>
    <div class="car-list">
        <v-container class="my-5">

                <v-data-table                    
                    :headers="computedHeaders"
                    :items="cars"
                    sort-by="category"
                    class="elevation-1"
                >
                    <template v-slot:item.airConditioning="{ item }">
                    <span>{{ item.airConditioning }}</span>
                    </template>

                    <template v-slot:item.status="{ item }">
                    <v-chip small :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
                    </template>

                   
                    <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Cars</v-toolbar-title>
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
                                    <v-text-field v-model="editedItem.brand" label="Brand"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.model" label="Model"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.category" label="Category"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.year" label="Year"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.doors" label="Doors"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.seats" label="Seats"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.trunk" label="Trunk"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.consumption" label="Consumption"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.airConditioning" label="Air Conditioning"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.pic" label="Image"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.status" label="Status"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.show" label="Show"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
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
        text: 'Brand',
        align: 'left',
        sortable: true,
        value: 'brand',
      },
      { text: 'Model', value: 'model' },
      { text: 'Category', value: 'category' },
      { text: 'Year', value: 'year' },
      { text: 'Price', value: 'price' },
      { text: 'Doors', value: 'doors' },
      { text: 'Seats', value: 'seats' },
      { text: 'Consumption', value: 'consumption' },
      { text: 'Trunk', value: 'trunk'},
      { text: 'Air conditioning', value: 'airConditioning' },
      { text: 'Image', value: 'pic' },
      { text: 'Status', value: 'status' },
      { text: 'Show', value: 'show' },
      { text: 'Description', value: 'description' },
      { text: 'Actions', value: 'action', sortable: false },
      { text: '', value: 'expand', align:'end' }
    ],
    cars: [],
    editedIndex: -1,
    editedItem: {
      brand: '',
      model: '',
      category: '',
      price: 0,
      year: 0,
      doors: 0,
      seats: 0,
      consumption: 0,
      trunk: 0, 
      airConditioning: '',
      pic: '',
      status: '',
      show: '',
      description: ''
    },
    defaultItem: {
      brand: '',
      model: '',
      category: '',
      price: 0,
      year: 0,
      doors: 0,
      seats: 0,
      consumption: 0,
      trunk: 0, 
      airConditioning: '',
      pic: '',
      status: '',
      show: '',
      description: ''
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
    computedHeaders() {
      return this.headers.filter(x => x.value !== 'description' && x.value!=='show' && x.value !== 'pic');
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
      this.cars.push({
                  ...change.doc.data(),
                  id: change.doc.id
              });
    },

    editUI (change) {
      let modifiedItem = change.doc.data();
      let id = change.doc.id;
      let originalItem = this.cars.find(x => x.id === id);
      let index = this.cars.indexOf(originalItem);
      Object.assign(this.cars[index], modifiedItem);
    },

    deleteFromUI (change) {
      let item = change.doc.data();
      let index = this.cars.indexOf(item);
      this.cars.splice(index, 1);
    },

    editItem (item) {
      this.editedIndex = this.cars.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem (item) {
      if (confirm('Are you sure you want to delete this item?')) {
          db.collection('cars').doc(item.id).delete();
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
        const carId = this.editedItem.id;
        //update table        
        db.collection('cars').doc(carId).set({
            brand: this.editedItem.brand,
            model: this.editedItem.model,
            category: this.editedItem.category,
            price: this.editedItem.price,
            year: this.editedItem.year,
            doors: this.editedItem.doors,
            seats: this.editedItem.seats,
            consumption: this.editedItem.consumption,
            trunk: this.editedItem.trunk,
            airConditioning: this.editedItem.airConditioning,
            pic: this.editedItem.pic,
            status: this.editedItem.status,
            show: this.editedItem.show,
            description: this.editedItem.description
        }).then(() => {
              this.close();
            });          
      } else {
        //create item
        db.collection('cars').add({
            brand: this.editedItem.brand,
            model: this.editedItem.model,
            category: this.editedItem.category,
            price: this.editedItem.price,
            year: this.editedItem.year,
            doors: this.editedItem.doors,
            seats: this.editedItem.seats,
            consumption: this.editedItem.consumption,
            trunk: this.editedItem.trunk,
            airConditioning: this.editedItem.airConditioning,
            pic: this.editedItem.pic,
            status: this.editedItem.status,
            show: this.editedItem.show,
            description: this.editedItem.description
        }).then(() => {
              this.close();        
            });            
      }        
    },
    getColor (status) {
      if (status === 'available') return 'success'
      else return 'red'
    },
  },

  created () {
    //realtime database listener
    db.collection('cars').orderBy('price').onSnapshot(res => {
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
    }, err => console.log(err.message));
  },
}
</script>