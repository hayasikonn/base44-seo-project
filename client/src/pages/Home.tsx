import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Lock, Zap } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Home Page - SEO Optimized
 * Design Philosophy: Modern Tech-Forward Minimalism
 * - Dark navy background with cyan accents
 * - Poppins for headings, Inter for body
 * - Non-symmetric layout with alternating sections
 * - Data flow visualization and geometric accents
 */

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-bold text-lg">Base44</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm hover:text-accent transition-colors">
              Features
            </a>
            <a href="#benefits" className="text-sm hover:text-accent transition-colors">
              Benefits
            </a>
            <a href="#contact" className="text-sm hover:text-accent transition-colors">
              Contact
            </a>
          </div>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/hero-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.6,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-1" />

        {/* Content */}
        <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
              <span className="text-sm text-accent font-medium">Advanced Data Solutions</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Transform Your Data with{" "}
              <span className="text-accent">Base44</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              Professional Base64 encoding and advanced data transformation solutions for modern businesses. Secure, efficient, and scalable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-accent/50 hover:bg-accent/10"
              >
                View Documentation
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/50 border-2 border-background"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Trusted by 500+ companies worldwide
              </p>
            </div>
          </div>

          {/* Right side visual element */}
          <div className="relative h-96 md:h-full hidden md:block">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "url('/images/tech-pattern.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for professional data encoding and transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "Optimized algorithms for high-performance data processing at scale",
              },
              {
                icon: Lock,
                title: "Enterprise Security",
                description:
                  "Military-grade encryption and compliance with international standards",
              },
              {
                icon: Code2,
                title: "Developer Friendly",
                description:
                  "Simple APIs and comprehensive documentation for quick integration",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-lg border border-border hover:border-accent/50 bg-card/50 hover:bg-card transition-all duration-300 transform hover:scale-105"
              >
                <div className="mb-4 inline-block p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/images/feature-section-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">
                Why Choose Base44?
              </h2>

              <div className="space-y-4">
                {[
                  "Proven reliability with 99.99% uptime SLA",
                  "24/7 dedicated support team",
                  "Seamless integration with existing systems",
                  "Scalable infrastructure for growing businesses",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <p className="text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>

              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground mt-4">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="relative h-96 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg border border-accent/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-accent mb-2">500+</div>
                <p className="text-muted-foreground">Companies Trust Base44</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent/10" />

        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of companies using Base44 for their data transformation needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Start Your Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-accent/50 hover:bg-accent/10"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-accent-foreground" />
                </div>
                <span className="font-bold">Base44</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Advanced data encoding solutions for modern businesses.
              </p>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Security", "Roadmap"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Resources",
                links: ["Documentation", "API Reference", "Community", "Support"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2026 Base44. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Styles for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
