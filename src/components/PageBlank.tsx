// import Footer from "@/components/Footer";

interface PageBlankProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  backgroundClassName?: string;
  containerClassName?: string;
  noContainer?: boolean;
  noPadding?: boolean;
  titleClassName?: string;
  descriptionClassName?: string;
}

const PageBlank = ({
  children,
  title,
  description,
  className = "",
  backgroundClassName = "min-h-screen bg-background",
  containerClassName = "container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  noContainer = false,
  noPadding = false,
  titleClassName = "text-4xl md:text-5xl font-bold text-foreground mb-4",
  descriptionClassName = "text-xl text-muted-foreground max-w-3xl mx-auto"
}: PageBlankProps) => {
  const mainClassName = noPadding ? className : `py-12 ${className}`;

  const content = (
    <>
      {title && (
        <div className="text-center mb-12">
          <h1 className={titleClassName}>
            {title}
          </h1>
          {description && (
            <p className={descriptionClassName}>
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </>
  );

  return (
    <div className={backgroundClassName}>
      {/*<Header />*/}
      <main className={mainClassName}>
        {noContainer ? content : (
          <div className={containerClassName}>
            {content}
          </div>
        )}
      </main>
      {/*<Footer />*/}
    </div>
  );
};

export default PageBlank;
