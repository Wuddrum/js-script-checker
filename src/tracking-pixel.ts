export class TrackingPixel {
  public static setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  public static create(name: string) {
    const baseUrl =
      this.baseUrl[-1] === "/" ? this.baseUrl : this.baseUrl + "/";
    const imgEl = document.createElement("img");

    imgEl.src = baseUrl + name;
  }

  private static baseUrl: string = "";
}
