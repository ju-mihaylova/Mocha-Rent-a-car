import { db } from '@/fb'

export const actionsService = {
    methods: {
        editItemInDB(collection, item){
            const itemId = this.editedItem.id;       
            db.collection(collection).doc(itemId).set(
                item
            ).then(() => {
                    this.close();
                }); 
        },
        createItemInDB(collection, item){
            db.collection(collection).add(
                item
              ).then(() => {
                    this.close();        
                });
        },
        deleteItemFromDB(collection, item){
            db.collection(collection).doc(item.id).delete();
        }
    }
}