"use client";

import { useState } from "react";
import { SupplierService } from "@/services/supplier";
import { useRouter } from "next/navigation";

export default function CreateSupplierPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  const submit = async () => {
    await SupplierService.create({ suppliername: name });
    router.push("/suppliers");
  };

  return (
    <div>
      <h1>Create Supplier</h1>

      <input
        placeholder="Supplier Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={submit}>Save</button>
    </div>
  );
}
