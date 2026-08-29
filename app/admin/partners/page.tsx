"use client";

import { AdminGate } from "@/components/admin/AdminGate";
import { DataTable } from "@/components/admin/DataTable";

export default function AdminPartnersPage() {
  return (
    <AdminGate>
      <DataTable type="partner" title="Partners" />
    </AdminGate>
  );
}