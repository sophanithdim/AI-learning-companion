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
    <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <h2 className="text-2xl font-bold mb-6">Popular Companions</h2>
      <section className="companions-grid">
        {companions.map((companion, index) => (
          <div 
            key={companion.id} 
            className="animate-slide-up w-full min-lg:max-w-[32%]"
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            <CompanionCard
              {...companion}
              bookmarked={bookmarkedIds.has(companion.id)}
              color={getSubjectColor(companion.subject)}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

// Loading fallback for popular companions
const PopularCompanionsLoading = () => (
  <div className="animate-fade-in">
    <h2 className="text-2xl font-bold mb-6">Popular Companions</h2>
    <section className="companions-grid">
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-full min-lg:max-w-[32%]">
          <div className="rounded-xl border border-border px-6 py-6 gap-6 w-full bg-white shadow-sm h-[280px] flex flex-col">
            <div className="flex justify-between items-center">
              <div className="bg-secondary h-8 w-24 rounded-full animate-pulse-subtle"></div>
              <div className="bg-secondary h-8 w-8 rounded-full animate-pulse-subtle"></div>
            </div>
            <div className="space-y-2">
              <div className="bg-secondary h-8 w-3/4 rounded-md animate-pulse-subtle"></div>
              <div className="bg-secondary h-5 w-1/2 rounded-md animate-pulse-subtle"></div>
            </div>
            <div className="bg-secondary h-5 w-1/3 rounded-md animate-pulse-subtle"></div>
            <div className="bg-secondary h-10 w-full rounded-lg mt-auto animate-pulse-subtle"></div>
          </div>
        </div>
      ))}
    </section>
  </div>
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
  <div className="w-2/3 max-lg:w-full animate-fade-in">
    <h2 className="font-bold text-3xl mb-6">Recently completed sessions</h2>
    <div className="rounded-xl border border-border px-8 pt-8 pb-10 bg-white shadow-sm">
      <div className="border-b border-border/50 pb-4 mb-4">
        <div className="flex justify-between">
          <div className="bg-secondary h-6 w-1/6 rounded-md animate-pulse-subtle"></div>
          <div className="bg-secondary h-6 w-1/6 rounded-md animate-pulse-subtle"></div>
          <div className="bg-secondary h-6 w-1/6 rounded-md animate-pulse-subtle"></div>
        </div>
      </div>

      {[1, 2, 3].map((i) => (
        <div key={i} className="py-4 border-b border-border/10 animate-pulse-subtle" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-[72px] rounded-lg bg-secondary"></div>
              <div className="space-y-2">
                <div className="bg-secondary h-6 w-48 rounded-md"></div>
                <div className="bg-secondary h-5 w-32 rounded-md"></div>
              </div>
            </div>
            <div className="bg-secondary h-6 w-16 rounded-md"></div>
            <div className="bg-secondary h-6 w-16 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Main page component
export default function Page() {
  return (
    <main className="animate-fade-in">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-6 animate-slide-up">Welcome to Learning Companion</h1>
        <p className="text-lg text-muted-foreground max-w-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Explore our AI-powered learning companions designed to help you master new subjects through natural conversations.
        </p>
      </div>

      {/* Use Suspense to avoid blocking the initial render */}
      <Suspense fallback={<PopularCompanionsLoading />}>
        <PopularCompanions />
      </Suspense>

      <section className="home-section mt-12">
        <Suspense fallback={<RecentSessionsLoading />}>
          <RecentSessions />
        </Suspense>
        <Suspense fallback={<div className="cta-section animate-pulse bg-secondary h-64 w-full rounded-xl shadow-sm"></div>}>
          <CTA />
        </Suspense>
      </section>
    </main>
  );
};
