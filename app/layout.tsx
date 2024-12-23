import localFont from 'next/font/local'
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const canela = localFont({
  src: [
    {
      path: '../public/fonts/Canela/Canela-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Canela/Canela-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Canela/Canela-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-canela',
})

const favorit = localFont({
  src: [
    {
      path: '../public/fonts/Favorit/Favorit-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Favorit/Favorit-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Favorit/Favorit-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-favorit',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${canela.variable} ${favorit.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          forcedTheme="light"
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
