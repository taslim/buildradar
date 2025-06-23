import { type Metadata } from "next";

export const metadata: Metadata = {
  title: 'Disclaimer - BuildRadar',
  description: 'Important information about data accuracy and usage',
};

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 