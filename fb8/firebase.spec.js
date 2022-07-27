const { assert } = require('chai');
const firebase = require('firebase');

describe('firebase', () => {
    
    const config = { databaseURL: 'http://my.local.firebase:9000' };
    let app;

    before(() => {
        app = firebase.initializeApp(config);
    })

    after(() => {
        app.delete();
    })
    
    it('Test article code', done => {
        app
            .database()
            .ref('users')
            .child('123')
            .set({ name: 'John Doe' })
            .then(() => app.database().ref('users/123/name').get())
            .then(snapshot => {
                assert.isTrue(snapshot.exists());
                assert.equal(snapshot.val(), 'John Doe');
                done();
            })
            .catch(done);
    })

})