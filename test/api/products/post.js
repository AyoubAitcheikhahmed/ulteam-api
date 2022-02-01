
const expect = require('chai').expect;
const request = require('supertest');
const server = require('../../../index');
const {db_connection,db_disconnect} = require('../../../config/mongo_db');

var app = request.agent(server); 


describe('POST  /products', () =>{
    before((done)=> {
        db_connection()
            .then(()=> done())
            .catch((err) => done(err));
    });

    after((done)=> {
        db_disconnect()
            .then(()=> done())
            .catch((err) => done(err));
    }
    );

    it('OK, creating product ...', (done) => {
        
       app.post("/api/products/")
        .send({
            "title": "title TEST",
            "userOwnership": false,
            "desc": "title TEST",
            "image": "img TEST",
            "categories": ["categoriesTEST"],
            "platform": ["platformTEST"],
            "price": 1
        
        }).then((res) => {
            const body = res.body
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('title');
            expect(body).to.contain.property('userOwnership');
            expect(body).to.contain.property('desc');
            expect(body).to.contain.property('image');
            expect(body).to.contain.property('categories');
            expect(body).to.contain.property('platform');
            expect(body).to.contain.property('price');

            
            done();
        }).catch((err)=> done(err));
    })
});
