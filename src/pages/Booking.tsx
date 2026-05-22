import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check, Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { services } from "@/lib/data";
import { cn } from "@/lib/utils";

interface BookingState {
  service: string;
  tier: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const steps = ["Service", "Vehicle", "Schedule", "You"] as const;

export default function Booking() {
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [state, setState] = useState<BookingState>({
    service: params.get("service") || services[0].id,
    tier: params.get("tier") || services[0].tiers[0].name.toLowerCase(),
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    const s = params.get("service");
    const t = params.get("tier");
    if (s) setState((prev) => ({ ...prev, service: s, tier: t || prev.tier }));
  }, [params]);

  const selectedService = useMemo(
    () => services.find((s) => s.id === state.service) ?? services[0],
    [state.service],
  );

  const update = <K extends keyof BookingState>(key: K, value: BookingState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const canAdvance = useMemo(() => {
    if (step === 0) return !!state.service && !!state.tier;
    if (step === 1) return !!state.vehicleMake && !!state.vehicleModel && !!state.vehicleYear;
    if (step === 2) return !!state.date && !!state.time;
    return !!state.name && !!state.email && !!state.phone;
  }, [step, state]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canAdvance) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="container-edge pt-40 pb-32 lg:pt-48 lg:pb-48 min-h-screen-safe grid place-items-center">
        <RevealOnScroll className="max-w-2xl text-center">
          <div className="mx-auto h-16 w-16 rounded-full border border-primary/40 bg-primary/10 grid place-items-center mb-8">
            <Check className="h-7 w-7 text-primary" />
          </div>
          <p className="eyebrow text-primary mb-4">Received</p>
          <h1 className="font-serif text-display-xl text-foreground mb-6">
            Your request is in.
          </h1>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-10">
            A member of the studio will be in touch within one business day to confirm the
            appointment and discuss any details. A confirmation has been sent to {state.email}.
          </p>
          <Button
            onClick={() => {
              setSubmitted(false);
              setStep(0);
            }}
            variant="outline"
          >
            Submit another
          </Button>
        </RevealOnScroll>
      </section>
    );
  }

