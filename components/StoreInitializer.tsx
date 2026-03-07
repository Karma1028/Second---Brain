"use client";

import { useEffect, useRef } from 'react';
import { useStore } from '@/hooks/useStore';

export default function StoreInitializer({ children }: { children: React.ReactNode }) {
    const initialized = useRef(false);
    const fetchAllData = useStore(state => state.fetchAllData);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            fetchAllData();
        }
    }, [fetchAllData]);

    return <>{children}</>;
}
