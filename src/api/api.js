import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class FrienderAPI {
  static token = "";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FrienderAPI.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Sign up a user, returns token */
  static async signup(formData) {
    let res = await this.request("signup", formData, "post");
    return res.token;
  }

  /** Log in a user, return token */
  static async login(formData) {
    let res = await this.request("login", formData, "post");
    return res;
  }

  /** Get details on a user */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res;
  }

  /** Get user matches */

  static async getUserMatches(username) {
    let res = await this.request(`users/${username}/lists`);
    return res;
  }

  /** Updates a user's profile */

  static async updateUser(username, formData) {
    let res = await this.request(`users/${username}`, formData, "patch");
    return res;
  }

  /** Uploads a user's profile image */

  static async uploadImage(username, formData) {
    let res = await this.request(`users/${username}/upload`, formData.image, "post",);
  }

  /** Add a user to curr user's list of hope to matches */

  static async addMatch(username, other_username) {
    let res = await this.request(`users/${username}/match`, { "username": other_username }, "post");
    return res;
  }

  /** Add a user to curr user's list of rejected users */
  static async addReject(username, other_username) {
    let res = await this.request(`users/${username}/reject`, { "username": other_username }, "post");
    return res;
  }

  /** Get a user's list of messages */
  static async getMessages(username) {
    let res = await this.request(`users/${username}/messages`);
    return res;
  }
}

export default FrienderAPI;
