import { uuid, NonCanonicalUUID, uniqueId } from "../../modules/misc/uuid";

test("uuid generates string in expected format", () => {
  const expected =
    /([A-Z]|[a-z]|[0-9]){8}(-([A-Z]|[a-z]|[0-9]){4}){3}-([A-Z]|[a-z]|[0-9]){12}/;
  for (let i = 0; i < 10; i++) expect(expected.test(uuid())).toBe(true);
});

test("NonCanonicalUUID generates string in expected format", () => {
  const expected =
    /([A-Z]|[a-z]|[0-9]){8}(-([A-Z]|[a-z]|[0-9]){4}){3}-([A-Z]|[a-z]|[0-9]){12}-(\d){1,}/;
  const idGenerator = new NonCanonicalUUID();
  for (let i = 0; i < 10; i++)
    expect(expected.test(idGenerator.generate())).toBe(true);
});

test("uniqueId generates string in expected format", () => {
  const expected = "TEST";
  for (let i = 0; i < 10; i++)
    expect(uniqueId("TEST")).toBe(expected + (i + 1));
});
