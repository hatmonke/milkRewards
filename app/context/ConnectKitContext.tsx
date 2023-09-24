"use client";
import { ConnectKitProvider } from "connectkit";

export default function ConnectKitContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConnectKitProvider
    mode="dark"
    >
      {children}
    </ConnectKitProvider>
  );
}