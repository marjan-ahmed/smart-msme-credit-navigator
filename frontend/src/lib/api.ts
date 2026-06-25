const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Invalid email or password");
  return res.json();
}

export async function signupUser(name: string, email: string, password: string, type: string) {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, type }),
  });
  if (!res.ok) throw new Error("Signup failed");
  return res.json();
}

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}

export async function getScore(fileId: string) {
  const res = await fetch(`${API_URL}/api/score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileId }),
  });
  if (!res.ok) throw new Error("Scoring failed");
  return res.json();
}

export async function getTransactions() {
  const res = await fetch(`${API_URL}/api/transactions`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
}
