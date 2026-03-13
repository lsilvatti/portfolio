export interface ValidationResult {
    valid: boolean;
    message: string;
}

const VALID_RESULT: ValidationResult = { valid: true, message: '' };

export function validateName(value: string, label = 'Name'): ValidationResult {
    const trimmed = value.trim();
    if (!trimmed) return { valid: false, message: `${label} is required.` };
    if (trimmed.length < 2) return { valid: false, message: `${label} must be at least 2 characters.` };
    if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(trimmed))
        return { valid: false, message: `${label} may only contain letters, spaces, hyphens, and apostrophes.` };
    return VALID_RESULT;
}

export function validateEmail(value: string): ValidationResult {
    const trimmed = value.trim();
    if (!trimmed) return { valid: false, message: 'Email is required.' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed))
        return { valid: false, message: 'Please enter a valid email address.' };
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
    options: { required?: boolean; minLength?: number; maxLength?: number; label?: string } = {}
): ValidationResult {
    const { required, minLength, maxLength, label = 'This field' } = options;
    const trimmed = value.trim();
    if (required && !trimmed) return { valid: false, message: `${label} is required.` };
    if (minLength !== undefined && trimmed.length < minLength)
        return { valid: false, message: `${label} must be at least ${minLength} characters.` };
    if (maxLength !== undefined && trimmed.length > maxLength)
        return { valid: false, message: `${label} must not exceed ${maxLength} characters.` };
    return VALID_RESULT;
}
