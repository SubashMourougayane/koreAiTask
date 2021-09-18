// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Students", () => {
    describe("GET /api/v1/captcha", () => {
        it("should get a svg image", (done) => {
             chai.request(app)
                 .get('/api/v1/captcha')
                 .end((err, res) => {
                     res.should.have.status(200);
                     done();
                  });
         });
        
         
       
    });
});