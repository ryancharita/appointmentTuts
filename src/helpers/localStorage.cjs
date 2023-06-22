export const updateLocalStorage = (items) => {
  localStorage.setItem('items', JSON.stringify(items));
};
