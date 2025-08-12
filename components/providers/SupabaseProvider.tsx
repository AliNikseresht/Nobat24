"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/libs/supabaseClient";
import { Session } from "@supabase/supabase-js";

type SupabaseContextType = {
  session: Session | null;
  loading: boolean;
};

const SupabaseContext = createContext<SupabaseContextType>({
  session: null,
  loading: true,
});

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session ?? null);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <SupabaseContext.Provider value={{ session, loading }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabaseAuth() {
  return useContext(SupabaseContext);
}