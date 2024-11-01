import { expect, test } from "vitest";
import { Yubi } from "./index.ts";

test("basic", () => {
  const yubi = new Yubi();
  yubi.set({
    key: "a",
    metaKey: true,
  } as KeyboardEvent);
  yubi.set({
    key: "b",
    shiftKey: true,
  } as KeyboardEvent);
  expect(yubi.eq("cmd+a shift+b")).toBeTruthy();
});
