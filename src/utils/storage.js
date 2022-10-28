// 获取缓存信息
export function getStorage(val) {
  return localStorage.getItem(val);
}
// 清除指定key的缓存
export function setStorage(key, val) {
  return localStorage.setItem(key, val);
}
// 清空缓存
export function removeStorage(key) {
  localStorage.removeItem(key);
}
