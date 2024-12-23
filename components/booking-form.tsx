"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  date: z.date({
    required_error: "Please select a date for your event.",
  }),
  guestCount: z.string().min(1, {
    message: "Please enter the number of guests.",
  }),
  message: z.string().optional(),
})

export function BookingForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [blockedDates, setBlockedDates] = useState<Date[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      guestCount: "",
    },
  })

  useEffect(() => {
    async function fetchBlockedDates() {
      try {
        const response = await fetch('/api/blocked-dates')
        const data = await response.json()
        if (data.blockedDates) {
          setBlockedDates(data.blockedDates.map((date: any) => new Date(date.start)))
        }
      } catch (error) {
        console.error('Failed to fetch blocked dates:', error)
      }
    }

    fetchBlockedDates()
  }, [])

  const isDateBlocked = (date: Date) => {
    return blockedDates.some(blockedDate => 
      blockedDate.toDateString() === date.toDateString()
    )
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error('Booking failed')

      toast({
        title: "Booking Request Received",
        description: "We'll get back to you within 24 hours to confirm your booking. Check your email for calendar details.",
      })
      
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your booking. Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-black dark:text-white text-sm font-sans font-light tracking-wide">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your name" 
                    {...field} 
                    className="bg-white text-gray-900 placeholder:text-gray-500 border-gray-200 h-10 font-sans font-light"
                  />
                </FormControl>
                <FormMessage className="text-xs font-sans font-light" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-black dark:text-white text-sm font-sans font-light tracking-wide">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="your@email.com" 
                    {...field} 
                    className="bg-white text-gray-900 placeholder:text-gray-500 border-gray-200 h-10 font-sans font-light"
                  />
                </FormControl>
                <FormMessage className="text-xs font-sans font-light" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-black dark:text-white text-sm font-sans font-light tracking-wide">Event Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal bg-white text-navy-900 border-navy-200 h-10",
                          !field.value && "text-navy-400"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() ||
                        date < new Date("1900-01-01") ||
                        isDateBlocked(date)
                      }
                      initialFocus
                      className="bg-white"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guestCount"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-black dark:text-white text-sm font-sans font-light tracking-wide">Number of Guests</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="50" 
                    {...field} 
                    className="bg-white text-gray-900 placeholder:text-gray-500 border-gray-200 h-10 font-sans font-light"
                  />
                </FormControl>
                <FormMessage className="text-xs font-sans font-light" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-black dark:text-white text-sm font-sans font-light tracking-wide">Additional Details</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us more about your event..."
                    {...field}
                    className="bg-white text-gray-900 placeholder:text-gray-500 border-gray-200 min-h-[80px] resize-none font-sans font-light"
                  />
                </FormControl>
                <FormDescription className="text-gray-600 dark:text-gray-300 text-xs font-sans font-light">
                  Include any special requests or details about your event.
                </FormDescription>
                <FormMessage className="text-xs font-sans font-light" />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full bg-black hover:bg-black/90 text-white h-11 font-sans font-light tracking-wide"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="font-sans font-light">Submitting...</span>
              </>
            ) : (
              'Submit Booking Request'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
} 