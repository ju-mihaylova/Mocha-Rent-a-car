import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import About from '@/components/common/About'
import Contacts from '@/components/common/Contacts'
import CarDataTable from '@/components/admin/CarDataTable'
import BookingDataTable from '@/components/admin/BookingDataTable'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/car-data-table',
      // name: 'cardatatable',
      component: CarDataTable
    },
    {
      path: '/booking-data-table',
      // name: 'bookingdatatable',
      component: BookingDataTable
    },
  ]
})
