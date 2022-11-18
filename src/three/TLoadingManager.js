import { LoadingManager } from "three/src/loaders/LoadingManager.js";

class loaderManager extends LoadingManager {
  onStart(url, itemsLoaded, itemsTotal) {
    console.log(url, itemsLoaded, itemsTotal);
  }
  onProgress(url, itemsLoaded, itemsTotal) {
    console.log(url, itemsLoaded, itemsTotal);
  }
}
