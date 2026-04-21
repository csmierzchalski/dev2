'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  createSubscription,
  deleteSubscription,
  fetchSubscriptions,
  updateSubscription,
} from '@/lib/subscriptions-repo';
import type { Subscription } from '@/types/types';
import { supabaseBrowserClient } from '@/utils/supabase/client';

export function useSubscriptionsQuery() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await fetchSubscriptions();
    if (err) {
      setError(err.message);
      setSubscriptions([]);
    } else {
      setSubscriptions(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const add = useCallback(
    async (input: Parameters<typeof createSubscription>[1]) => {
      const {
        data: { user },
      } = await supabaseBrowserClient.auth.getUser();
      if (!user) {
        return { error: new Error('Not signed in') };
      }
      const result = await createSubscription(user.id, input);
      if (result.error) {
        return { error: result.error };
      }
      await refetch();
      return { error: null };
    },
    [refetch],
  );

  const update = useCallback(
    async (id: string, patch: Parameters<typeof updateSubscription>[1]) => {
      const result = await updateSubscription(id, patch);
      if (result.error) {
        return { error: result.error };
      }
      await refetch();
      return { error: null };
    },
    [refetch],
  );

  const remove = useCallback(
    async (id: string) => {
      const result = await deleteSubscription(id);
      if (result.error) {
        return { error: result.error };
      }
      await refetch();
      return { error: null };
    },
    [refetch],
  );

  return {
    subscriptions,
    loading,
    error,
    refetch,
    add,
    update,
    remove,
  };
}
