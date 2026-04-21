import type { Subscription } from '@/types/types';

const CATEGORIES: Subscription['category'][] = [
  'streaming',
  'productivity',
  'education',
  'design',
  'other',
];

function isCategory(v: unknown): v is Subscription['category'] {
  return (
    typeof v === 'string' &&
    CATEGORIES.includes(v as Subscription['category'])
  );
}

export type SubscriptionInput = {
  name: string;
  category: Subscription['category'];
  monthlyCost: number;
  usageHours: number;
  renewalDate: string;
  logo: string;
  color: string;
};

function parseNumber(v: unknown): number | null {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string' && v.trim() !== '') {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

const HEX_RE = /^#([0-9a-fA-F]{6})$/;

export function validateSubscriptionInput(
  body: unknown,
): { ok: true; data: SubscriptionInput } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid form data' };
  }
  const b = body as Record<string, unknown>;

  const name = typeof b.name === 'string' ? b.name.trim() : '';
  if (name.length < 1 || name.length > 120) {
    return { ok: false, error: 'Name must be 1–120 characters' };
  }

  if (!isCategory(b.category)) {
    return { ok: false, error: 'Invalid category' };
  }
  const category = b.category;

  const monthlyCost = parseNumber(b.monthlyCost);
  if (monthlyCost === null || monthlyCost < 0) {
    return { ok: false, error: 'Monthly cost must be a non-negative number (GBP)' };
  }

  const usageHours = parseNumber(b.usageHours);
  if (usageHours === null || usageHours < 0) {
    return { ok: false, error: 'Usage hours must be a non-negative number' };
  }

  const renewalDate =
    typeof b.renewalDate === 'string' ? b.renewalDate.trim() : '';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(renewalDate)) {
    return { ok: false, error: 'Renewal date must be YYYY-MM-DD' };
  }
  const d = new Date(renewalDate + 'T12:00:00');
  if (Number.isNaN(d.getTime())) {
    return { ok: false, error: 'Renewal date is not valid' };
  }

  const logo =
    typeof b.logo === 'string' && b.logo.trim().length > 0
      ? b.logo.trim().slice(0, 8)
      : '📦';

  const color =
    typeof b.color === 'string' && HEX_RE.test(b.color.trim())
      ? b.color.trim()
      : '#6366f1';

  return {
    ok: true,
    data: {
      name,
      category,
      monthlyCost,
      usageHours,
      renewalDate,
      logo,
      color,
    },
  };
}

export function validateSubscriptionPatch(
  body: unknown,
):
  | { ok: true; data: Partial<SubscriptionInput> }
  | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid form data' };
  }
  const b = body as Record<string, unknown>;
  const out: Partial<SubscriptionInput> = {};

  if (b.name !== undefined) {
    const name = typeof b.name === 'string' ? b.name.trim() : '';
    if (name.length < 1 || name.length > 120) {
      return { ok: false, error: 'Name must be 1–120 characters' };
    }
    out.name = name;
  }

  if (b.category !== undefined) {
    if (!isCategory(b.category)) {
      return { ok: false, error: 'Invalid category' };
    }
    out.category = b.category;
  }

  if (b.monthlyCost !== undefined) {
    const monthlyCost = parseNumber(b.monthlyCost);
    if (monthlyCost === null || monthlyCost < 0) {
      return { ok: false, error: 'Monthly cost must be a non-negative number (GBP)' };
    }
    out.monthlyCost = monthlyCost;
  }

  if (b.usageHours !== undefined) {
    const usageHours = parseNumber(b.usageHours);
    if (usageHours === null || usageHours < 0) {
      return { ok: false, error: 'Usage hours must be a non-negative number' };
    }
    out.usageHours = usageHours;
  }

  if (b.renewalDate !== undefined) {
    const renewalDate =
      typeof b.renewalDate === 'string' ? b.renewalDate.trim() : '';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(renewalDate)) {
      return { ok: false, error: 'Renewal date must be YYYY-MM-DD' };
    }
    const d = new Date(renewalDate + 'T12:00:00');
    if (Number.isNaN(d.getTime())) {
      return { ok: false, error: 'Renewal date is not valid' };
    }
    out.renewalDate = renewalDate;
  }

  if (b.logo !== undefined) {
    out.logo =
      typeof b.logo === 'string' && b.logo.trim().length > 0
        ? b.logo.trim().slice(0, 8)
        : '📦';
  }

  if (b.color !== undefined) {
    out.color =
      typeof b.color === 'string' && HEX_RE.test(b.color.trim())
        ? b.color.trim()
        : '#6366f1';
  }

  if (Object.keys(out).length === 0) {
    return { ok: false, error: 'Nothing to update' };
  }

  return { ok: true, data: out };
}
