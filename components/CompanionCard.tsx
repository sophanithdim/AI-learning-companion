"use client";
import { removeBookmark } from "@/lib/actions/companion.actions";
import { addBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";



const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  bookmarked,
}: CompanionCardProps) => {
  const pathname = usePathname();
  const handleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(id, pathname);
    } else {
      await addBookmark(id, pathname);
    }
  };
  return (
    <article className="companion-card hover-scale animate-fade-in" style={{ backgroundColor: 'white' }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button 
          className="companion-bookmark hover-lift" 
          onClick={handleBookmark}
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <Image
            src={
              bookmarked ? "/icons/bookmark-filled-modern.svg" : "/icons/bookmark-modern.svg"
            }
            alt="bookmark"
            width={14}
            height={16}
            loading="eager"
          />
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground">{name}</h2>
        <p className="text-sm text-muted-foreground mt-1">{topic}</p>
      </div>

      <div className="flex items-center gap-2 text-muted-foreground">
        <Image
          src="/icons/clock-modern.svg"
          alt="duration"
          width={14}
          height={14}
          loading="eager"
          className="opacity-70"
        />
        <p className="text-sm font-medium">{duration} minutes</p>
      </div>

      <Link href={`/companions/${id}`} className="w-full">
        <button className="btn-primary w-full justify-center hover-lift">
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;
