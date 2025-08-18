import { Card } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"
import { CalendarFallback } from "@/components/ui/calendar-fallback"

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Page Header */}
      <div className="w-full bg-gradient-to-br from-[#4A235A]/5 to-[#D7BCE8]/10 border-b border-[#E8E0E5]">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-[#4A235A] mb-4">
              <Calendar className="h-8 w-8" />
              <span className="text-sm font-medium tracking-wide uppercase">Live Events</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4A235A] mb-6">
              Upcoming AMA Sessions
            </h1>
            
            <p className="text-lg sm:text-xl text-[#6B5B73] max-w-3xl mx-auto leading-relaxed">
              Join our live Ask Me Anything sessions with menopause specialists. Get expert answers to your questions and connect with our community of women supporting each other through this journey.
            </p>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-to-br from-[#4A235A]/5 to-transparent border-[#4A235A]/20 bg-[#FAF8F5]">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#4A235A]/10">
                  <Clock className="h-5 w-5 text-[#4A235A]" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-[#4A235A] mb-2">Session Times</h3>
                  <p className="text-sm text-[#6B5B73]">
                    All sessions are displayed in your local timezone. Sessions typically run for 60 minutes with live Q&A.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-[#D7BCE8]/20 to-transparent border-[#D7BCE8]/30 bg-[#FAF8F5]">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#D7BCE8]/20">
                  <Calendar className="h-5 w-5 text-[#4A235A]" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-[#4A235A] mb-2">How to Join</h3>
                  <p className="text-sm text-[#6B5B73]">
                    Click on any event below to see details and get your personal join link. Registration is required.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Calendar Container */}
          <Card className="overflow-hidden border-2 border-[#E8E0E5] shadow-lg bg-[#FAF8F5]">
            <div className="bg-gradient-to-r from-[#4A235A] to-[#4A235A]/80 text-white p-4">
              <h2 className="font-serif text-xl font-semibold text-center">
                Live Events Calendar
              </h2>
            </div>
            
            <div className="relative">
              {/* Calendar iframe */}
              <div className="w-full" style={{ height: 'clamp(400px, 70vh, 800px)' }}>
                <iframe
                  src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23FAF8F5&ctz=America%2FNew_York&mode=AGENDA&showCalendars=0&showTabs=0&showPrint=0&showDate=1&showNav=1&showTitle=0&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t"
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Empress Health AMA Sessions Calendar"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <CalendarFallback />
            </div>
          </Card>

          {/* Additional Information */}
          <div className="text-center space-y-4 py-8">
            <p className="text-[#6B5B73]">
              Don't see an upcoming session that fits your schedule? 
              <span className="text-[#4A235A] font-medium"> Contact us</span> to suggest new session times.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-[#6B5B73]">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#4A235A]"></div>
                Live Session
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#D7BCE8] border-2 border-[#4A235A]"></div>
                Registration Required
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#F5F2EF] border-2 border-[#E8E0E5]"></div>
                Past Event
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}