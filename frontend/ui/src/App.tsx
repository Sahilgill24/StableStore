import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import ProviderDashboard from "./pages/provider-dashboard";
import OnBoard from "./pages/on-board";
import NotFound from "./pages/not-found";
import Analytics from "./pages/analytics";
import { Toaster } from "@/components/ui/toaster";
import PrivateRoute from "@/components/dashboard/protected-route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./config";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/onboard" element={<OnBoard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PrivateRoute />}>
                <Route
                  path="/analytics"
                  element={<Analytics />}
                />
                <Route
                  path="/provider-dashboard"
                  element={<ProviderDashboard />}
                />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
            <Toaster />
          </QueryClientProvider>
        </WagmiProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
