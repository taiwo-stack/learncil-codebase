"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Filter } from 'lucide-react'

export function TourFilters() {
  const [filters, setFilters] = useState({
    category: [],
    priceRange: '',
    duration: [],
    location: ''
  })

  const categories = [
    { id: 'city', label: 'City Tours' },
    { id: 'getaway', label: 'Getaways' },
    { id: 'adventure', label: 'Adventures' },
    { id: 'cultural', label: 'Cultural' }
  ]

  const durations = [
    { id: '1-day', label: '1 Day' },
    { id: '2-days', label: '2 Days' },
    { id: '3-days', label: '3+ Days' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-2">Search Tours</label>
          <Input
            placeholder="Search by name or location..."
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium mb-3">Category</label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  // checked={filters.category.includes(category.id)}
                  // onCheckedChange={(checked) => {
                  //   if (checked) {
                  //     setFilters(prev => ({
                  //       ...prev,
                  //       category: [...prev.category, category.id]
                  //     }))
                  //   } else {
                  //     setFilters(prev => ({
                  //       ...prev,
                  //       category: prev.category.filter(c => c !== category.id)
                  //     }))
                  //   }
                  // }}
                />
                <label
                  htmlFor={category.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Duration Filter */}
        <div>
          <label className="block text-sm font-medium mb-3">Duration</label>
          <div className="space-y-2">
            {durations.map((duration) => (
              <div key={duration.id} className="flex items-center space-x-2">
                <Checkbox id={duration.id} />
                <label
                  htmlFor={duration.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {duration.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium mb-3">Price Range</label>
          <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm">
            <option value="">Any Price</option>
            <option value="0-25000">₦0 - ₦25,000</option>
            <option value="25000-50000">₦25,000 - ₦50,000</option>
            <option value="50000-100000">₦50,000 - ₦100,000</option>
            <option value="100000+">₦100,000+</option>
          </select>
        </div>

        {/* Apply Filters */}
        <div className="space-y-2">
          <Button className="w-full">Apply Filters</Button>
          <Button variant="outline" className="w-full">Clear All</Button>
        </div>
      </CardContent>
    </Card>
  )
}
