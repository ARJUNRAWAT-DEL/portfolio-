"use client";
import { useExtensionErrorSuppression } from '../hooks/useExtensionErrorSuppression';

export default function ClientErrorSuppression() {
  useExtensionErrorSuppression();
  return null;
}