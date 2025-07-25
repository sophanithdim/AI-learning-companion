import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import { recentSessions } from "@/constants";
import {
  getAllCompanions,
  getBookmarkedCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { Suspense, lazy } from "react";

// Lazy load the CTA component
const CTA = lazy(() => import("@/components/CTA"));

// Separate components for each section to enable streaming and suspense
const PopularCompanions = async () => {
  // Use Promise.all to fetch data in parallel
  const [companions, authResult] = await Promise.all([
    getAllCompanions({ limit: 3 }),
    auth()
  ]);

  const { userId } = authResult;

  // Only fetch bookmarks if user is logged in
  const bookmarkedCompanions: Companion[] = userId
    ? await getBookmarkedCompanions(userId)
    : [];

  // Create a Set of bookmarked IDs for fast lookup
  const bookmarkedIds = new Set(bookmarkedCompanions.map((comp) => comp.id));

  return (
    <>
      <h1>Popular Companions</h1>
      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            bookmarked={bookmarkedIds.has(companion.id)}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
    </>
  );
};

// Loading fallback for popular companions
const PopularCompanionsLoading = () => (
  <>
    <h1>Popular Companions</h1>
    <section className="home-section">
      <div className="animate-pulse bg-gray-200 h-64 w-full rounded-lg"></div>
      <div className="animate-pulse bg-gray-200 h-64 w-full rounded-lg"></div>
      <div className="animate-pulse bg-gray-200 h-64 w-full rounded-lg"></div>
    </section>
  </>
);

// Component for recent sessions
const RecentSessions = async () => {
  const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <CompanionsList
      title="Recently completed sessions"
      companions={recentSessionsCompanions}
      classNames="w-2/3 max-lg:w-full"
    />
  );
};

// Loading fallback for recent sessions
const RecentSessionsLoading = () => (
  <div className="w-2/3 max-lg:w-full">
    <h2 className="font-bold text-3xl">Recently completed sessions</h2>
    <div className="animate-pulse bg-gray-200 h-64 w-full rounded-lg mt-4"></div>
  </div>
);

// Main page component
export default function Page() {
  return (
    <main>
      {/* Use Suspense to avoid blocking the initial render */}
      <Suspense fallback={<PopularCompanionsLoading />}>
        <PopularCompanions />
      </Suspense>

      <section className="home-section">
        <Suspense fallback={<RecentSessionsLoading />}>
          <RecentSessions />
        </Suspense>
        <Suspense fallback={<div className="cta-section animate-pulse bg-gray-200 h-64 w-full rounded-lg"></div>}>
          <CTA />
        </Suspense>
      </section>
    </main>
  );
};
