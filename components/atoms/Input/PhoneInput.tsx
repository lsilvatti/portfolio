'use client';

import { useId, useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COUNTRY_CODES, type CountryCode } from './countryCodes';
import { validatePhone } from './formValidations';
import type { InputState } from './Input';

const WHITE_FLAG = '🏳️';

const borderClass: Record<InputState, string> = {
    default: 'border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
    error:   'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20',
    success: 'border-green-500 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20',
};

type LocalizedCountry = CountryCode & { name: string };

function filterCountries(countries: LocalizedCountry[], query: string): LocalizedCountry[] {
    const q = query.toLowerCase().trim();
    if (!q) return countries;
    return countries.filter(
        c =>
            c.name.toLowerCase().includes(q) ||
            c.code.toLowerCase().includes(q) ||
            c.dial.includes(q)
    );
}

export interface PhoneValue {
    countryCode: string;
    number: string;
}

export interface PhoneInputProps {
    label?: string;
    hint?: string;
    /** External controlled error message (overrides internal validation). */
    error?: string;
    /** Force success state from parent. */
    success?: boolean;
    required?: boolean;
    disabled?: boolean;
    defaultCountryCode?: string;
    /** Called whenever the country code or number changes. */
    onValueChange?: (value: PhoneValue) => void;
    id?: string;
    name?: string;
    className?: string;
}

