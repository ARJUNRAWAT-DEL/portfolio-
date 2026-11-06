import test from "node:test";
import assert from "node:assert/strict";
import { validateContact, escapeHtml } from "../lib/contact.ts";
import { rateLimit } from "../lib/rate-limit.ts";
const valid = {
  name: "Visitor",
  email: "visitor@example.com",
  subject: "A project",
  message: "I would like to discuss a project.",
};
test("rejects non-string and whitespace-only contact fields", () => {
  for (const input of [
    null,
    [],
    {},
    { ...valid, name: 4 },
    { ...valid, name: "   " },
    { ...valid, message: {} },
    { ...valid, subject: [] },
    { ...valid, email: "bad@" },
  ])
    assert.ok(validateContact(input).error);
});
test("enforces message and header limits", () => {
  for (const input of [
    { ...valid, message: "short" },
    { ...valid, message: "a".repeat(5001) },
    { ...valid, subject: "x".repeat(161) },
    { ...valid, name: "Name\r\nBcc: other@example.com" },
  ])
    assert.ok(validateContact(input).error);
});
test("trims inputs and accepts valid international names", () => {
  const { data } = validateContact({
    ...valid,
    name: "  Müller  ",
    email: " visitor@example.com ",
  });
  assert.equal(data.name, "Müller");
  assert.equal(data.email, "visitor@example.com");
});
test("HTML email output escapes injected markup", () => {
  assert.equal(
    escapeHtml("<img src=\"x\"> & 'test'"),
    "&lt;img src=&quot;x&quot;&gt; &amp; &#39;test&#39;",
  );
});
test("rate limit isolates clients and resets after its window", () => {
  assert.equal(rateLimit("a", 2, 100, 1000), true);
  assert.equal(rateLimit("a", 2, 100, 1001), true);
  assert.equal(rateLimit("a", 2, 100, 1002), false);
  assert.equal(rateLimit("b", 2, 100, 1002), true);
  assert.equal(rateLimit("a", 2, 100, 1100), true);
});
