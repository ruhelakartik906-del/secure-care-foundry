import { lazy, Suspense, type ComponentProps } from "react";

// Split validation and submission code out of the shared site shell.
const Form = lazy(() => import("./EnquiryFormContent").then((module) => ({ default: module.EnquiryForm })));

export function EnquiryForm(props: ComponentProps<typeof Form>) {
  return <Suspense fallback={<div className="min-h-[520px]" aria-busy="true" />}><Form {...props} /></Suspense>;
}