export function PhoneInput({
    label,
    hint,
    error: externalError,
    success: externalSuccess,
    required,
    disabled,
    defaultCountryCode = 'US',
    onValueChange,
    id: externalId,
    name,
    className,
}: PhoneInputProps) {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const hintId = `${id}-hint`;
    const errorId = `${id}-error`;

    const tPhone = useTranslations('components.phoneInput');
    const tCountries = useTranslations('components.phoneInput.countries');

    const localizedCountries: LocalizedCountry[] = COUNTRY_CODES.map(c => ({
        ...c,
        name: tCountries(c.code),
    }));

    const [selectedCode, setSelectedCode] = useState(defaultCountryCode);
    const [customDial, setCustomDial] = useState<string | null>(null);
    const selectedCountry = localizedCountries.find(c => c.code === selectedCode);

    const effectiveDial = customDial ?? selectedCountry?.dial ?? localizedCountries[0]?.dial ?? '';
    const effectiveFlag = customDial ? WHITE_FLAG : (selectedCountry?.flag ?? localizedCountries[0]?.flag ?? WHITE_FLAG);

    const [number, setNumber] = useState('');
    const [internalError, setInternalError] = useState('');
    const [internalValid, setInternalValid] = useState(false);

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const filtered = filterCountries(localizedCountries, search);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const errorMessage = externalError ?? internalError;
    const isSuccess = externalSuccess || (!errorMessage && internalValid);
    const state: InputState = errorMessage ? 'error' : isSuccess ? 'success' : 'default';

    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
                setSearch('');
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    useEffect(() => {
        if (open) {
            setActiveIndex(0);
            setTimeout(() => searchRef.current?.focus(), 0);
        }
    }, [open]);

    const selectCountry = useCallback((country: LocalizedCountry) => {
        setSelectedCode(country.code);
        setCustomDial(null);
        setOpen(false);
        setSearch('');
        onValueChange?.({ countryCode: country.dial, number });
    }, [number, onValueChange]);

    /** Normalize a raw search string into a dial code (ensures leading +). */
    const normalizeDial = (raw: string) => {
        const stripped = raw.replace(/[^\d+]/g, '');
        return stripped.startsWith('+') ? stripped : `+${stripped}`;
    };

    const selectCustomDial = useCallback((raw: string) => {
        const dial = normalizeDial(raw);
        setCustomDial(dial);
        setSelectedCode('');
        setOpen(false);
        setSearch('');
        onValueChange?.({ countryCode: dial, number });
    }, [number, onValueChange]);

    const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true); }
        if (e.key === 'Escape') setOpen(false);
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') { setOpen(false); setSearch(''); }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(i => Math.min(i + 1, filtered.length - 1));
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(i => Math.max(i - 1, 0));
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            if (filtered[activeIndex]) {
                selectCountry(filtered[activeIndex]);
            } else if (filtered.length === 0 && search.trim()) {
                selectCustomDial(search.trim());
            }
        }
    };

    useEffect(() => {
        if (!open || !listRef.current) return;
        const item = listRef.current.children[activeIndex] as HTMLElement | undefined;
        item?.scrollIntoView({ block: 'nearest' });
    }, [activeIndex, open]);

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^\d\s\-()+.]/g, '');
        setNumber(val);
        setInternalError('');
        setInternalValid(false);
        onValueChange?.({ countryCode: effectiveDial, number: val });
    };

    const handleNumberBlur = () => {
        if (!required && !number.trim()) return;
        const result = validatePhone(number);
        if (result.valid) {
            setInternalError('');
            setInternalValid(true);
        } else {
            setInternalError(result.message);
            setInternalValid(false);
        }
    };

    const describedBy = [
        hint && !errorMessage ? hintId : '',
        errorMessage ? errorId : '',
    ].filter(Boolean).join(' ') || undefined;

    return (
        <div className={cn('flex flex-col gap-1.5 w-full', className)}>
            {label && (
                <label htmlFor={`${id}-number`} className="text-sm font-medium text-foreground">
                    {label}
                    {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
                </label>
            )}

            <div
                ref={wrapperRef}
                className={cn(
                    'relative flex rounded-lg border bg-surface overflow-visible',
                    'transition-colors duration-200',
                    borderClass[state],
                    disabled && 'opacity-50 pointer-events-none'
                )}
            >
                <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-label={tPhone('selectCountryLabel')}
                    onClick={() => setOpen(o => !o)}
                    onKeyDown={handleTriggerKeyDown}
                    className={cn(
                        'flex items-center gap-1.5 shrink-0',
                        'border-r border-border h-10 pl-3 pr-2',
                        'text-sm text-foreground bg-transparent',
                        'hover:bg-surface-hover transition-colors duration-200 outline-none',
                        'focus-visible:bg-surface-hover'
                    )}
                >
                    <span className="text-base leading-none select-none">
                        {effectiveFlag}
                    </span>
                    <span className="tabular-nums text-muted">
                        {effectiveDial || '—'}
                    </span>
                    <ChevronDown
                        size={12}
                        className={cn('text-muted-foreground transition-transform duration-200', open && 'rotate-180')}
                    />
                </button>

                {open && (
                    <div
                        className={cn(
                            'absolute left-0 top-full mt-1 z-50',
                            'w-[min(18rem,calc(100vw-3rem))] rounded-lg border border-border bg-surface shadow-lg',
                            'flex flex-col overflow-hidden',
                        )}
                    >
                        <div className="p-2 border-b border-border">
                            <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-2.5 h-8 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-colors">
                                <span className="text-base leading-none select-none">
                                    {search.trim()
                                        ? (filtered[activeIndex]?.flag ?? WHITE_FLAG)
                                        : effectiveFlag
                                    }
                                </span>
                                <input
                                    ref={searchRef}
                                    type="text"
                                    value={search}
                                    placeholder={tPhone('searchPlaceholder')}
                                    onChange={e => { setSearch(e.target.value); setActiveIndex(0); }}
                                    onKeyDown={handleSearchKeyDown}
                                    className="flex-1 text-sm bg-transparent text-foreground placeholder:text-muted-foreground outline-none min-w-0"
                                    aria-autocomplete="list"
                                    aria-controls={`${id}-listbox`}
                                    aria-activedescendant={filtered[activeIndex] ? `${id}-opt-${filtered[activeIndex].code}` : undefined}
                                />
                            </div>
                        </div>

                        <ul
                            ref={listRef}
                            id={`${id}-listbox`}
                            role="listbox"
                            aria-label={tPhone('countriesListLabel')}
                            className="overflow-y-auto max-h-52 py-1"
                        >
                            {filtered.length === 0 ? (
                                <li
                                    role="option"
                                    aria-selected={false}
                                    onClick={() => search.trim() && selectCustomDial(search.trim())}
                                    className={cn(
                                        'px-3 py-2 text-sm',
                                        search.trim()
                                            ? 'cursor-pointer hover:bg-surface-hover transition-colors text-foreground'
                                            : 'text-muted-foreground cursor-default'
                                    )}
                                >
                                    {search.trim() ? (
                                        <span>
                                            {tPhone('noResults')}{' — '}
                                            <span className="font-medium text-primary">
                                                {normalizeDial(search.trim())}
                                            </span>
                                            {' ✓'}
                                        </span>
                                    ) : (
                                        tPhone('noResults')
                                    )}
                                </li>
                            ) : (
                                filtered.map((c, i) => (
                                    <li
                                        key={c.code}
                                        id={`${id}-opt-${c.code}`}
                                        role="option"
                                        aria-selected={selectedCountry?.code === c.code}
                                        onMouseEnter={() => setActiveIndex(i)}
                                        onClick={() => selectCountry(c)}
                                        className={cn(
                                            'flex items-center gap-2.5 px-3 py-1.5 text-sm cursor-pointer',
                                            'transition-colors duration-100',
                                            i === activeIndex ? 'bg-surface-hover text-foreground' : 'text-foreground',
                                            selectedCountry?.code === c.code && 'text-primary font-medium'
                                        )}
                                    >
                                        <span className="text-base leading-none select-none">{c.flag}</span>
                                        <span className="flex-1 truncate">{c.name}</span>
                                        <span className="tabular-nums text-muted-foreground shrink-0">{c.dial}</span>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                )}

                <input
                    id={`${id}-number`}
                    type="tel"
                    name={name}
                    value={number}
                    required={required}
                    disabled={disabled}
                    placeholder={tPhone('phonePlaceholder')}
                    aria-invalid={!!errorMessage}
                    aria-describedby={describedBy}
                    onChange={handleNumberChange}
                    onBlur={handleNumberBlur}
                    className="flex-1 h-10 px-3.5 text-base bg-transparent text-foreground outline-none placeholder:text-muted-foreground min-w-0"
                />
            </div>

            <div className="min-h-4">
                {errorMessage ? (
                    <p id={errorId} role="alert" className="text-xs text-red-500">
                        {errorMessage}
                    </p>
                ) : hint ? (
                    <p id={hintId} className="text-xs text-muted">
                        {hint}
                    </p>
                ) : null}
            </div>
        </div>
    );
}
