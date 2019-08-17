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
                            <v-chip outlined class="text-capitalize">{{car.category}}</v-chip>
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
                        <!-- <v-btn 
                            text
                            color="red darken-1"
                            v-if="isLoggedIn"
                        >
                        Book</v-btn> -->
                        <car-rent 
                            v-if="isAuthenticated"
                            :carBrand="car.brand"
                            :carModel="car.model"
                            :carId="car.id"
                        
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
import { db } from '@/fb'
import CarRent from '@/components/users/CarRent'
export default {
components: {
    CarRent
},
data() {
    return {
        // cars: [
        //     {
        //         "brand": "Citroen",
        //         "model": "C 3",
        //         "category": "economy",
        //         "price": 12,
        //         "year": 2018,
        //         "doors": 5,
        //         "seats": 5,
        //         "consumption": 5,
        //         "trunk": 2,
        //         "airConditioning": true,
        //         "pic": "/mocha_car1.png",
        //         "status": "available",
        //         "show": false,
        //         "description": "The brand new model of the French manufacturer Citroen C3 is an excellent vehicle with compact size, equipped with many extras and fuel efficient engine PureTech 68 BVM Live. This efficient car has unique design and makes it stand out from the rest in the most popular car segment - the supermini class. Сitroen C3 is perfect for urban and non-urban driving."
        //     },
        //     {
        //         "brand": "VW",
        //         "model": "Polo",
        //         "category": "economy",
        //         "price": 12,
        //         "year": 2019,
        //         "doors": 5,
        //         "seats": 5,
        //         "consumption": 4.2,
        //         "trunk": 2,
        //         "airConditioning": true,
        //         "pic": "/mocha_car2.png",
        //         "status": "available",
        //         "show": false,
        //         "description": "VW Polo 2019 is a modern, fuel efficient and maneuverable car with beautiful design and many extras. The fuel efficient engine combined with automatic gearbox and compact sizes make it perfect for driving at urban and non-urban conditions."
        //     },
        //     {
        //         "brand": "Toyota",
        //         "model": "Yaris",
        //         "category": "hybrid",
        //         "price": 20,
        //         "year": 2018,
        //         "doors": 5,
        //         "seats": 5,
        //         "consumption": 3.1,
        //         "trunk": 1,
        //         "airConditioning": true,
        //         "pic": "/mocha_car3.png",
        //         "status": "available",
        //         "show": false,
        //         "description": "Toyota Yaris Hybrid with built-in GPS is one of the most preferred urban cars. The hybrid engine has excellent low fuel consumption. It has all the necessary extras for your comfortable holiday - air condition, power steering wheel, electric windows automatic gearbox."
        //     },
        //     {
        //         "brand": "Renault",
        //         "model": "Captur",
        //         "category": "compact",
        //         "price": 24,
        //         "year": 2018,
        //         "doors": 5,
        //         "seats": 5,
        //         "consumption": 5,
        //         "trunk": 2,
        //         "airConditioning": true,
        //         "pic": "/mocha_car4.png",
        //         "status": "available",
        //         "show": false,
        //         "description": "Renault Captur TCe is an innovative modern car, convenient for both urban and suburban trips. It is equipped with an air conditioner, integrated GPS navigation, power steering, multimedia and many more. The car has the following extras: Key-less lock and Start/Stop system, fog lights, cruise control."
        //     },
        //     {
        //         "brand": "Toyota",
        //         "model": "Corolla",
        //         "category": "compact",
        //         "price": 24,
        //         "year": 2017,
        //         "doors": 4,
        //         "seats": 5,
        //         "consumption": 5.6,
        //         "trunk": 2,
        //         "airConditioning": true,
        //         "pic": "/mocha_car5.png",
        //         "status": "available",
        //         "show": false,
        //         "description": "Toyota Corolla aut. offers everything that might be expected from Toyota: it has a stylish look, sporty handling, fuel efficiency. Toyota Corolla, like the similar cars in this group has power windows, air conditioning, power steering, stereo system and parking assistance rear camera with very good fuel consumption."
        //     },
        //     {
        //         "brand": "Toyota",
        //         "model": "Verso",
        //         "category": "minivan",
        //         "price": 36,
        //         "year": 2016,
        //         "doors": 5,
        //         "seats": 7,
        //         "consumption": 4.5,
        //         "trunk": 1,
        //         "airConditioning": true,
        //         "pic": "/mocha_car6.png",
        //         "status": "available",
        //         "show": false,
        //         "description": "Toyota Verso is a family 7-seater van that offers style and comfort during your trip and it can be easily transformed depending on the number of passengers and the luggage volume. In Verso you can find hi-tech technologies such as remote control from the steering wheel, USB/AUX/CD, A/C, LED headlights and many others."
        //     },
        //     {
        //         "brand": "Renault",
        //         "model": "Trafic",
        //         "category": "minivan",
        //         "price": 36,
        //         "year": 2019,
        //         "doors": 5,
        //         "seats": 9,
        //         "consumption": 6.6,
        //         "trunk": 5,
        //         "air-conditioning": true,
        //         "pic": "/mocha_car7.png",
        //         "status": "available",
        //         "show": false,
        //         "description": "Renault Trafic 2019 with built-in Navigation is a practical 9-seater car, suitable for a business trip or vacation with friends. The large interior space allows for a comfortable and pleasant journey and long distances are no problem thanks to the tank with a capacity of 90 l."
        //     },
        //     {
        //         "brand": "VW",
        //         "model": "T-Roc",
        //         "category": "jeep",
        //         "price": 30,
        //         "year": 2019,
        //         "doors": 5,
        //         "seats": 5,
        //         "consumption": 7,
        //         "trunk": 2,
        //         "airConditioning": true,
        //         "pic": "/mocha_car8.png",
        //         "status": "available",
        //         "show": false,
        //         "description": "The brand new super popular model of VW - T-Roc is a unique beautiful compact SUV with many extras and great appearance. Extremely innovative, compact, with a lot of extras, automatic gearbox and tbuilt-in navigation, T-Roc is always getting the attention."
        //     },
        //     {
        //         "brand": "Nissan",
        //         "model": "Qashqai",
        //         "category": "jeep",
        //         "price": 30,
        //         "year": 2019,
        //         "doors": 5,
        //         "seats": 5,
        //         "consumption": 5.6,
        //         "trunk": 2,
        //         "airConditioning": true,
        //         "pic": "/mocha_car9.png",
        //         "status": "available",
        //         "show": false,
        //         "description": "Nissan Qashqai is crossover suitable for all kinds of conditions. It offers safety and security for up to 5 passengers. Being the newest Qashqai model, it is very popular with its innovations, style and technical specification. Between the extras of the car is the useful built-in navigation which can take you everywhere fast and easy."
        //     },
        //     {
        //         "brand": "VW",
        //         "model": "Touareg",
        //         "category": "jeep",
        //         "price": 30,
        //         "year": 2019,
        //         "doors": 5,
        //         "seats": 5,
        //         "consumption": 7.4,
        //         "trunk": 4,
        //         "airConditioning": true,
        //         "pic": "/mocha_car10.png",
        //         "status": "available",
        //         "show": false,
        //         "description": "VW Touareg 2019 is a premium SUV car, ideal for pleasant and comfortable transportation of up to 5 passengers. Many extras, huge trunk and awesome look are only some of the advantages of the new Touareg 2019. All wheel driving makes Touareg perfect for all road conditions."
        //     },
        //     {
        //         "brand": "Mercedes",
        //         "model": "C-Class",
        //         "category": "luxury",
        //         "price": 50,
        //         "year": 2018,
        //         "doors": 4,
        //         "seats": 5,
        //         "consumption": 4.6,
        //         "trunk": 2,
        //         "airConditioning": true,
        //         "pic": "/mocha_car11.png",
        //         "status": "available",
        //         "show": false,
        //         "description": "Mercedes-Benz C220 is a gorgeous luxury car that combines aggressive sport appearance and latest extras such as Active Park Assist, Rain sensor, Live traffic capability, Traffic sign recognition, Seat heater, Adaptive stop light flashing, Pedestrian protection etc."
        //     },
        //     {
        //         "brand": "Tesla",
        //         "model": "C-Class",
        //         "category": "special",
        //         "price": 65,
        //         "year": 2018,
        //         "doors": 5,
        //         "seats": 5,
        //         "consumption": 72,
        //         "trunk": 2,
        //         "airConditioning": true,
        //         "pic": "/mocha_car12.png",
        //         "status": "available",
        //         "show": false,
        //         "description": "Tesla Model S 75D 2018 is a unique and high technological electric vehicle. This car is wonderful in every detail – awesome appearance and new generation extras. Tesla Model S 75D is equipped with fully electrical driving system and has comparatively high real mileage – 450 km according to the WLTP."
        //     }

        // ],
        cars: [],
        isLoggedIn: true
    }
},
created() {
    db.collection('cars').orderBy('price').onSnapshot(res => {
        const changes = res.docChanges();

        changes.forEach(change => {
            if (change.type === 'added') {
                this.cars.push({
                    ...change.doc.data(),
                    id: change.doc.id
                })
            }
        });
    });
}
};
</script>

<style scoped>
.car-year {
    margin-right: 140px;
}
</style>
