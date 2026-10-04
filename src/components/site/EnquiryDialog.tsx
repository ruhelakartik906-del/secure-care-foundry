import { createContext, useContext, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EnquiryForm } from "./EnquiryForm";

const Ctx = createContext<{ open: (product?: string) => void }>({ open: () => {} });
export const useEnquiry = () => useContext(Ctx);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; product: string; key: number }>({ open: false, product: "", key: 0 });
  return (
    <Ctx.Provider value={{ open: (product = "") => setState((s) => ({ open: true, product, key: s.key + 1 })) }}>
      {children}
      <Dialog open={state.open} onOpenChange={(o) => setState((s) => ({ ...s, open: o }))}>
        <DialogContent className="max-h-[92vh] overflow-y-auto rounded-sm sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Request a Quote</DialogTitle>
            <DialogDescription>Share your requirement and our project team will get back to you.</DialogDescription>
          </DialogHeader>
          <EnquiryForm key={state.key} source="quote" defaultProduct={state.product} />
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}
