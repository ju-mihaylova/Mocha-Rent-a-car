import { auth } from '@/fb'

export const userLoginService = {
    methods: {
        loginUser() {
          // get user info
          const email = this.email;
          const password = this.password;

          auth.signInWithEmailAndPassword(email, password)
              .then(() => {
                  return auth.currentUser.getIdTokenResult();                  
              }).then(idTokenResult => {
                  this.isAdmin = idTokenResult.claims.admin;
                  // close the login modal and reset the form 
                  this.dialog = false;
                  this.$refs.form.reset();
                  // if admin role, reroute to Car Data Table
                  if(this.isAdmin) {
                    this.$router.push('car-data-table');
                  }
                  }).catch(err => {
                  console.log(err.message);
              });  
        }
    }
};