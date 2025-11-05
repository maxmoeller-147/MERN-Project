const request = require("supertest");
const { app } = require("../server");

const { UserModel } = require("../database/entities/User");

describe("Users route works.", () => {
  it("Register route works ", async () => {
    // Spy on UserModel.findOne and mock its resolution
    jest.spyOn(UserModel, 'findOne').mockResolvedValue(false);

    let response = await request(app)
      .post("/users/register")
      .send({
        email: "abcd@gmail.com",
        username: "abcdef",
        password: "Abcd2335!",
      });

    console.log("flag 3");
    expect(response.status).toEqual(200);
  });

  it("Register route works ", async () => {
    // Spy on UserModel.findOne and mock its resolution
    jest.spyOn(UserModel, 'findOne').mockResolvedValue(false);

    let response = await request(app)
      .post("/users/register")
      .send({
        email: "abcd@gmail.com",
        username: "abcdef",
        password: "Abcd2335!",
      });

    console.log("flag 3");
    expect(response.status).toEqual(200);
  });
});