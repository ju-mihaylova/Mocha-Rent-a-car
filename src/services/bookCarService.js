import { auth, db } from '@/fb'

export const bookCarService = {
    methods: {
        addBooking() {
            // add booking info
            db.collection('users').doc(auth.currentUser.uid).get()
              .then(doc => {
                return db.collection('booking').add({
                          userName: doc.data().name,
                          carBrand: this.carBrand,
                          carModel: this.carModel,
                          startDate: this.dateStart,
                          endDate: this.dateEnd,
                          price: this.carPrice,
                          total: this.totalPrice
                      });       
              }).then(() => {
                      this.dialog = false;
                      this.$refs.form.reset();
                      this.dateStart = new Date().toISOString().substr(0, 10);
                      this.dateEnd = new Date().toISOString().substr(0, 10);
                  }).catch(err => {
                      console.log(err.message);
                  });  
        }
    }
}