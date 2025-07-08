import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Download, 
  ChartLine, 
  Code, 
  Calculator, 
  GraduationCap, 
  Building, 
  Trophy, 
  Medal, 
  Star, 
  Menu,
  X
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleDownloadResume = async () => {
    try {
      const response = await fetch("/api/resume");
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Disha_Tulsani_Resume.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      toast({
        title: "Error downloading resume",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      category: "investment-banking",
      title: "AI Marketing Firm M&A Analysis",
      description: "Led comprehensive valuation and due diligence for AI marketing firm acquisition, including DCF modeling, comparable company analysis, and investment memoranda preparation.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      metrics: {
        "Deal Value": "$25M+",
        "Valuation Method": "DCF + Comps",
        "Sector Focus": "AI/Technology"
      },
      tags: ["DCF Modeling", "Due Diligence", "M&A Strategy"]
    },
    {
      id: 2,
      category: "trading",
      title: "Systematic Trading Strategy Development",
      description: "Built and backtested systematic trading strategies focusing on volatility and momentum factors using Python, with comprehensive risk management and portfolio optimization.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      metrics: {
        "Strategy Type": "Vol + Momentum",
        "Sharpe Ratio": "1.8+",
        "Max Drawdown": "-8.5%"
      },
      tags: ["Python", "VaR Modeling", "Backtesting"]
    },
    {
      id: 3,
      category: "product",
      title: "E-commerce Platform Optimization",
      description: "Spearheaded product strategy and optimization initiatives across 5+ product categories, resulting in significant improvements in user engagement and conversion rates.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      metrics: {
        "Engagement Increase": "+20%",
        "Adoption Improvement": "+30%",
        "CPA Reduction": "-18%"
      },
      tags: ["A/B Testing", "UX Research", "KPI Analysis"]
    },
    {
      id: 4,
      category: "investment-banking",
      title: "CFA Research Challenge - Walmart Analysis",
      description: "Led comprehensive equity research on Walmart, issuing BUY recommendation through detailed DCF modeling, competitive analysis, and risk assessment. Achieved 3rd place among regional teams.",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      metrics: {
        "Recommendation": "BUY",
        "Competition Rank": "3rd Place",
        "Valuation Method": "DCF + Multiples"
      },
      tags: ["Equity Research", "Financial Modeling", "Competitive Analysis"]
    }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-elegant z-50">
        <div className="scroll-indicator h-1 bg-primary" style={{ width: `${scrollProgress}%` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-primary font-serif">Disha Tulsani</div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">Home</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">About</a>
              <a href="#projects" className="text-foreground hover:text-primary transition-colors font-medium">Projects</a>
              <a href="#skills" className="text-foreground hover:text-primary transition-colors font-medium">Skills</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">Contact</a>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <a href="#home" className="text-2xl font-medium text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#about" className="text-2xl font-medium text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#projects" className="text-2xl font-medium text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Projects</a>
            <a href="#skills" className="text-2xl font-medium text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Skills</a>
            <a href="#contact" className="text-2xl font-medium text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-white to-accent/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="space-y-8 fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-primary font-serif leading-tight">
                  MBA Finance Professional
                </h1>
                <h2 className="text-2xl lg:text-3xl text-accent font-semibold">
                  Investment Banking • Product Strategy • Trading
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  MBA-trained finance professional with expertise in market risk modeling, derivatives pricing, 
                  and systematic trading strategies. Currently driving deal origination and M&A execution at 
                  Collimation Investment Bank.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="shadow-card hover:shadow-card-hover">
                  <a href="#projects">View Projects</a>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleDownloadResume}
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Download Resume
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <a href="https://linkedin.com/in/dishatulsani" className="text-primary hover:text-accent transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="mailto:Disha.Tulsani@colorado.edu" className="text-primary hover:text-accent transition-colors">
                  <Mail size={24} />
                </a>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground">(720) 333-1564</span>
              </div>
            </div>

            <div className="relative fade-in">
              <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl transform rotate-6"></div>
                <div className="relative bg-white rounded-3xl shadow-elegant p-8 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b593?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800" 
                    alt="Disha Tulsani - Professional Photo" 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold text-primary font-serif mb-4">Professional Background</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Combining rigorous MBA training with hands-on experience across investment banking, 
              product strategy, and quantitative trading.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="card-gradient shadow-card hover:shadow-card-hover transition-all fade-in">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="text-2xl text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary font-serif">Education</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground">Master of Business Administration</h4>
                    <p className="text-primary font-medium">University of Colorado Boulder</p>
                    <p className="text-muted-foreground">Finance Concentration • GPA: 3.6/4.0</p>
                    <p className="text-muted-foreground">May 2025</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Bachelor of Commerce</h4>
                    <p className="text-primary font-medium">University of Wollongong, Dubai</p>
                    <p className="text-muted-foreground">Marketing Concentration • Merit Scholarship</p>
                    <p className="text-muted-foreground">August 2020</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient shadow-card hover:shadow-card-hover transition-all fade-in">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="text-2xl text-accent" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary font-serif">Current Role</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground">Associate</h4>
                    <p className="text-primary font-medium">Collimation Investment Bank</p>
                    <p className="text-muted-foreground">April 2025 - Present</p>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• M&A target screening across AI, healthcare, and tech sectors</li>
                    <li>• DCF modeling and valuation analysis for deal execution</li>
                    <li>• Buy-side due diligence and investment memoranda</li>
                    <li>• Market trend analysis and strategic recommendations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient shadow-card hover:shadow-card-hover transition-all fade-in">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[hsl(var(--success))]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="text-2xl text-[hsl(var(--success))]" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary font-serif">Key Achievements</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Medal className="text-[hsl(var(--success))] mt-1" size={16} />
                    <div>
                      <p className="font-semibold text-foreground">CFA Research Challenge</p>
                      <p className="text-muted-foreground">3rd Place Regional Winner</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="text-[hsl(var(--success))] mt-1" size={16} />
                    <div>
                      <p className="font-semibold text-foreground">Merit Scholarship</p>
                      <p className="text-muted-foreground">CU Boulder & UOW Dubai</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ChartLine className="text-[hsl(var(--success))] mt-1" size={16} />
                    <div>
                      <p className="font-semibold text-foreground">Campaign Performance</p>
                      <p className="text-muted-foreground">35% increase in online sales</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold text-primary font-serif mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Showcasing expertise across Investment Banking, Product Management, and Trading through 
              detailed case studies and measurable outcomes.
            </p>
          </div>

          <div className="flex justify-center mb-12 fade-in">
            <div className="bg-secondary rounded-full p-2 inline-flex gap-2 flex-wrap">
              {[
                { key: "all", label: "All Projects" },
                { key: "investment-banking", label: "Investment Banking" },
                { key: "product", label: "Product Management" },
                { key: "trading", label: "Trading & Analytics" }
              ].map(({ key, label }) => (
                <Button
                  key={key}
                  variant={activeCategory === key ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveCategory(key)}
                  className="rounded-full"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="card-gradient shadow-card hover:shadow-card-hover transition-all group fade-in overflow-hidden">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/60 group-hover:bg-primary/40 transition-colors"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {project.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-primary font-serif mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="space-y-3 mb-6">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-muted-foreground">{key}</span>
                        <span className="font-semibold text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold text-primary font-serif mb-4">Technical Skills & Competencies</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive expertise across financial modeling, trading platforms, programming, 
              and analytical frameworks essential for modern finance professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="card-gradient shadow-card hover:shadow-card-hover transition-all fade-in">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChartLine className="text-2xl text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary font-serif">Trading & Platforms</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { skill: "Bloomberg Terminal", level: 95, proficiency: "Expert" },
                    { skill: "FactSet", level: 85, proficiency: "Advanced" },
                    { skill: "Capital IQ", level: 80, proficiency: "Advanced" }
                  ].map(({ skill, level, proficiency }) => (
                    <div key={skill}>
                      <div className="flex justify-between mb-2">
                        <span className="text-foreground font-medium">{skill}</span>
                        <span className="text-primary font-semibold">{proficiency}</span>
                      </div>
                      <Progress value={level} className="h-2" />
                    </div>
                  ))}
                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground">Also proficient in: E-TRADE, FIX Protocol, Trade Blotter</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient shadow-card hover:shadow-card-hover transition-all fade-in">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="text-2xl text-accent" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary font-serif">Programming & Analytics</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { skill: "Python", level: 90, proficiency: "Advanced" },
                    { skill: "SQL", level: 85, proficiency: "Advanced" },
                    { skill: "Excel Modeling", level: 95, proficiency: "Expert" }
                  ].map(({ skill, level, proficiency }) => (
                    <div key={skill}>
                      <div className="flex justify-between mb-2">
                        <span className="text-foreground font-medium">{skill}</span>
                        <span className="text-accent font-semibold">{proficiency}</span>
                      </div>
                      <Progress value={level} className="h-2" />
                    </div>
                  ))}
                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground">Specializing in: Data analysis, automation, backtesting frameworks</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient shadow-card hover:shadow-card-hover transition-all fade-in">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[hsl(var(--success))]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="text-2xl text-[hsl(var(--success))]" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary font-serif">Financial Modeling</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { skill: "DCF Valuation", level: 95, proficiency: "Expert" },
                    { skill: "LBO Analysis", level: 85, proficiency: "Advanced" },
                    { skill: "Risk Modeling (VaR)", level: 80, proficiency: "Advanced" }
                  ].map(({ skill, level, proficiency }) => (
                    <div key={skill}>
                      <div className="flex justify-between mb-2">
                        <span className="text-foreground font-medium">{skill}</span>
                        <span className="text-[hsl(var(--success))] font-semibold">{proficiency}</span>
                      </div>
                      <Progress value={level} className="h-2" />
                    </div>
                  ))}
                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground">Including: Greeks, Monte Carlo, Portfolio Optimization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 fade-in">
            <h3 className="text-2xl font-bold text-primary font-serif text-center mb-8">Certifications & Recognition</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Medal, title: "CFA Research Challenge", subtitle: "3rd Place Winner", color: "text-[hsl(var(--success))]" },
                { icon: Trophy, title: "Merit Scholarship", subtitle: "CU Boulder MBA", color: "text-primary" },
                { icon: Star, title: "Outstanding Student", subtitle: "UOW Dubai", color: "text-accent" },
                { icon: ChartLine, title: "Performance Excellence", subtitle: "35% Sales Increase", color: "text-[hsl(var(--success))]" }
              ].map(({ icon: Icon, title, subtitle, color }) => (
                <Card key={title} className="card-gradient shadow-card text-center p-6">
                  <CardContent className="p-0">
                    <Icon className={`text-3xl ${color} mb-3 mx-auto`} size={32} />
                    <h4 className="font-semibold text-foreground">{title}</h4>
                    <p className="text-muted-foreground text-sm">{subtitle}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold text-primary font-serif mb-4">Let's Connect</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Interested in discussing opportunities in investment banking, product strategy, or trading? 
              I'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8 fade-in">
              <div>
                <h3 className="text-2xl font-bold text-primary font-serif mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <a href="mailto:Disha.Tulsani@colorado.edu" className="text-primary hover:text-accent transition-colors">
                        Disha.Tulsani@colorado.edu
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <a href="tel:+17203331564" className="text-primary hover:text-accent transition-colors">
                        (720) 333-1564
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Linkedin className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">LinkedIn</p>
                      <a href="https://linkedin.com/in/dishatulsani" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">
                        linkedin.com/in/dishatulsani
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="card-gradient shadow-card">
                <CardContent className="p-8">
                  <h4 className="text-xl font-bold text-primary font-serif mb-4">Download Resume</h4>
                  <p className="text-muted-foreground mb-6">
                    Get a comprehensive overview of my experience, skills, and achievements.
                  </p>
                  <Button 
                    onClick={handleDownloadResume}
                    className="w-full shadow-card hover:shadow-card-hover"
                  >
                    <Download className="mr-2" size={16} />
                    Download PDF Resume
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="card-gradient shadow-card fade-in">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary font-serif mb-6">Send a Message</h3>
                <form onSubmit={form.handleSubmit((data) => contactMutation.mutate(data))} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      {...form.register("name")}
                      className="focus:ring-2 focus:ring-primary"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@company.com"
                      {...form.register("email")}
                      className="focus:ring-2 focus:ring-primary"
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      placeholder="Your company name"
                      {...form.register("company")}
                      className="focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Tell me about the opportunity or how I can help..."
                      {...form.register("message")}
                      className="focus:ring-2 focus:ring-primary"
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full shadow-card hover:shadow-card-hover"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold font-serif mb-4">Disha Tulsani</h3>
            <p className="text-background/80 mb-6">MBA Finance Professional | Investment Banking • Product Strategy • Trading</p>
            <div className="flex justify-center gap-6 mb-8">
              <a href="https://linkedin.com/in/dishatulsani" className="text-background/80 hover:text-background transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="mailto:Disha.Tulsani@colorado.edu" className="text-background/80 hover:text-background transition-colors">
                <Mail size={24} />
              </a>
            </div>
            <div className="border-t border-background/20 pt-8">
              <p className="text-background/60">&copy; 2025 Disha Tulsani. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
