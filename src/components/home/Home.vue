<template>
    <div class="home">
        <v-container class="my-5">

            <v-layout justify-center row wrap>
                <v-flex xs12 sm6 md4 lg3 class="ma-3" v-for="(car, index) in cars" :key="index">
                      <v-card
                        class="mx-auto"
                        max-width="344"
                    >
                        <v-card-text>
                            <v-chip outlined class="car-year">{{car.year}}</v-chip>
                            <v-chip right outlined class="text-capitalize">{{car.category}}</v-chip>
                        </v-card-text>

                        <v-img
                        :src="car.pic"
                        height="150px"
                        class="mt-2"
                        ></v-img>

                        <v-card-title>
                        <div>{{car.brand}} {{car.model}}</div>
                        </v-card-title>

                        <v-card-text>                           
                            <v-icon class="mr-1">fas fa-user-friends</v-icon>
                            <span class="mr-2">{{ car.seats }}</span>
                            <v-icon class="mr-1">fas fa-suitcase</v-icon>
                            <span class="mr-2">{{ car.trunk }}</span>
                            <v-icon class="mr-1">fas fa-door-closed</v-icon>
                            <span class="mr-2">{{ car.doors }}</span>
                            <v-icon v-if="car.airConditioning">far fa-snowflake</v-icon>
                        </v-card-text>

                        <v-card-actions>

                        <car-rent 
                            v-if="isLoggedin"
                            :carBrand="car.brand"
                            :carModel="car.model"
                            :carId="car.id"
                            :carPrice="car.price"
                        
                        ></car-rent>

                        <v-spacer></v-spacer>

                        <v-btn
                            icon
                            @click="car.show = !car.show"
                        >
                            <v-icon>{{ car.show ? 'fas fa-angle-up' : 'fas fa-angle-down' }}</v-icon>
                        </v-btn>
                        </v-card-actions>

                        <v-expand-transition>
                        <div v-show="car.show">
                            <v-card-text>
                            {{car.description}}
                            </v-card-text>
                            <v-card-text class="mb-1">
                            Price/day: {{ car.price }} EUR
                            </v-card-text>
                        </div>
                        </v-expand-transition>
                    </v-card>
                </v-flex>
            </v-layout>
            
        </v-container>
    </div>
</template>

<script>    
import { getCarsService } from '@/services/getCarsService'
import CarRent from '@/components/users/CarRent'
export default {
components: {
    CarRent
},
data() {
    return {
        cars: []
    }
},

mixins: [
    getCarsService
],

created() {
}
};
</script>

<style scoped>
.car-year {
    margin-right: 140px;
}
</style>
