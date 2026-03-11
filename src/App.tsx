import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PrioritiesProvider } from "@/contexts/PrioritiesContext";
import Index from "./pages/Index.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Priorities from "./pages/Priorities.tsx";
import HowItWorks from "./pages/HowItWorks.tsx";
import Actions from "./pages/Actions.tsx";
import Present from "./pages/Present.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PrioritiesProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/priorities" element={<Priorities />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/actions" element={<Actions />} />
            <Route path="/present" element={<Present />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PrioritiesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
