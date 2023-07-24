export const prices = [
  {
    name: "Tous",
    min: 0,
    max: 0,
  },
  {
    name: `1$ to 10$`,
    min: 1,
    max: 10,
  },
  {
    name: `10$ to 100$`,
    min: 10,
    max: 100,
  },
  {
    name: `100$ to 1000$`,
    min: 100,
    max: 1000,
  },
];
export const ratings = [
  {
    name: "4 etoiles & plus",
    rating: 4,
  },

  {
    name: "3 etoiles  & plus",
    rating: 3,
  },

  {
    name: "2 etoiles  & plus",
    rating: 2,
  },

  {
    name: "1 etoiles  & plus",
    rating: 1,
  },
];

export const addErrorIntoField = (errors) =>
  errors ? { error: true } : { error: false };
export const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
export const pawdRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const clamp = (min, max) => (v) => v <= min ? min : v >= max ? max : v;
