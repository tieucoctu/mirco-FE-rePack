/**
 * Hợp đồng sự kiện (Typed Event Map)
 * @typedef {Object} EventMap
 * @property {{ productId: string; qty: number }} "cart:add-item"
 */

const STORE_KEY = "__MFE_BUS_STATE__";

// Lưu state trên window để mọi MFE (Host, Product, Cart) đều đọc chung 1 nguồn
function getStore() {
  if (!window[STORE_KEY]) {
    window[STORE_KEY] = {
      cartCount: 0,
    };
  }
  return window[STORE_KEY];
}

export const bus = {
  /**
   * Phát sự kiện kèm cập nhật state lưu lại
   * @template {keyof EventMap} K
   * @param {K} event
   * @param {EventMap[K]} detail
   */
  emit(event, detail) {
    if (event === "cart:add-item") {
      getStore().cartCount += detail.qty;
    }
    window.dispatchEvent(new CustomEvent(event, { detail }));
  },

  /**
   * Lắng nghe sự kiện
   * @template {keyof EventMap} K
   * @param {K} event
   * @param {(detail: EventMap[K]) => void} handler
   * @returns {() => void} Hàm hủy đăng ký (unsubscribe)
   */
  on(event, handler) {
    const listener = (e) => handler(e.detail);
    window.addEventListener(event, listener);
    return () => window.removeEventListener(event, listener);
  },

  /**
   * Đọc giá trị hiện tại khi subscriber mount muộn
   */
  getCartCount() {
    return getStore().cartCount;
  },
};
