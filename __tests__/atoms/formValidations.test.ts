import {
  validateName,
  validateEmail,
  validatePhone,
  validateText,
} from "@/components/atoms/Input/formValidations";

describe("validateName", () => {
  it("returns invalid when value is empty", () => {
    expect(validateName("")).toMatchObject({ valid: false });
    expect(validateName("   ")).toMatchObject({ valid: false });
  });

  it("returns invalid when value is too short", () => {
    expect(validateName("A")).toMatchObject({ valid: false });
  });

  it("returns invalid when value contains disallowed characters", () => {
    expect(validateName("John123")).toMatchObject({ valid: false });
    expect(validateName("John@Doe")).toMatchObject({ valid: false });
  });

  it("returns valid for normal names", () => {
    expect(validateName("John")).toMatchObject({ valid: true, message: "" });
    expect(validateName("Ana Maria")).toMatchObject({ valid: true });
    expect(validateName("O'Brien")).toMatchObject({ valid: true });
    expect(validateName("Jean-Luc")).toMatchObject({ valid: true });
  });

  it("returns valid for accented characters", () => {
    expect(validateName("Renée")).toMatchObject({ valid: true });
    expect(validateName("García")).toMatchObject({ valid: true });
  });

  it("uses custom messages when provided", () => {
    const msgs = { required: "Campo obrigatório" };
    expect(validateName("", "Nome", msgs)).toMatchObject({
      valid: false,
      message: "Campo obrigatório",
    });
  });

  it("uses custom label in default message", () => {
    const result = validateName("", "First Name");
    expect(result.message).toContain("First Name");
  });
});

describe("validateEmail", () => {
  it("returns invalid when empty", () => {
    expect(validateEmail("")).toMatchObject({ valid: false });
  });

  it("returns invalid for malformed emails", () => {
    expect(validateEmail("notanemail")).toMatchObject({ valid: false });
    expect(validateEmail("missing@domain")).toMatchObject({ valid: false });
    expect(validateEmail("@nodomain.com")).toMatchObject({ valid: false });
    expect(validateEmail("space @test.com")).toMatchObject({ valid: false });
  });

  it("returns valid for well-formed emails", () => {
    expect(validateEmail("user@example.com")).toMatchObject({ valid: true });
    expect(validateEmail("user+tag@sub.domain.org")).toMatchObject({ valid: true });
  });

  it("uses custom messages when provided", () => {
    const msgs = { required: "Email é obrigatório" };
    expect(validateEmail("", msgs)).toMatchObject({ message: "Email é obrigatório" });
  });
});

describe("validatePhone", () => {
  it("returns invalid when empty", () => {
    expect(validatePhone("")).toMatchObject({ valid: false });
    expect(validatePhone("   ")).toMatchObject({ valid: false });
  });

  it("returns invalid when number is too short", () => {
    expect(validatePhone("123")).toMatchObject({ valid: false });
  });

  it("returns invalid when number is too long", () => {
    expect(validatePhone("1234567890123456")).toMatchObject({ valid: false });
  });

  it("returns valid for a typical phone number", () => {
    expect(validatePhone("+1 (555) 123-4567")).toMatchObject({ valid: true });
    expect(validatePhone("5511999999999")).toMatchObject({ valid: true });
  });

  it("strips non-digit characters before validating length", () => {
    expect(validatePhone("(555) 123-45")).toMatchObject({ valid: true });
  });
});

describe("validateText", () => {
  it("returns valid when not required and empty", () => {
    expect(validateText("")).toMatchObject({ valid: true });
    expect(validateText("", { required: false })).toMatchObject({ valid: true });
  });

  it("returns invalid when required and empty", () => {
    expect(validateText("", { required: true })).toMatchObject({ valid: false });
  });

  it("returns invalid when shorter than minLength", () => {
    expect(validateText("Hi", { minLength: 5 })).toMatchObject({ valid: false });
  });

  it("returns invalid when longer than maxLength", () => {
    expect(validateText("Hello World", { maxLength: 5 })).toMatchObject({ valid: false });
  });

  it("returns valid when within bounds", () => {
    expect(validateText("Hello", { minLength: 3, maxLength: 10 })).toMatchObject({
      valid: true,
    });
  });

  it("trims whitespace before checking length", () => {
    expect(validateText("     ", { required: true })).toMatchObject({ valid: false });
  });

  it("uses custom messages when provided", () => {
    const msgs = { required: "Mensagem é obrigatória" };
    expect(validateText("", { required: true }, msgs)).toMatchObject({
      message: "Mensagem é obrigatória",
    });
  });

  it("includes label in default error message", () => {
    const result = validateText("", { required: true, label: "Message" });
    expect(result.message).toContain("Message");
  });
});
