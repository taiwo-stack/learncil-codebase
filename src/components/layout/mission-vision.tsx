import { Target, Eye, Heart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MissionVision() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card>
                        <CardHeader>
                            <Target className="w-8 h-8 text-blue-600 mb-2" />
                            <CardTitle>Our Mission</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                To promote sustainable tourism and showcase the unique culture, history, and natural beauty of our city for visitors and residents alike.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Eye className="w-8 h-8 text-green-600 mb-2" />
                            <CardTitle>Our Vision</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                To be recognized as a leading destination that offers memorable experiences while preserving our heritage and environment for future generations.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Heart className="w-8 h-8 text-red-600 mb-2" />
                            <CardTitle>Our Values</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                We value hospitality, sustainability, inclusivity, and a deep respect for our community and visitors.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
      