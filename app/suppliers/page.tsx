"use client";

import { useEffect, useState } from "react";
import { Supplier } from "@/types/supplier";
import { SupplierService } from "@/services/supplier";
import Link from "next/link";

export default function SupplierPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    SupplierService.getAll().then(setSuppliers);
  }, []);

  return (
    <div>
      <h1>Supplier List</h1>

      <Link href="/suppliers/create">➕ Add Supplier</Link>

      <table border={1} cellPadding={6} style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Supplier Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s.supplierpk}>
              <td>{s.supplierpk}</td>
              <td>{s.suppliername}</td>
              <td>
                <Link href={`/suppliers/edit/${s.supplierpk}`}>Edit</Link> |{" "}
                <button
                  onClick={() => {
                    if (confirm("Delete?"))
                      SupplierService.delete(Number(s.supplierpk)).then(() =>
                        setSuppliers((prev) =>
                          prev.filter((x) => x.supplierpk !== s.supplierpk)
                        )
                      );
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
