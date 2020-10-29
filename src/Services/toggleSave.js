// to save/unsave asteroids
const toggleSave = (isLogged, db, auth, data, isSaved, setIsSaved, saveFilter) => {

    if (!isLogged) {
        alert("Login to perform this action");
        return;
    }
    if (isSaved) {
        // if saved then remove from saved
        db
        .collection('savedAsteroids')
        .where('by', '==', auth.currentUser.uid)
        .where('asteroid_id', '==', !!saveFilter ? data.asteroid_id : data.id)
        .get()
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                doc.ref.delete()
            })
            console.log('unSaved');
            setIsSaved(false);
        })
    } else {
        // if not saved then save
        db.collection('savedAsteroids')
        .add({
            by: auth.currentUser.uid,
            name: data.name,
            asteroid_id: !!saveFilter ? data.asteroid_id : data.id,
            absolute_magnitude_h: data.absolute_magnitude_h,
            is_potentially_hazardous_asteroid: data.is_potentially_hazardous_asteroid,
        })
        .then(() => {
            console.log('Saved')
            setIsSaved(true);
        })
    }
}

export default toggleSave;