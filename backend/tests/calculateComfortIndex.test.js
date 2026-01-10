import { calculateComfortIndex } from "../src/services/comfortIndex.service.js";

describe("calculateComfortIndex", () => {
  test("returns high score for ideal conditions", () => {
    const weather = {
      main: { temp: 22, humidity: 50 },
      wind: { speed: 3 },
    };

    const score = calculateComfortIndex(weather);
    expect(score).toBeGreaterThanOrEqual(85);
  });

  test("returns noticeably lower score for hot weather", () => {
    const weather = {
      main: { temp: 38, humidity: 60 },
      wind: { speed: 3 },
    };

    const score = calculateComfortIndex(weather);
    expect(score).toBeLessThanOrEqual(75);
  });

  test("returns noticeably lower score for cold weather", () => {
    const weather = {
      main: { temp: -5, humidity: 40 },
      wind: { speed: 2 },
    };

    const score = calculateComfortIndex(weather);
    expect(score).toBeLessThanOrEqual(75);
  });

  test("penalizes high wind speed", () => {
    const weather = {
      main: { temp: 22, humidity: 50 },
      wind: { speed: 12 },
    };

    const score = calculateComfortIndex(weather);
    expect(score).toBeLessThanOrEqual(80);
  });

  test("always returns a value between 0 and 100", () => {
    const weather = {
      main: { temp: 100, humidity: 0 },
      wind: { speed: 50 },
    };

    const score = calculateComfortIndex(weather);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });
});
