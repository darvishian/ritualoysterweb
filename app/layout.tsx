import localFont from 'next/font/local'
import { Toaster } from "@/components/ui/toaster"
import { GoogleAnalytics } from "@/components/google-analytics"
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

export const metadata = {
  title: 'Chicago Oyster Catering | Luxury Raw Bar Service | Ritual Oysters',
  description: 'Chicago\'s premier oyster catering and luxury raw bar service. Expert oyster shucking for weddings, corporate events, and private celebrations throughout Chicago and North Shore.',
  keywords: 'Chicago oyster catering, raw bar service Chicago, luxury catering Chicago, wedding oyster bar, corporate event catering Chicago, seafood catering Chicago, premium raw bar service, North Shore catering',
  openGraph: {
    title: 'Chicago Oyster Catering | Luxury Raw Bar Service | Ritual Oysters',
    description: 'Chicago\'s premier oyster catering and luxury raw bar service. Expert oyster shucking for weddings, corporate events, and private celebrations throughout Chicago and North Shore.',
    url: 'https://ritualoysters.com',
    siteName: 'Ritual Oysters',
    locale: 'en_US',
    type: 'website',
  },
}

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
          <GoogleAnalytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
