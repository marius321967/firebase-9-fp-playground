const { assert } = require('chai');
const { deleteApp, initializeApp } = require('firebase/app');
const { getDatabase, child, ref, set, get, remove } = require('firebase/database');
const { curryRight } = require('lodash');
const { pipe } = require('lodash/fp');

describe('firebase', () => {

    const config = { databaseURL: 'http://my.local.firebase:9000' };
    let app;

    before(() => {
        app = initializeApp(config);
    })
    
    afterEach(() => {
        remove(ref(getDatabase(app)));
    })

    after(() => {
        deleteApp(app);
    })
    
    it('Messy code', done => {
        // Multi-line
        set(
            child(
                ref(
                    getDatabase(app),
                    'users'
                ),
                '123'
            ),
            { name: 'John Doe' }
        )
            .then(() => 
                // Single-line
                get( child( child( ref( getDatabase(), 'users' ), '123'), 'name') )
            )
            .then(snapshot => {
                assert.isTrue(snapshot.exists());
                assert.equal(snapshot.val(), 'John Doe');
                done();
            })
            .catch(done);
    })

    it('Steps with variables', done => {
        const database = getDatabase(app);
        const usersRef = ref(database, 'users');
        const userRef = child(usersRef, '123');
        
        set(userRef, { name: 'John Doe' })
            .then(() => {
                const userNameRef = child(userRef, 'name');

                return get(userNameRef);
            })
            .then(snapshot => {
                assert.isTrue(snapshot.exists());
                assert.equal(snapshot.val(), 'John Doe');
                done();
            })
            .catch(done);
    })

    it('Piped code', done => {
        refC    = curryRight(ref);
        childC  = curryRight(child);
        setC    = curryRight(set);

        const createUser = pipe(
            getDatabase,
            refC('users'),
            childC('123'),
            setC({ name: 'John Doe' })
        );

        const getUserName = pipe(
            getDatabase,
            refC('users/123/name'),
            get
        )

        createUser()
            .then(getUserName)
            .then(snapshot => {
                assert.isTrue(snapshot.exists());
                assert.equal(snapshot.val(), 'John Doe');
                done();
            })
            .catch(done);
    })

})