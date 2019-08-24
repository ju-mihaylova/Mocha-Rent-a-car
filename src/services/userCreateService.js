import { auth, db } from '@/fb'

export const userCreateService = {
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
        }
    }
};

