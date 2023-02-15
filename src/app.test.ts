import supertest from "supertest";
import mongoose from "mongoose";
import app from "./app";

require("dotenv").config();
/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect("mongodb://localhost:27017/movieapp");
});
/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});
describe("Post/Get/Update/Delete", () => {
  //TESTING POSTING ROUTES
  describe("Post routes", () => {
    describe("", () => {
      //post add product;
      it("registers user", async () => {
        await supertest(app)
          .post("/users/register")
          .send({
            //define a register
            email: "john@example.com",
            firstName: "John",
            lastName: "Doe",
            password: "1234",
            confirm_password: "1234",
          })
          .expect(302);
        //    token = res.headers['set-cookie'];
      });
      //login user;
      it("logins in user", async () => {
        const user = await supertest(app)
          .post("/users/login")
          .send({
            emailAddress: "john@example.com",
            password: "1234",
          })
          .expect(302);
      });
      //post add product;
      it("creates product for user", async () => {
        const product = await supertest(app)
          .post("/users/add")
          .send({
            title: "legally Blonde",
            description: "suspense at its peak",
            image:
              "data:image/jpeg;base64,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",
            price: 2000,
          })
          .expect(302);
      });
    });
    //TESTING GET ROUTES
    describe("get routes", () => {
      //get all products
      it("get  products should return 200", async () => {
        await supertest(app).get("/users/getall");
        expect(200);
      });
      //get product for a user
      it("get product for a user", async () => {
        const _id = "638fb1a6470e38f51ba5bef2";
        await supertest(app).get(`/users/${_id}`);
        expect(200);
      });
    });
    //TESTING UPDATE ROUTES
    describe("update routes", () => {
      //update product;
      it("updates product for a user", async () => {
        const updateProductDetails = await supertest(app)
          .put("/users/update/:_id")
          .send({
            title: "Black panther",
            description: "wakanda forever",
            image:
              "https://c8.alamy.com/comp/P4W675/original-film-title-black-panther-english-title-black-panther-film-director-ryan-coogler-year-2018-stars-chadwick-boseman-credit-marvel-studioswalt-disney-pictures-album-P4W675.jpg",
            price: 5500,
          })
          .expect(302);
      });
    });
    //TESTING DELETE ROUTES
    describe("delete routes", () => {
      it("delete product from a user", async () => {
        const _id = "638fb1a6470e38f51ba5bef2";
        await supertest(app).delete(`/users/delete/${_id}`);
        expect(200);
      });
    });
  });
});
