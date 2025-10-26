import { ReactNode } from "react";

export const FilterBarWrapper = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center gap-2 h-12 min-h-[3rem] py-1"> 
    {children}
  </div>
);