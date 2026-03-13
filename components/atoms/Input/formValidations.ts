export interface ValidationResult {
    valid: boolean;
    message: string;
}

const VALID_RESULT: ValidationResult = { valid: true, message: '' };

export interface NameMessages {
    required?: string;
    tooShort?: string;
    invalidChars?: string;
}

export interface EmailMessages {
    required?: string;
    invalid?: string;
}

export interface TextMessages {
    required?: string;
    tooShort?: string;
    tooLong?: string;
}

export function validateName(value: string, label = 'Name', msgs?: NameMessages): ValidationResult {
    const trimmed = value.trim();
    if (!trimmed) return { valid: false, message: msgs?.required ?? `${label} is required.` };
    if (trimmed.length < 2) return { valid: false, message: msgs?.tooShort ?? `${label} must be at least 2 characters.` };
    if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(trimmed))
        return { valid: false, message: msgs?.invalidChars ?? `${label} may only contain letters, spaces, hyphens, and apostrophes.` };
    return VALID_RESULT;
}

export function validateEmail(value: string, msgs?: EmailMessages): ValidationResult {
    const trimmed = value.trim();
    if (!trimmed) return { valid: false, message: msgs?.required ?? 'Email is required.' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed))
        return { valid: false, message: msgs?.invalid ?? 'Please enter a valid email address.' };
    return VALID_RESULT;
}

export function validatePhone(value: string): ValidationResult {
    const digits = value.replace(/\D/g, '');
    if (!digits) return { valid: false, message: 'Phone number is required.' };
    if (digits.length < 4) return { valid: false, message: 'Phone number is too short.' };
    if (digits.length > 15) return { valid: false, message: 'Phone number is too long (max 15 digits).' };
    return VALID_RESULT;
}

export function validateText(
    value: string,
    options: { required?: boolean; minLength?: number; maxLength?: number; label?: string } = {},
    msgs?: TextMessages
): ValidationResult {
    const { required, minLength, maxLength, label = 'This field' } = options;
    const trimmed = value.trim();
    if (required && !trimmed) return { valid: false, message: msgs?.required ?? `${label} is required.` };
    if (minLength !== undefined && trimmed.length < minLength)
        return { valid: false, message: msgs?.tooShort ?? `${label} must be at least ${minLength} characters.` };
    if (maxLength !== undefined && trimmed.length > maxLength)
        return { valid: false, message: msgs?.tooLong ?? `${label} must not exceed ${maxLength} characters.` };
    return VALID_RESULT;
}
