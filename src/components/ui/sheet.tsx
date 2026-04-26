import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"

// Root
function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root {...props} />
}

// Trigger
function SheetTrigger(
  props: React.ComponentProps<typeof SheetPrimitive.Trigger>
) {
  return <SheetPrimitive.Trigger {...props} />
}

// Close
function SheetClose(
  props: React.ComponentProps<typeof SheetPrimitive.Close>
) {
  return <SheetPrimitive.Close {...props} />
}

// Portal
function SheetPortal(
  props: React.ComponentProps<typeof SheetPrimitive.Portal>
) {
  return <SheetPrimitive.Portal {...props} />
}

// Overlay
function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/80",
        className
      )}
      {...props}
    />
  )
}

// Content
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col bg-white shadow-lg",
          side === "right" && "right-0 top-0 h-full w-3/4 sm:max-w-sm",
          side === "left" && "left-0 top-0 h-full w-3/4 sm:max-w-sm",
          side === "top" && "top-0 left-0 w-full",
          side === "bottom" && "bottom-0 left-0 w-full",
          className
        )}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

// Header
function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

// Footer
function SheetFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-auto p-4", className)}
      {...props}
    />
  )
}

// Title
function SheetTitle(
  props: React.ComponentProps<typeof SheetPrimitive.Title>
) {
  return (
    <SheetPrimitive.Title
      className="text-lg font-semibold"
      {...props}
    />
  )
}

// Description
function SheetDescription(
  props: React.ComponentProps<typeof SheetPrimitive.Description>
) {
  return (
    <SheetPrimitive.Description
      className="text-sm text-gray-500"
      {...props}
    />
  )
}

// Export
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}