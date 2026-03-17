import { CenteredLayout } from "@/components/templates"

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <CenteredLayout>
          <h1 className="text-6xl font-bold">404</h1>
          <p className="text-lg text-muted-foreground">Page not found</p>
        </CenteredLayout>
      </body>
    </html>
  );
}