export class StorageHandle {
  constructor() {
    this.key = "token-authentication";
  }

  key: string;

  setToken(value: string) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  getToken() {
    if (typeof localStorage.getItem(this.key) === "undefined" || localStorage.getItem(this.key)?.length === 0) {
      return "Storage empty";
    }

    return JSON.parse(localStorage.getItem(this.key)!);

  }
}

export const storageHandle = new StorageHandle();
