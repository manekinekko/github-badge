import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GithubService {
  async getGithubUserInfo(username: string) {
    if (!username) {
      return await this.fakeUserInfo();
    }

    const response = await fetch(`https://api.github.com/users/${username}`);
    const payload = await response.json();
    return payload;
  }
  async fakeUserInfo() {
    return {
      name: "",
      login: "",
      avatar_url: "/assets/github4-700x467.jpg",
      html_url: "",
      public_repos: "-",
      public_gists: "-",
      followers: "-",
    };
  }
}
