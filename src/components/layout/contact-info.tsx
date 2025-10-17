import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Address</h4>
              <p className="text-muted-foreground">
                123 Tourism Street<br />
                Victoria Island, Lagos<br />
                Nigeria
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Phone className="h-5 w-5 text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Phone</h4>
              <p className="text-muted-foreground">+234 123 456 7890</p>
              <p className="text-muted-foreground">+234 987 654 3210</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-muted-foreground">info@tourismco.com</p>
              <p className="text-muted-foreground">support@tourismco.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-primary mt-1" />
            <div>
              <h4 className="font-semibold">Business Hours</h4>
              <p className="text-muted-foreground">
                Mon - Fri: 9:00 AM - 6:00 PM<br />
                Sat: 10:00 AM - 4:00 PM<br />
                Sun: Closed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">WhatsApp Support</h3>
            <p className="text-muted-foreground mb-4">
              Get instant support via WhatsApp for quick questions and bookings
            </p>
            <Button className="w-full" asChild>
              <a
                href="https://wa.me/2341234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
