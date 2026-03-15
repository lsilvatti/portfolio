import { cn } from "@/lib/utils";

describe("cn", () => {
  it("joins class strings", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("filters out falsy values", () => {
    expect(cn("foo", undefined, null, false, "bar")).toBe("foo bar");
  });

  it("resolves Tailwind conflicts via tailwind-merge (last wins)", () => {
    expect(cn("p-4", "p-8")).toBe("p-8");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("returns empty string when no classes are provided", () => {
    expect(cn()).toBe("");
    expect(cn(undefined, null, false)).toBe("");
  });

  it("handles a single class", () => {
    expect(cn("hello")).toBe("hello");
  });
});
