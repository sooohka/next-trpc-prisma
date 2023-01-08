export const timer = (time: number) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, time);
  });
};
