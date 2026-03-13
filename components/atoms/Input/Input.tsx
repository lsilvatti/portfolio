'use client';

import { forwardRef, useId, useState, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { validateName, validateEmail, validateText } from './formValidations';

export type InputValidateType = 'name' | 'email' | 'text';
export type InputState = 'default' | 'error' | 'success';

export const inputVariants = cva(
    [
        'w-full rounded-lg border bg-surface text-foreground',
        'transition-colors duration-200 outline-none',
        'placeholder:text-muted-foreground',
        'disabled:pointer-events-none disabled:opacity-50',
        'focus:ring-2',
    ],
    {
        variants: {
            size: {
                sm: 'h-8 px-3 text-sm',
                md: 'h-10 px-3.5 text-base',
                lg: 'h-12 px-4 text-lg',
            },
            state: {
                default: 'border-border focus:border-primary focus:ring-primary/20',
                error:   'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                success: 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
            },
        },
        defaultVariants: {
            size: 'md',
            state: 'default',
        },
    }
);

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
    label?: string;
    hint?: string;
    /** External controlled error message (overrides internal validation). */
    error?: string;
    /** Force success state from parent. */
    success?: boolean;
    /** Built-in validation rule applied on blur. */
    validate?: InputValidateType;
    /** Show character counter. Automatically enabled when maxLength is set. */
    showCharCount?: boolean;
    size?: NonNullable<VariantProps<typeof inputVariants>['size']>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    {
        label,
        hint,
        error: externalError,
        success: externalSuccess,
        validate,
        showCharCount,
        size = 'md',
        className,
        id: externalId,
        required,
        minLength,
        maxLength,
        name,
        onBlur,
        onChange,
        ...rest
    },
    ref
) {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const hintId = `${id}-hint`;
    const errorId = `${id}-error`;

    const [internalError, setInternalError] = useState('');
    const [internalValid, setInternalValid] = useState(false);
    const [charCount, setCharCount] = useState(0);

    const errorMessage = externalError ?? internalError;
    const isSuccess = externalSuccess || (!errorMessage && internalValid);
    const state: InputState = errorMessage ? 'error' : isSuccess ? 'success' : 'default';

    const runValidation = (value: string) => {
        if (!validate) return;

        let result = { valid: true, message: '' };
        if (validate === 'name')  result = validateName(value, label ?? name ?? 'Name');
        if (validate === 'email') result = validateEmail(value);
        if (validate === 'text')  result = validateText(value, { required, minLength, maxLength, label: label ?? name });

        if (result.valid) {
            setInternalError('');
            setInternalValid(true);
        } else {
            setInternalError(result.message);
            setInternalValid(false);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        runValidation(e.currentTarget.value);
        onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalError('');
        setInternalValid(false);
        if (showCharCount || maxLength !== undefined) setCharCount(e.currentTarget.value.length);
        onChange?.(e);
    };

    const describedBy = [
        hint && !errorMessage ? hintId : '',
        errorMessage ? errorId : '',
    ].filter(Boolean).join(' ') || undefined;

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-foreground">
                    {label}
                    {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
                </label>
            )}

            <input
                ref={ref}
                id={id}
                required={required}
                minLength={minLength}
                maxLength={maxLength}
                aria-invalid={!!errorMessage}
                aria-describedby={describedBy}
                className={cn(inputVariants({ size, state }), className)}
                onBlur={handleBlur}
                onChange={handleChange}
                {...rest}
            />

            <div className="flex justify-between items-start gap-2 min-h-4">
                {errorMessage ? (
                    <p id={errorId} role="alert" className="text-xs text-red-500">
                        {errorMessage}
                    </p>
                ) : hint ? (
                    <p id={hintId} className="text-xs text-muted">
                        {hint}
                    </p>
                ) : (
                    <span />
                )}

                {(showCharCount || maxLength !== undefined) && (
                    <span
                        className={cn(
                            'text-xs shrink-0',
                            charCount === maxLength ? 'text-red-500' : 'text-muted-foreground'
                        )}
                    >
                        {charCount}{maxLength !== undefined ? `/${maxLength}` : ''}
                    </span>
                )}
            </div>
        </div>
    );
});
