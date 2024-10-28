import { StarIcon } from "@/app/_components/StarIcon";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Separator } from "@/app/_components/ui/separator";

export const Reviews = () => {
  return (
    <div className="grid gap-4 text-sm leading-loose">
      <h2 className="font-bold text-lg">Customer Reviews</h2>
      <div className="flex gap-4">
        <Avatar className="w-10 h-10 border">
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="grid gap-4">
          <div className="flex gap-4 items-start">
            <div className="grid gap-0.5 text-sm">
              <h3 className="font-semibold">Sarah Johnson</h3>
              <time className="text-sm text-muted-foreground">2 days ago</time>
            </div>
            <div className="flex items-center gap-0.5 ml-auto">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-5 h-5  ${
                    i > 2
                      ? "fill-muted stroke-muted-foreground"
                      : "fill-primary"
                  }`}
                />
              ))}
              {/* <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
            </div>
          </div>
          <div className="text-sm leading-loose text-muted-foreground">
            <p>
              I&apos;ve been experimenting with my Acme Prism T-Shirt for a few
              weeks now, and it&apos;s been a versatile addition to my wardrobe.
              It&apos;s great for both casual and more dressed-up occasions.
            </p>
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex gap-4">
        <Avatar className="w-10 h-10 border">
          {/* <AvatarImage src="/placeholder-user.jpg" /> */}
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="grid gap-4">
          <div className="flex gap-4 items-start">
            <div className="grid gap-0.5 text-sm">
              <h3 className="font-semibold">Alex Smith</h3>
              <time className="text-sm text-muted-foreground">3 weeks ago</time>
            </div>
            <div className="flex items-center gap-0.5 ml-auto">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-5 h-5  ${
                    i > 2
                      ? "fill-muted stroke-muted-foreground"
                      : "fill-primary"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="text-sm leading-loose text-muted-foreground">
            <p>
              I recently purchased the Acme Prism T-Shirt, and it has been a
              great addition to my wardrobe. The quality is excellent, and the
              fit is true to size. I&apos;ve received a lot of compliments on
              the unique design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
