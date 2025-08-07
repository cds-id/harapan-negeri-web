import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageBlankProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

const PageBlank = ({ children, title, description, className = "" }: PageBlankProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className={`py-12 ${className}`}>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {title && (
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {title}
              </h1>
              {description && (
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageBlank;