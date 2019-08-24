import { auth, db } from '@/fb'

export const userAuthService = {
    methods: {
        createUser() {
            // get user info
            const name = this.name;
            const email = this.email;
            const password = this.password;

            // sign up the user
            auth.createUserWithEmailAndPassword(email, password)
                .then(cred => {
                    return db.collection('users').doc(cred.user.uid).set({
                        name
                    });
                    
                }).then(() => {               
                    this.dialog = false;
                    // this.$refs.form.reset();
                }).catch(err => {
                    console.log(err.message);
                });
        },
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
        },
        logoutUser() {
            auth.signOut()
            .then(() => this.$router.push('/'))
            .catch(err => console.log(err.message)); 
        }
    }
};

