const findSaved = (db, auth, data, setIsSaved, saveFilter) => {
    let userId = auth.currentUser.uid;

    let ref = db.collection('savedAsteroids').where('by', '==', userId).where('asteroid_id', '==', !!saveFilter ? data.asteroid_id : data.id)
    ref.get().then(snapshot => {
        if (snapshot.docs.length !== 0) {
            console.log(`${data.name} is saved`)
            setIsSaved(true);
        } else {
            console.log('notSaved')
        }
    })
}

export default findSaved;