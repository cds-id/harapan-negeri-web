import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Layout from "./components/Layout";
import LoaderWrapper from "./components/LoaderWrapper";
import RouteLoader from "./components/RouteLoader";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Events from "./pages/Events";

import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Donate from "./pages/Donate";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNews from "./pages/admin/AdminNews";
import AdminPrograms from "./pages/admin/AdminPrograms";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminCampaigns from "./pages/admin/AdminCampaigns";
import AdminDonations from "./pages/admin/AdminDonations";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminPartners from "./pages/admin/AdminPartners";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminNewsletter from "./pages/admin/AdminNewsletter";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <LoaderWrapper>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteLoader>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/programs" element={<Layout><Programs /></Layout>} />
                <Route path="/donate" element={<Layout><Donate /></Layout>} />
                <Route path="/events" element={<Layout><Events /></Layout>} />
                
                <Route path="/news" element={<Layout><News /></Layout>} />
                <Route path="/news/:slug" element={<Layout><NewsDetail /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route
                  path="/admin/donations"
                  element={
                    <ProtectedRoute>
                      <AdminLayout><AdminDonations /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout><AdminDashboard /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/news"
                  element={
                    <ProtectedRoute>
                      <AdminLayout><AdminNews /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/programs"
                  element={
                    <ProtectedRoute>
                      <AdminLayout><AdminPrograms /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/events"
                  element={
                    <ProtectedRoute>
                      <AdminLayout><AdminEvents /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/campaigns"
                  element={
                    <ProtectedRoute>
                      <AdminLayout><AdminCampaigns /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/gallery"
                  element={
                    <ProtectedRoute>
                      <AdminLayout><AdminGallery /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/partners"
                  element={
                    <ProtectedRoute>
                      <AdminLayout><AdminPartners /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/testimonials"
                  element={
                    <ProtectedRoute>
                      <AdminLayout><AdminTestimonials /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/messages"
                  element={
                    <ProtectedRoute>
                      <AdminLayout><AdminMessages /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/newsletter"
                  element={
                    <ProtectedRoute>
                      <AdminLayout><AdminNewsletter /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <ProtectedRoute>
                      <AdminLayout><AdminSettings /></AdminLayout>
                    </ProtectedRoute>
                  }
                />

                {/* 404 */}
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </RouteLoader>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </LoaderWrapper>
);

export default App;
