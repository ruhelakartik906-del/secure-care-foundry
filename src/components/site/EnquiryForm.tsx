import { lazy, Suspense, useEffect, useRef, useState, type ComponentProps } from "react";

// Split validation and submission code out of the shared site shell.
const Form = lazy(() => import("./EnquiryFormContent").then((module) => ({ default: module.EnquiryForm })));

export function EnquiryForm(props: ComponentProps<typeof Form>) {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) { setVisible(true); return; }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: "300px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={container}>{visible ? <Suspense fallback={<div className="min-h-[520px]" aria-busy="true" />}><Form {...props} /></Suspense> : <div className="min-h-[520px]" aria-busy="true" />}</div>;
}