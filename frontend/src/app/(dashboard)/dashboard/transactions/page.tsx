"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Filter, Search } from "lucide-react";

const transactions = [
  {
    id: 1,
    description: "WhatsApp Invoice - Supplier Payment",
    amount: "-PKR 45,000",
    date: "2 hours ago",
    type: "expense",
    source: "WhatsApp",
  },
  {
    id: 2,
    description: "Customer Payment - Cash",
    amount: "+PKR 120,000",
    date: "5 hours ago",
    type: "income",
    source: "Receipt",
  },
  {
    id: 3,
    description: "Utility Bill Payment",
    amount: "-PKR 8,500",
    date: "Yesterday",
    type: "expense",
    source: "Bank Statement",
  },
  {
    id: 4,
    description: "Monthly Sales Revenue",
    amount: "+PKR 450,000",
    date: "Yesterday",
    type: "income",
    source: "Excel",
  },
  {
    id: 5,
    description: "Inventory Purchase",
    amount: "-PKR 85,000",
    date: "2 days ago",
    type: "expense",
    source: "WhatsApp",
  },
  {
    id: 6,
    description: "Customer Payment - Online",
    amount: "+PKR 67,000",
    date: "3 days ago",
    type: "income",
    source: "Bank Statement",
  },
];

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-ink">
            Transactions
          </h1>
          <p className="text-muted text-sm mt-1">
            All extracted transactions from your uploaded data.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-slate-dark rounded-lg text-sm font-medium text-ink hover:bg-slate transition-colors self-start">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-surface border border-slate-dark rounded-lg px-4 py-2.5">
        <Search className="w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Search transactions..."
          className="bg-transparent text-sm text-ink placeholder-muted focus:outline-none w-full"
        />
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block bg-surface rounded-xl border border-slate-dark overflow-hidden">
        <div className="p-4 border-b border-slate-dark bg-slate/50">
          <div className="grid grid-cols-12 gap-4 text-xs font-medium text-muted">
            <div className="col-span-5">Description</div>
            <div className="col-span-2">Source</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-3 text-right">Amount</div>
          </div>
        </div>
        <div className="divide-y divide-slate-dark">
          {transactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 hover:bg-slate/30 transition-colors"
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5 flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      tx.type === "income" ? "bg-teal/10" : "bg-coral/10"
                    }`}
                  >
                    {tx.type === "income" ? (
                      <ArrowUpRight className="w-4 h-4 text-teal" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-coral" />
                    )}
                  </div>
                  <span className="text-sm text-ink truncate">{tx.description}</span>
                </div>
                <div className="col-span-2">
                  <span className="px-2 py-1 bg-slate rounded text-[10px] font-medium text-muted">
                    {tx.source}
                  </span>
                </div>
                <div className="col-span-2 text-xs text-muted">{tx.date}</div>
                <div
                  className={`col-span-3 text-right font-mono text-sm font-semibold ${
                    tx.type === "income" ? "text-teal" : "text-ink"
                  }`}
                >
                  {tx.amount}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-3">
        {transactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-surface rounded-xl border border-slate-dark p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    tx.type === "income" ? "bg-teal/10" : "bg-coral/10"
                  }`}
                >
                  {tx.type === "income" ? (
                    <ArrowUpRight className="w-5 h-5 text-teal" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-coral" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{tx.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-slate rounded text-[10px] font-medium text-muted">
                      {tx.source}
                    </span>
                    <span className="text-[11px] text-muted">{tx.date}</span>
                  </div>
                </div>
              </div>
              <span
                className={`font-mono text-sm font-semibold whitespace-nowrap ${
                  tx.type === "income" ? "text-teal" : "text-ink"
                }`}
              >
                {tx.amount}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
