"use client";

import * as React from "react";

import { useMediaQuery } from "~/hooks/use-media-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

type DialogToDrawerContext = {
  isDesktop: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultOpen: boolean;
};

const DialogToDrawerContext = React.createContext<
  DialogToDrawerContext | undefined
>(undefined);

function useDialogToDrawer() {
  const context = React.useContext(DialogToDrawerContext);

  if (!context) {
    throw new Error("useDialogToDrawer must be used within a DialogToDrawer");
  }

  return context;
}

export function DialogToDrawer({
  children,
  defaultOpen = false,
  ...props
}: React.ComponentProps<typeof Dialog> & React.ComponentProps<typeof Drawer>) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = React.useState(defaultOpen);

  if (isDesktop) {
    return (
      <DialogToDrawerContext.Provider
        value={{ isDesktop, open, onOpenChange: setOpen, defaultOpen: false }}
      >
        <Dialog
          {...props}
          open={open}
          onOpenChange={setOpen}
          defaultOpen={defaultOpen}
        >
          {children}
        </Dialog>
      </DialogToDrawerContext.Provider>
    );
  }

  return (
    <DialogToDrawerContext.Provider
      value={{ isDesktop, open, onOpenChange: setOpen, defaultOpen: false }}
    >
      <Drawer
        {...props}
        open={open}
        onOpenChange={setOpen}
        defaultOpen={defaultOpen}
      >
        {children}
      </Drawer>
    </DialogToDrawerContext.Provider>
  );
}

export function DialogToDrawerTrigger({
  children,
}: {
  children: React.ReactElement;
}) {
  const { isDesktop } = useDialogToDrawer();

  if (isDesktop) {
    return <DialogTrigger render={children} />;
  }

  return <DrawerTrigger asChild>{children}</DrawerTrigger>;
}

export function DialogToDrawerContent({
  children,
  ...props
}: React.ComponentProps<typeof DialogContent> &
  React.ComponentProps<typeof DrawerContent>) {
  const { isDesktop } = useDialogToDrawer();

  if (isDesktop) {
    return <DialogContent {...props}>{children}</DialogContent>;
  }

  return <DrawerContent {...props}>{children}</DrawerContent>;
}

export function DialogToDrawerHeader({
  children,
  ...props
}: React.ComponentProps<typeof DialogHeader> &
  React.ComponentProps<typeof DrawerHeader>) {
  const { isDesktop } = useDialogToDrawer();

  if (isDesktop) {
    return <DialogHeader {...props}>{children}</DialogHeader>;
  }

  return <DrawerHeader {...props}>{children}</DrawerHeader>;
}

export function DialogToDrawerTitle({
  children,
  ...props
}: React.ComponentProps<typeof DialogTitle> &
  React.ComponentProps<typeof DrawerTitle>) {
  const { isDesktop } = useDialogToDrawer();

  if (isDesktop) {
    return <DialogTitle {...props}>{children}</DialogTitle>;
  }

  return <DrawerTitle {...props}>{children}</DrawerTitle>;
}

export function DialogToDrawerDescription({
  children,
  ...props
}: React.ComponentProps<typeof DialogDescription> &
  React.ComponentProps<typeof DrawerDescription>) {
  const { isDesktop } = useDialogToDrawer();

  if (isDesktop) {
    return <DialogDescription {...props}>{children}</DialogDescription>;
  }

  return <DrawerDescription {...props}>{children}</DrawerDescription>;
}

export function DialogToDrawerFooter({
  children,
  ...props
}: React.ComponentProps<typeof DialogFooter> &
  React.ComponentProps<typeof DrawerFooter>) {
  const { isDesktop } = useDialogToDrawer();

  if (isDesktop) {
    return <DialogFooter {...props}>{children}</DialogFooter>;
  }

  return <DrawerFooter {...props}>{children}</DrawerFooter>;
}
