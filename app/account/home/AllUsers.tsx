"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ArrowDown, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Role } from "@prisma/client";

type Role = "Customer" | "Artist" | "Admin";

type UserRow = {
  id: string;
  name: string;
  email: string;
  address?: string;
  landmark?: string;
  city?: string;
  state?: string;
  country?: string;
  role: Role;
  isApproved: boolean;
  approvedAt?: string | Date | null;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
  verifiedAt?: string | Date | null;
};

type ChipFilter = "pendingApproval" | "pendingVerification" | "total";

export default function AllUsers({ allUsers }: { allUsers: UserRow[] }) {
  const [rows, setRows] = useState<UserRow[]>(Array.isArray(allUsers) ? allUsers : []);
  useEffect(() => setRows(Array.isArray(allUsers) ? allUsers : []), [allUsers]);

  // chips
  const [activeFilter, setActiveFilter] = useState<ChipFilter>("pendingApproval");

  const pendingApproval = useMemo(() => rows.filter(u => !u.isApproved).length, [rows]);
  const pendingVerification = useMemo(() => rows.filter(u => !u.verifiedAt).length, [rows]);
  const total = rows.length;

  // sort config: always descending
  const [sortKey, setSortKey] = useState<keyof UserRow | "verifiedAt" | "approvedAt" | "createdAt" | "updatedAt">("createdAt");
  const sortDesc = true; // locked to desc

  const handleSort = (key: typeof sortKey) => {
    setSortKey(key); // always desc
  };

  // filter first, then sort (always desc)
  const filtered = useMemo(() => {
    if (activeFilter === "pendingApproval") return rows.filter(r => !r.isApproved);
    if (activeFilter === "pendingVerification") return rows.filter(r => !r.verifiedAt);
    return rows;
  }, [rows, activeFilter]);

  const sortedUsers = useMemo(() => {
    const toTime = (v: any) =>
      v instanceof Date
        ? v.getTime()
        : typeof v === "string" && !Number.isNaN(Date.parse(v))
          ? new Date(v).getTime()
          : typeof v === "boolean"
            ? Number(v)
            : v;

    return [...filtered].sort((a, b) => {
      const va = toTime((a as any)[sortKey]);
      const vb = toTime((b as any)[sortKey]);
      if (va < vb) return sortDesc ? 1 : -1;
      if (va > vb) return sortDesc ? -1 : 1;
      return 0;
    });
  }, [filtered, sortKey, sortDesc]);

  // -------- Edit modal state --------
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<UserRow | null>(null);
  const [form, setForm] = useState<Partial<UserRow>>({});

  const beginEdit = (u: UserRow) => {
    setEditing(u);
    setForm({
      ...u,
      address: u.address ?? "",
      landmark: u.landmark ?? "",
      city: u.city ?? "",
      state: u.state ?? "",
      country: u.country ?? "",
    });
    setOpen(true);
  };

  const onChange = (key: keyof UserRow, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  const saveEdit = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/users/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          role: form.role,
          isApproved: form.isApproved,
          address: form.address,
          landmark: form.landmark,
          city: form.city,
          state: form.state,
          country: form.country,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        alert(j.error || "Failed to update user");
        return;
      }

      const udpatedUsers = await fetch("/api/users", { cache: "no-store" });
      if (!udpatedUsers.ok) throw new Error("Failed to fetch users");
      const data = await udpatedUsers.json();
      setRows(Array.isArray(data) ? data : []);

      setOpen(false);
      setEditing(null);
    } catch (e) {
      console.error(e);
      alert("Something went wrong while saving.");
    } finally {
      setSaving(false);
    }
  };

  const deleteUser = async (u: UserRow) => {
    if (!confirm(`Delete user "${u.name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/users/${u.id}`, { method: "DELETE" });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        alert(j.error || "Failed to delete user");
        return;
      }
      setRows(prev => prev.filter(r => r.id !== u.id));
    } catch (e) {
      console.error(e);
      alert("Something went wrong while deleting.");
    }
  };

  const headerCols: { key: typeof sortKey; label: string }[] = [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "verifiedAt", label: "Verified At" },
    { key: "address", label: "Address" },
    { key: "landmark", label: "Landmark" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "country", label: "Country" },
    { key: "role", label: "Role" },
    { key: "isApproved", label: "Approved" },
    { key: "approvedAt", label: "Approved At" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
  ];

  const Chip = ({
    label,
    count,
    active,
    onClick,
  }: {
    label: string;
    count: number;
    active: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm border transition",
        active
          ? "bg-custom-amber/10 border-custom-amber text-custom-paynes-gray"
          : "bg-white border-slate-200 hover:border-slate-300 text-slate-600",
      ].join(" ")}
    >
      <span className="font-medium">{label}</span>
      <span className={["rounded-full px-2 py-0.5 text-xs",
        active ? "bg-custom-amber text-white" : "bg-slate-100 text-slate-700"].join(" ")}>
        {count}
      </span>
    </button>
  );

  return (
    <div className="space-y-4">
      {/* Inline chips */}
      <div className="flex flex-wrap items-center gap-2">
        <Chip
          label="Pending Approval"
          count={pendingApproval}
          active={activeFilter === "pendingApproval"}
          onClick={() => {
            setActiveFilter("pendingApproval");
            setSortKey("createdAt");
          }}
        />
        <Chip
          label="Pending Verification"
          count={pendingVerification}
          active={activeFilter === "pendingVerification"}
          onClick={() => {
            setActiveFilter("pendingVerification");
            setSortKey("createdAt");
          }}
        />
        <Chip
          label="Total"
          count={total}
          active={activeFilter === "total"}
          onClick={() => {
            setActiveFilter("total");
            setSortKey("createdAt");
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border bg-white">
        {sortedUsers.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                {headerCols.map(col => (
                  <TableHead
                    key={col.key as string}
                    className="cursor-pointer select-none"
                    onClick={() => handleSort(col.key)}
                    title="Click to sort (descending)"
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {/* always desc indicator */}
                      {sortKey === col.key && <ArrowDown size={14} />}
                    </div>
                  </TableHead>
                ))}
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedUsers.map(user => (
                <TableRow key={user.id} className="duration-300 hover:bg-gray-50 text-custom-paynes-gray">
                  <TableCell className="whitespace-nowrap">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.verifiedAt ? new Date(user.verifiedAt).toLocaleString() : "-"}</TableCell>
                  <TableCell className="whitespace-normal min-w-xs break-words">{user.address || "-"}</TableCell>
                  <TableCell className="whitespace-normal min-w-2xs break-words">{user.landmark || "-"}</TableCell>
                  <TableCell>{user.city || "-"}</TableCell>
                  <TableCell>{user.state || "-"}</TableCell>
                  <TableCell>{user.country || "-"}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.isApproved ? "Yes" : "No"}</TableCell>
                  <TableCell>{user.approvedAt ? new Date(user.approvedAt).toLocaleString() : "-"}</TableCell>
                  <TableCell>{user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}</TableCell>
                  <TableCell>{user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "-"}</TableCell>

                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8 px-2" onClick={() => beginEdit(user)}>
                        <Pencil className="mr-1 h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" className="h-8 px-2" onClick={() => deleteUser(user)}>
                        <Trash2 className="mr-1 h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="p-4">No users to display.</p>
        )}
      </div>

      {/* Edit Modal */}
      <Dialog open={open} onOpenChange={(v) => { if (!v) setEditing(null); setOpen(v); }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
              <div className="space-y-1">
                <label className="text-sm text-slate-600">Name</label>
                <input
                  className="w-full rounded-md border p-2"
                  value={form.name ?? ""}
                  onChange={(e) => onChange("name", e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-slate-600">Email</label>
                <input className="w-full rounded-md border p-2 bg-gray-100" value={editing.email} disabled />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-slate-600">Role</label>
                <Select value={(form.role as Role) ?? editing.role} onValueChange={(v) => onChange("role", v as Role)}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Role.Customer}>{Role.Customer}</SelectItem>
                    <SelectItem value={Role.Artist}>{Role.Artist}</SelectItem>
                    <SelectItem value={Role.Admin}>{Role.Admin}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-slate-600">Approved</label>
                <Select
                  value={String((form.isApproved ?? editing.isApproved) ? "true" : "false")}
                  onValueChange={(v) => onChange("isApproved", v === "true")}
                >
                  <SelectTrigger className="w-full"><SelectValue placeholder="Approval status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm text-slate-600">Address</label>
                <textarea className="w-full rounded-md border p-2" rows={2} value={form.address ?? ""} onChange={(e) => onChange("address", e.target.value)} />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-slate-600">Landmark</label>
                <input className="w-full rounded-md border p-2" value={form.landmark ?? ""} onChange={(e) => onChange("landmark", e.target.value)} />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-slate-600">City</label>
                <input className="w-full rounded-md border p-2" value={form.city ?? ""} onChange={(e) => onChange("city", e.target.value)} />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-slate-600">State</label>
                <input className="w-full rounded-md border p-2" value={form.state ?? ""} onChange={(e) => onChange("state", e.target.value)} />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-slate-600">Country</label>
                <input className="w-full rounded-md border p-2" value={form.country ?? ""} onChange={(e) => onChange("country", e.target.value)} />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={saveEdit} disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
