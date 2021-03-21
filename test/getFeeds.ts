import chai = require("chai");
import chaiHttp = require("chai-http");
import app from "../app";
chai.use(chaiHttp);
import { request } from "chai";

const { expect } = chai;

describe("feedslisting", () => {
  describe("GET /getfeeds", () => {
    it("should return an array of all feeds", done => {
      chai
        .request(app)
        .get("/getfeeds")
        .query({ start: 0, end: 10, searchterm: "", sort: "asc" })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.an("object");

          done();
        });
    });
  });
});

describe("feedslisting", () => {
  describe("GET /getfeeds", () => {
    it("should reject the request because of invalid parameters ", done => {
      chai
        .request(app)
        .get("/getfeeds")
        .query({ start: "test", end: 10, searchterm: "abc", sort: "hang" })
        .end(function(err, res: any) {
          expect(res).to.have.status(400);

          done();
        });
    });
  });
});

describe("feedslisting", () => {
  describe("GET /getfeeds", () => {
    it("should give exact match of the string", done => {
      chai
        .request(app)
        .get("/getfeeds")
        .query({
          start: 0,
          end: 10,
          searchterm: '"Human Solutions Planner"',
          sort: "desc"
        })
        .end((err, resp: any) => {
          
          let feeds = JSON.parse(resp.text).feeds;
          let filteredLength = feeds.length;
          let result = feeds;
          result = result.filter((feed: any) => {
            if (
              feed.name.includes("Human Solutions Planner") ||
              feed.description.includes("Human Solutions Planner")
            ) {
              return feed;
            }
          });
          expect(filteredLength).to.equal(result.length);
          done();
        });
    });
  });
});