  return (
    <>
      <section className="container-edge pt-40 pb-16 lg:pt-48 lg:pb-24">
        <RevealOnScroll>
          <p className="eyebrow mb-6">Reserve</p>
          <h1 className="font-serif text-display-2xl text-foreground max-w-4xl">
            Begin the consultation.
          </h1>
          <p className="mt-8 max-w-2xl text-base lg:text-lg text-muted-foreground leading-relaxed">
            Four short steps. The studio will respond with a confirmed slot, an estimate, and a
            check-in protocol. No payment is required at this stage.
          </p>
        </RevealOnScroll>
      </section>

      <section className="container-edge pb-24 lg:pb-40">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Stepper */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <ol className="space-y-1">
                {steps.map((label, i) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => i < step && setStep(i)}
                      disabled={i > step}
                      aria-current={i === step ? "step" : undefined}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-md px-4 py-3 text-left transition-colors",
                        i === step
                          ? "bg-surface text-foreground"
                          : i < step
                          ? "text-muted-foreground hover:text-foreground cursor-pointer"
                          : "text-muted-foreground/50 cursor-not-allowed",
                      )}
                    >
                      <span className="tabular text-xs tracking-[0.18em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm tracking-[0.16em] uppercase">{label}</span>
                      {i < step && <Check className="ml-auto h-4 w-4 text-primary" />}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-9 bg-surface border border-border rounded-lg p-8 lg:p-12"
            noValidate
          >
            {step === 0 && (
              <fieldset className="space-y-8">
                <legend className="font-serif text-2xl tracking-tight mb-2">Choose a service</legend>
                <p className="text-sm text-muted-foreground">
                  Not sure where to begin? Select Ceramic Coating — most intakes start here.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        update("service", service.id);
                        update("tier", service.tiers[0].name.toLowerCase());
                      }}
                      className={cn(
                        "rounded-md border p-5 text-left transition-colors",
                        state.service === service.id
                          ? "border-primary bg-primary/5"
                          : "border-border bg-background hover:border-muted-foreground/40",
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-serif text-lg tracking-tight">{service.name}</p>
                        {state.service === service.id && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {service.tagline}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="pt-4">
                  <Label className="mb-4 block">Tier</Label>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {selectedService.tiers.map((tier) => (
                      <button
                        key={tier.name}
                        type="button"
                        onClick={() => update("tier", tier.name.toLowerCase())}
                        className={cn(
                          "rounded-md border p-4 text-left transition-colors",
                          state.tier === tier.name.toLowerCase()
                            ? "border-primary bg-primary/5"
                            : "border-border bg-background hover:border-muted-foreground/40",
                        )}
                      >
                        <p className="font-serif text-base">{tier.name}</p>
                        <p className="text-xs text-muted-foreground tabular mt-1">
                          From ${tier.price.toLocaleString()}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <fieldset className="space-y-6">
                <legend className="font-serif text-2xl tracking-tight mb-2">Your vehicle</legend>
                <p className="text-sm text-muted-foreground">
                  This helps us prepare the correct lighting, lifts, and consumables before you arrive.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="make" className="mb-2 block">Make</Label>
                    <Input
                      id="make"
                      required
                      value={state.vehicleMake}
                      onChange={(e) => update("vehicleMake", e.target.value)}
                      placeholder="Porsche"
                    />
                  </div>
                  <div>
                    <Label htmlFor="model" className="mb-2 block">Model</Label>
                    <Input
                      id="model"
                      required
                      value={state.vehicleModel}
                      onChange={(e) => update("vehicleModel", e.target.value)}
                      placeholder="911 Turbo S"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year" className="mb-2 block">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      required
                      min={1950}
                      max={new Date().getFullYear() + 1}
                      value={state.vehicleYear}
                      onChange={(e) => update("vehicleYear", e.target.value)}
                      placeholder="2024"
                    />
                  </div>
                </div>
              </fieldset>
            )}

            {step === 2 && <ScheduleStep state={state} update={update} />}

            {step === 3 && (
              <fieldset className="space-y-6">
                <legend className="font-serif text-2xl tracking-tight mb-2">Your details</legend>
                <p className="text-sm text-muted-foreground">
                  We respond within one business day. Email is preferred for confirmations; phone for
                  scheduling.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name" className="mb-2 block">Name</Label>
                    <Input
                      id="name"
                      required
                      value={state.name}
                      onChange={(e) => update("name", e.target.value)}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-2 block">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={state.email}
                      onChange={(e) => update("email", e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="phone" className="mb-2 block">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={state.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      autoComplete="tel"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="notes" className="mb-2 block">
                      Notes <span className="text-muted-foreground normal-case tracking-normal">— optional</span>
                    </Label>
                    <Textarea
                      id="notes"
                      value={state.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      placeholder="Any concerns, history, prior work, or specific requests."
                      rows={5}
                    />
                  </div>
                </div>
              </fieldset>
            )}

            {/* Summary + nav */}
            <div className="mt-12 pt-8 border-t border-border flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <Badge variant="primary">{selectedService.name}</Badge>
                <Badge variant="outline">{state.tier.replace(/\b\w/g, (c) => c.toUpperCase())}</Badge>
                {state.date && <Badge variant="default">{state.date} · {state.time}</Badge>}
              </div>
              <div className="flex gap-3">
                {step > 0 && (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                )}
                {step < steps.length - 1 ? (
                  <Button
                    type="button"
                    disabled={!canAdvance}
                    onClick={() => setStep(step + 1)}
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={!canAdvance}>
                    Submit request <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function ScheduleStep({
  state,
  update,
}: {
  state: BookingState;
  update: <K extends keyof BookingState>(key: K, value: BookingState[K]) => void;
}) {
  // Generate next 14 available days (skip Sundays).
  const dates = useMemo(() => {
    const out: Array<{ value: string; label: string; sub: string; disabled: boolean }> = [];
    const start = new Date();
    let day = 0;
    while (out.length < 14) {
      day++;
      const d = new Date(start);
      d.setDate(start.getDate() + day);
      const dow = d.getDay();
      const value = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
      out.push({
        value,
        label,
        sub: d.toLocaleDateString("en-US", { weekday: "long" }),
        disabled: dow === 0,
      });
    }
    return out;
  }, []);

  const times = ["09:00", "10:30", "13:00", "14:30", "16:00"];

  return (
    <fieldset className="space-y-8">
      <legend className="font-serif text-2xl tracking-tight mb-2 flex items-center gap-3">
        <CalendarIcon className="h-5 w-5 text-primary" /> Pick a window
      </legend>
      <p className="text-sm text-muted-foreground">
        These are tentative consultation windows. Final scheduling is confirmed by the studio.
      </p>

      <div>
        <Label className="mb-4 block">Date</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {dates.map((d) => (
            <button
              key={d.value}
              type="button"
              disabled={d.disabled}
              onClick={() => update("date", d.value)}
              className={cn(
                "rounded-md border px-3 py-3 text-center transition-colors",
                d.disabled
                  ? "border-border bg-surface text-muted-foreground/30 cursor-not-allowed"
                  : state.date === d.value
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-background text-foreground hover:border-muted-foreground/40",
              )}
            >
              <p className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">{d.sub.slice(0, 3)}</p>
              <p className="font-serif text-base mt-1 tabular">{d.label.split(" ")[1]} {d.label.split(" ")[2]}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-4 block">Time</Label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {times.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => update("time", t)}
              className={cn(
                "rounded-md border px-3 py-3 text-center text-sm tabular transition-colors",
                state.time === t
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-background text-foreground hover:border-muted-foreground/40",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </fieldset>
  );
}
