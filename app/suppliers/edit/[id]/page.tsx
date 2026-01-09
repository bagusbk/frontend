"use client";

import { useEffect, useState } from "react";
import { SupplierService } from "@/services/supplier";
import { useParams, useRouter } from "next/navigation";

export default function EditSupplierPage() {
  const router = useRouter();
  const { id } = useParams();
  const [name, setName] = useState("");

  useEffect(() => {
    SupplierService.getById(Number(id)).then((data) =>
      setName(data.suppliername)
    );
  }, [id]);

  const submit = async () => {
    await SupplierService.update(Number(id), { suppliername: name });
    router.push("/suppliers");
  };

  return (
    <div>
      <h1>Edit Supplier</h1>

      <input value={name} onChange={(e) => setName(e.target.value)} />

      <button onClick={submit}>Update</button>
    </div>
  );
}
