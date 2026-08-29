"use client";

import { AdminGate } from "@/components/admin/AdminGate";
import { DataTable } from "@/components/admin/DataTable";

export default function AdminBusinessPage() {
  return (
    <AdminGate>
      <DataTable type="hiring" title="Business" />
    </AdminGate>
  );
}