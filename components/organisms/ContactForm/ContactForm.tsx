'use client';

import { type ChangeEvent, type FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Loader2, Send } from 'lucide-react';
import { Button, Card, Input, PhoneInput, Textarea, Typography } from '@/components/atoms';
import { validateName, validateEmail, validateText } from '@/components/atoms/Input/formValidations';
import type { PhoneValue } from '@/components/atoms/Input/PhoneInput';
import { sendEmailAction } from '@/app/actions/send-email';

export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneCountryCode: string;
    phone: string;
    message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface ContactFormProps {
    onShowLinks?: () => void;
    onSuccess?: () => void;
}

interface FieldErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    message?: string;
}

export function ContactForm({ onShowLinks, onSuccess }: ContactFormProps) {
    const t = useTranslations('connect.form');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState<PhoneValue>({ countryCode: '+1', number: '' });
    const [message, setMessage] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [errors, setErrors] = useState<FieldErrors>({});
    const [status, setStatus] = useState<FormStatus>('idle');
    const [serverError, setServerError] = useState<string | null>(null);

    const clearError = (field: keyof FieldErrors) =>
        setErrors(prev => ({ ...prev, [field]: undefined }));

    const validateAll = (): FieldErrors => {
        const errs: FieldErrors = {};

        const fnLabel = t('firstName');
        const fnResult = validateName(firstName, fnLabel, {
            required: t('validation.nameRequired', { label: fnLabel }),
            tooShort: t('validation.nameTooShort', { label: fnLabel }),
            invalidChars: t('validation.nameInvalidChars', { label: fnLabel }),
        });
        if (!fnResult.valid) errs.firstName = fnResult.message;

        if (lastName.trim()) {
            const lnLabel = t('lastName');
            const lnResult = validateName(lastName, lnLabel, {
                required: t('validation.nameRequired', { label: lnLabel }),
                tooShort: t('validation.nameTooShort', { label: lnLabel }),
                invalidChars: t('validation.nameInvalidChars', { label: lnLabel }),
            });
            if (!lnResult.valid) errs.lastName = lnResult.message;
        }

        const emailResult = validateEmail(email, {
            required: t('validation.emailRequired'),
            invalid: t('validation.emailInvalid'),
        });
        if (!emailResult.valid) errs.email = emailResult.message;

        const msgLabel = t('message');
        const msgResult = validateText(message, { required: true, minLength: 10, maxLength: 500, label: msgLabel }, {
            required: t('validation.textRequired', { label: msgLabel }),
            tooShort: t('validation.textTooShort', { label: msgLabel, min: 10 }),
            tooLong: t('validation.textTooLong', { label: msgLabel, max: 500 }),
        });
        if (!msgResult.valid) errs.message = msgResult.message;

        return errs;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setServerError(null);

        const errs = validateAll();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        setStatus('submitting');
        
        try {
            const result = await sendEmailAction({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                phoneCountryCode: phone.countryCode,
                phone: phone.number,
                message: message.trim(),
                _honeypot: honeypot,
            });

            if (result.error) {
                setServerError(result.error);
                setStatus('error');
                return;
            }

            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone({ countryCode: '+1', number: '' });
            setMessage('');
            setHoneypot('');
            setErrors({});
            setStatus('idle');
            setServerError(null);
            onSuccess?.();
        } catch {
            setServerError(t('sendError'));
            setStatus('error');
        }
    };

    const submitLabel = {
        idle: t('send'),
        submitting: t('sending'),
        success: t('send'),
        error: t('tryAgain'),
    }[status];

    return (
        <Card className="opacity-0 flex flex-col gap-4 sm:gap-5 w-full max-w-xl px-4 py-4 sm:px-6 sm:py-6 animate-fade-pop-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div>
                    <Typography variant="h2" className="text-2xl sm:text-3xl">{t('title')}</Typography>
                    <Typography variant="small" className="mt-1">{t('description')}</Typography>
                </div>
                <button
                    type="button"
                    onClick={onShowLinks}
                    aria-label={t('backToLinks')}
                    className="flex items-center gap-1.5 self-end sm:self-auto shrink-0 text-sm text-muted hover:text-primary transition-colors duration-200 animate-fade-pop-in"
                >
                    <ArrowLeft size={14} />
                    {t('backToLinks')}
                </button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:gap-4">
                {/* Honeypot — hidden from real users; bots fill it and get silently rejected */}
                <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="sr-only"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                        label={t('firstName')}
                        required
                        validate="name"
                        value={firstName}
                        error={errors.firstName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setFirstName(e.target.value);
                            clearError('firstName');
                        }}
                    />
                    <Input
                        label={t('lastName')}
                        validate="name"
                        value={lastName}
                        error={errors.lastName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setLastName(e.target.value);
                            clearError('lastName');
                        }}
                    />
                </div>

                <Input
                    label={t('email')}
                    type="email"
                    required
                    validate="email"
                    value={email}
                    error={errors.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value);
                        clearError('email');
                    }}
                />

                <PhoneInput
                    label={t('phone')}
                    error={errors.phone}
                    onValueChange={(val) => {
                        setPhone(val);
                        clearError('phone');
                    }}
                />

                <Textarea
                    label={t('message')}
                    required
                    minLength={10}
                    maxLength={500}
                    rows={3}
                    showCharCount
                    placeholder={t('messagePlaceholder')}
                    value={message}
                    error={errors.message}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        setMessage(e.target.value);
                        clearError('message');
                    }}
                />

                <div aria-live="polite" aria-atomic="true">
                    {status === 'error' && (
                        <p role="alert" className="text-sm text-red-500 text-center">
                            {serverError || t('sendError')}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    fullWidth
                    disabled={status === 'submitting'}
                    iconRight={status === 'submitting' ? Loader2 : Send}
                    className={status === 'submitting' ? '[&_svg]:animate-spin' : undefined}
                >
                    {submitLabel}
                </Button>
            </form>
        </Card>
    );
}