import { mapRowToSubscription, type SubscriptionRow } from '@/lib/map-subscription';
import type { Subscription } from '@/types/types';
import { supabaseBrowserClient } from '@/utils/supabase/client';

export async function fetchSubscriptions(): Promise<{
  data: Subscription[] | null;
  error: Error | null;
}> {
  const { data: rows, error } = await supabaseBrowserClient
    .from('subscriptions')
    .select('*')
    .order('renewal_date', { ascending: true });

  if (error) {
    return { data: null, error: new Error(error.message) };
  }

  return {
    data: (rows as SubscriptionRow[]).map(mapRowToSubscription),
    error: null,
  };
}

export async function createSubscription(
  userId: string,
  input: {
    name: string;
    category: Subscription['category'];
    monthlyCost: number;
    usageHours: number;
    renewalDate: string;
    logo: string;
    color: string;
  },
): Promise<{ data: Subscription | null; error: Error | null }> {
  const { data, error } = await supabaseBrowserClient
    .from('subscriptions')
    .insert({
      user_id: userId,
      name: input.name,
      category: input.category,
      monthly_cost: input.monthlyCost,
      usage_hours: input.usageHours,
      renewal_date: input.renewalDate,
      logo: input.logo,
      color: input.color,
    })
    .select()
    .single();

  if (error) {
    return { data: null, error: new Error(error.message) };
  }

  return { data: mapRowToSubscription(data as SubscriptionRow), error: null };
}

export async function updateSubscription(
  id: string,
  patch: Partial<{
    name: string;
    category: Subscription['category'];
    monthlyCost: number;
    usageHours: number;
    renewalDate: string;
    logo: string;
    color: string;
  }>,
): Promise<{ data: Subscription | null; error: Error | null }> {
  const row: Record<string, string | number> = {};
  if (patch.name !== undefined) row.name = patch.name;
  if (patch.category !== undefined) row.category = patch.category;
  if (patch.monthlyCost !== undefined) row.monthly_cost = patch.monthlyCost;
  if (patch.usageHours !== undefined) row.usage_hours = patch.usageHours;
  if (patch.renewalDate !== undefined) row.renewal_date = patch.renewalDate;
  if (patch.logo !== undefined) row.logo = patch.logo;
  if (patch.color !== undefined) row.color = patch.color;
  row.updated_at = new Date().toISOString();

  const { data, error } = await supabaseBrowserClient
    .from('subscriptions')
    .update(row)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { data: null, error: new Error(error.message) };
  }

  return { data: mapRowToSubscription(data as SubscriptionRow), error: null };
}

export async function deleteSubscription(
  id: string,
): Promise<{ error: Error | null }> {
  const { error } = await supabaseBrowserClient
    .from('subscriptions')
    .delete()
    .eq('id', id);

  if (error) {
    return { error: new Error(error.message) };
  }
  return { error: null };
}
