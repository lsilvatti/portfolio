'use client';

import { forwardRef, useId, useState, type ComponentPropsWithoutRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { validateText } from './formValidations';
import type { InputState } from './Input';

const textareaVariants = cva(
    [
        'w-full rounded-lg border bg-surface text-foreground',
        'transition-colors duration-200 outline-none resize-y',
        'placeholder:text-muted-foreground',
        'disabled:pointer-events-none disabled:opacity-50',
        'px-3.5 py-2.5 text-base',
        'focus:ring-2',
    ],
    {
        variants: {
            state: {
                default: 'border-border focus:border-primary focus:ring-primary/20',
                error:   'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                success: 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
            },
        },
        defaultVariants: {
            state: 'default',
        },
    }
);

export interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
    label?: string;
    hint?: string;
    /** External controlled error message (overrides internal validation). */
    error?: string;
    /** Force success state from parent. */
    success?: boolean;
    /** Show character counter. Automatically enabled when maxLength is set. */
    showCharCount?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
    {
        label,
        hint,
        error: externalError,
        success: externalSuccess,
        showCharCount,
        className,
        id: externalId,
        required,
        minLength,
        maxLength,
        name,
        rows = 4,
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

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        const result = validateText(e.currentTarget.value, {
            required,
            minLength,
            maxLength,
            label: label ?? name,
        });
        if (result.valid) {
            setInternalError('');
            setInternalValid(true);
        } else {
            setInternalError(result.message);
            setInternalValid(false);
        }
        onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

            <textarea
                ref={ref}
                id={id}
                required={required}
                minLength={minLength}
                maxLength={maxLength}
                rows={rows}
                aria-invalid={!!errorMessage}
                aria-describedby={describedBy}
                className={cn(textareaVariants({ state }), className)}
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
