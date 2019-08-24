import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import About from '@/components/common/About'
import Contacts from '@/components/common/Contacts'
import CarDataTable from '@/components/admin/CarDataTable'
import BookingDataTable from '@/components/admin/BookingDataTable'
import P401 from '@/components/common/P401'
import P404 from '@/components/common/P404'
import { auth } from '@/fb'


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
      name: 'cardatatable',
      component: CarDataTable,
      beforeEnter: (to, from, next) => {
        if (auth.currentUser) {
          auth.currentUser.getIdTokenResult()
            .then(idTokenResult => {
              let isAdmin = idTokenResult.claims.admin;
              if (isAdmin) {
                next();
              } else {
                next({ name: 'p401' });
              }          
          });
        } else {
          next({ name: 'p401' });
        }
      }
    },
    {
      path: '/booking-data-table',
      name: 'bookingdatatable',
      component: BookingDataTable,
      beforeEnter: (to, from, next) => {
        if (auth.currentUser) {
          auth.currentUser.getIdTokenResult()
            .then(idTokenResult => {
              let isAdmin = idTokenResult.claims.admin;
              if (isAdmin) {
                next();
              } else {
                next({ name: 'p401' });
              }          
          });
        } else {
          next({ name: 'p401' });
        }
      }
    },
    {
      path: '/p401',
      name: 'p401',
      component: P401
    },
    {
      path: '*',
      name: 'p404',
      component: P404
    },
  ]
})
