"use client";

import { AdminGate } from "@/components/admin/AdminGate";
import { DataTable } from "@/components/admin/DataTable";

export default function AdminTalentPage() {
  return (
    <AdminGate>
      <DataTable type="talent" title="Talent" />
    </AdminGate>
  );
}