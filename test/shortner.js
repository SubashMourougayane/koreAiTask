// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Students", () => {
    describe("POST /api/v1/shorten", () => {
        it("should get a small url", (done) => {
             chai.request(app)
                 .post('/api/v1/shorten')
                 .send({
                     long_url : "https://stackoverflow.com/questions/31176526/how-to-write-a-post-request-test-in-mocha-with-data-to-test-if-response-matches"
                 })
                 .end((err, res) => {
                     res.should.have.status(200);
                     done();
                  });
         });
        
         
       
    });
});