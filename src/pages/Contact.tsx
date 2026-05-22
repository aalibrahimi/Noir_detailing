import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Instagram, Youtube, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { studio } from "@/lib/data";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <>
      <section className="container-edge pt-40 pb-16 lg:pt-48 lg:pb-24">
        <RevealOnScroll>
          <p className="eyebrow mb-6">Contact</p>
          <h1 className="font-serif text-display-2xl text-foreground max-w-4xl">
            Direct line
            <span className="block italic text-muted-foreground">to the atelier.</span>
          </h1>
        </RevealOnScroll>
      </section>

      <section className="container-edge pb-24 lg:pb-40">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Contact details */}
          <RevealOnScroll className="lg:col-span-5 space-y-10">
            <div>
              <p className="eyebrow mb-3">Studio</p>
              <address className="not-italic space-y-1 font-serif text-xl text-foreground">
                <p>{studio.address}</p>
                <p>{studio.city}</p>
              </address>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(studio.address + " " + studio.city)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-xs tracking-[0.18em] uppercase text-primary"
              >
                <MapPin className="h-4 w-4" /> Open in Maps
              </a>
            </div>

            <div className="space-y-4">
              <p className="eyebrow">Reach the studio</p>
              <a
                href={`tel:${studio.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-base text-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 text-muted-foreground" /> {studio.phone}
              </a>
              <a
                href={`mailto:${studio.email}`}
                className="flex items-center gap-3 text-base text-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 text-muted-foreground" /> {studio.email}
              </a>
            </div>

            <div>
              <p className="eyebrow mb-3">Hours</p>
              <ul className="space-y-2 text-sm">
                {studio.hours.map((h) => (
                  <li key={h.day} className="flex justify-between text-foreground">
                    <span>{h.day}</span>
                    <span className="text-muted-foreground">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-3">Elsewhere</p>
              <div className="flex items-center gap-4">
                <a
                  href={`https://instagram.com/${studio.social.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" /> @{studio.social.instagram}
                </a>
                <a
                  href={`https://youtube.com/${studio.social.youtube}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" /> {studio.social.youtube}
                </a>
              </div>
            </div>
          </RevealOnScroll>

          {/* Form / Map */}
          <RevealOnScroll delay={2} className="lg:col-span-7">
            <div className="rounded-lg overflow-hidden border border-border bg-surface">
              {/* Map */}
              <div className="aspect-[16/9] relative bg-background">
                <iframe
                  title="Atelier location on Google Maps"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    studio.address + " " + studio.city,
                  )}&output=embed&z=14`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full grayscale-[60%] contrast-110"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="p-8 lg:p-10">
                {submitted ? (
                  <div className="text-center py-8 px-4">
                    <div className="mx-auto h-12 w-12 rounded-full border border-primary/40 bg-primary/10 grid place-items-center mb-6">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <p className="font-serif text-xl text-foreground mb-3">Message received.</p>
                    <p className="text-sm text-muted-foreground">
                      We will respond within one business day.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-6">
                    <p className="eyebrow">Write to the studio</p>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="c-name" className="mb-2 block">Name</Label>
                        <Input
                          id="c-name"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          autoComplete="name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="c-email" className="mb-2 block">Email</Label>
                        <Input
                          id="c-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          autoComplete="email"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="c-subject" className="mb-2 block">Subject</Label>
                      <Input
                        id="c-subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="Consultation, project enquiry, or general"
                      />
                    </div>
                    <div>
                      <Label htmlFor="c-message" className="mb-2 block">Message</Label>
                      <Textarea
                        id="c-message"
                        required
                        rows={6}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about the vehicle and what you have in mind."
                      />
                    </div>
                    <div className="pt-2">
                      <Button type="submit" size="lg">Send message</Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
