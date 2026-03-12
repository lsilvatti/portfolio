export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="text-lg text-muted-foreground">Page not found</p>
        </div>
      </body>
    </html>
  );
}