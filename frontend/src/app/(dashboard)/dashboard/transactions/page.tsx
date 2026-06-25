"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Filter, Search } from "lucide-react";
import { getTransactions } from "@/lib/api";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: string;
  category: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTransactions()
      .then((data) => setTransactions(data.transactions || []))
      .catch(() => setTransactions([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = transactions.filter((t) =>
    t.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-ink">Transactions</h1>
          <p className="text-muted text-sm mt-1">All extracted transactions from your uploaded data.</p>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-surface border border-slate-dark rounded-lg px-4 py-2.5">
        <Search className="w-4 h-4 text-muted" />
        <input type="text" placeholder="Search transactions..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm text-ink placeholder-muted focus:outline-none w-full" />
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted">Loading transactions...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted">
          <p className="text-base font-medium text-ink mb-1">No transactions yet</p>
          <p className="text-sm">Upload a CSV or Excel file to see transactions here.</p>
        </div>
      ) : (
        <div className="bg-surface rounded-xl border border-slate-dark overflow-hidden">
          <div className="p-4 border-b border-slate-dark bg-slate/50">
            <div className="grid grid-cols-12 gap-4 text-xs font-medium text-muted">
              <div className="col-span-5">Description</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-3 text-right">Amount</div>
            </div>
          </div>
          <div className="divide-y divide-slate-dark">
            {filtered.map((tx, index) => (
              <motion.div key={tx.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="p-4 hover:bg-slate/30 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === "income" ? "bg-teal/10" : "bg-coral/10"}`}>
                      {tx.type === "income" ? <ArrowUpRight className="w-4 h-4 text-teal" /> : <ArrowDownRight className="w-4 h-4 text-coral" />}
                    </div>
                    <span className="text-sm text-ink truncate">{tx.description}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="px-2 py-1 bg-slate rounded text-[10px] font-medium text-muted">{tx.category || "General"}</span>
                  </div>
                  <div className="col-span-2 text-xs text-muted">{tx.date}</div>
                  <div className={`col-span-3 text-right font-mono text-sm font-semibold ${tx.type === "income" ? "text-teal" : "text-ink"}`}>
                    {tx.type === "income" ? "+" : "-"}PKR {Number(tx.amount).toLocaleString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
