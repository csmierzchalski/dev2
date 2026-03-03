import "@/styles/globals.scss";
import "@/styles/tailwind.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Elements } from "@/components";
import { AuthProvider } from "@/lib/auth-context";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAppRoute = router.pathname.startsWith("/app");

  return (
    <AuthProvider>
      {!isAppRoute && <Elements.Header />}
      <Component {...pageProps} />
      {!isAppRoute && <Elements.Footer />}
    </AuthProvider>
  );
}
