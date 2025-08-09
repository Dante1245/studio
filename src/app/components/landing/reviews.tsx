import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Mars Colonist #7',
    title: 'Red Planet Resident',
    review:
      'I use this platform to manage my Dogecoin from my habitat on Mars. The latency is literally stellar. Much wow.',
    avatar: 'https://placehold.co/100x100.png',
    rating: 5,
  },
  {
    name: 'Starship Engineer',
    title: 'Launch Operations',
    review:
      'The only platform that lets me trade between engine tests. The UI is cleaner than our launchpad. 10/10.',
    avatar: 'https://placehold.co/100x100.png',
    rating: 5,
  },
  {
    name: 'Neuralink Beta Tester',
    title: 'Mind-Machine Interface',
    review:
      'Executing trades with just a thought is a game-changer. The future is weird, but my portfolio has never been better.',
    avatar: 'https://placehold.co/100x100.png',
    rating: 5,
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="container space-y-8 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
          Straight from the Starship Troopers
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Hear from the pioneers building the future, one trade at a time.
        </p>
      </div>
      <div className="mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, i) => (
          <Card key={i} className="flex flex-col">
            <CardContent className="flex-1 p-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="mt-4 text-foreground">"{review.review}"</p>
            </CardContent>
            <div className="flex items-center gap-4 border-t p-6">
              <Avatar>
                <AvatarImage src={review.avatar} alt={review.name} data-ai-hint="person" />
                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-muted-foreground">{review.title}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
