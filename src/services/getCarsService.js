import { db } from '@/fb'

export const getCarsService = {
    created() {
        // firestore realtime listener
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
        }, err => console.log(err.message));
    }
} 