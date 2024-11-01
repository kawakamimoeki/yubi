import { expect, test } from "vitest";
import { Yubi } from "./index.ts";

test("basic", () => {
  const yubi = new Yubi();
  yubi.record({
    key: "a",
    metaKey: true,
  } as KeyboardEvent);
  yubi.record({
    key: "b",
    shiftKey: true,
  } as KeyboardEvent);
  expect(yubi.match("cmd+a shift+b")).toBeTruthy();
});
