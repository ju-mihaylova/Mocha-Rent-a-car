import { auth } from '@/fb'

export const userLogoutService = {
    methods: {
        logoutUser() {
            auth.signOut()
            .then(() => this.$router.push('/'))
            .catch(err => console.log(err.message)); 
        }
    }
};