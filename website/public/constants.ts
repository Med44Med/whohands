export const productProperties = {
  size: {
    letters: [
      "xxs",
      "xs",
      "s",
      "m",
      "l",
      "xl",
      "xxl",
      "xxxl",
      "xxxxl",
      "xxxxxl",
    ],
    numbers: Array.from({ length: 70 }, (_, i) => (i + 1).toString()),
    words: ["small", "normal", "big"],
  },
  colors: [
    "red",
    "orange",
    "yellow",
    "beige",
    "green",
    "black",
    "white",
    "gray",
    "brown",
    "pink",
    "purple",
    "blue",
  ],
  pack: Array.from(
    { length: 10 },
    (_, i) => (i + 1).toString() + (i === 0 ? " item" : " items")
  ),
};
