"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { usePublicJournals } from "../../context/PublicJournalsContext";
import AuthModals from "../Landing/AuthModals";
import { useDarkMode } from "../../context/ThemeContext";
import PublicJournalCard from "./PublicJournalCard";
import SubscriptionsView from "./SubscriptionsView";
import FilterSection from "./FilterSection";
import Navbar from "../Dashboard/Navbar";
import LandingNavbar from "../Landing/Navbar";
import {
  Loader2,
  AlertCircle,
  Users,
  ArrowLeft,
  Sparkles,
  BookOpen,
  TrendingUp,
} from "lucide-react";

const Header = ({
  showFollowingOnly,
  isLoggedIn,
  onShowSubscriptions,
  onBackToAll,
}) => (
  <div className="mb-12">
    {showFollowingOnly && (
      <button
        onClick={onBackToAll}
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to All Journals</span>
      </button>
    )}

    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100">
              {showFollowingOnly ? "Your Feed" : "Discover"}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
              {showFollowingOnly
                ? "Latest posts from writers you follow"
                : "Explore stories and thoughts from our community"}
            </p>
          </div>
        </div>
      </div>

      {isLoggedIn && !showFollowingOnly && (
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onShowSubscriptions}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
          >
            <Users className="w-5 h-5" />
            <span>Subscribed Users</span>
          </button>
        </div>
      )}
    </div>
  </div>
);

const EmptyState = ({ showFollowingOnly, toggleFollowingOnly, isLoggedIn }) => (
  <div className="text-center py-20">
    <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
      <span className="text-5xl">{showFollowingOnly ? "👥" : "📖"}</span>
    </div>

    <div className="max-w-md mx-auto space-y-4">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {showFollowingOnly
          ? "No posts from your follows"
          : "No public journals yet"}
      </h3>

      <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
        {showFollowingOnly
          ? "The writers you follow haven't posted anything yet. Explore all journals to discover new voices and stories."
          : "Be the first to share your thoughts with the community and inspire others to start their journaling journey!"}
      </p>

      {showFollowingOnly && (
        <div className="pt-4">
          <button
            onClick={toggleFollowingOnly}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            <BookOpen className="w-5 h-5" />
            <span>Explore All Journals</span>
          </button>
        </div>
      )}
    </div>
  </div>
);

const LoadingState = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4 bg-white dark:bg-slate-800 px-8 py-12 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700">
      <div className="relative">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <div className="absolute inset-0 h-8 w-8 animate-ping rounded-full bg-blue-500 opacity-20" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
          Loading journals
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Discovering amazing stories for you...
        </p>
      </div>
    </div>
  </div>
);

const ErrorState = ({ error, onRetry }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
    <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 max-w-md">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>

      <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
        Something went wrong
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
        {error}
      </p>

      <button
        onClick={onRetry}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors font-medium shadow-lg hover:shadow-xl"
      >
        Try Again
      </button>
    </div>
  </div>
);

const PublicJournals = () => {
  const [showSubscriptionsView, setShowSubscriptionsView] = useState(false);

  const {
    journals,
    loading,
    loadingMore,
    error,
    likedJournals,
    hasMore,
    feedType,
    showFollowingOnly,
    fetchJournals,
    handleLike,
    handleFeedTypeChange,
    toggleFollowingOnly,
    loadMore,
  } = usePublicJournals();

  const { darkMode, setDarkMode } = useDarkMode();
  const { modals, openLoginModal, openSignupModal } = AuthModals({ darkMode });

  const user = useMemo(() => {
    try {
      const userData = sessionStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }, []);

  const isLoggedIn = !!user;

  const handleShare = useCallback(
    (journalId) => {
      const journal = journals.find((j) => j._id === journalId);
      if (journal) {
        const url = `${window.location.origin}/publicjournal/${journal.slug}`;
        navigator.clipboard.writeText(url);
      }
    },
    [journals]
  );

  const handleShowSubscriptions = useCallback(() => {
    setShowSubscriptionsView(true);
  }, []);

  const handleBackFromSubscriptions = useCallback(() => {
    setShowSubscriptionsView(false);
  }, []);

  const handleBackToAll = useCallback(() => {
    if (showFollowingOnly) {
      toggleFollowingOnly();
    }
  }, [showFollowingOnly, toggleFollowingOnly]);

  useEffect(() => {
    if (!showSubscriptionsView) {
      fetchJournals(1);
    }
  }, [fetchJournals, showSubscriptionsView]);

  // Show subscriptions view
  if (showSubscriptionsView) {
    return (
      <>
        {isLoggedIn ? (
          <Navbar name="New Entry" link="/journaling-alt" />
        ) : (
          <LandingNavbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            user={user}
            openLoginModal={openLoginModal}
            openSignupModal={openSignupModal}
          />
        )}
        <SubscriptionsView
          currentUser={user}
          onBack={handleBackFromSubscriptions}
        />
      </>
    );
  }

  if (loading && !loadingMore) {
    return (
      <>
        {isLoggedIn ? (
          <Navbar name="New Entry" link="/journaling-alt" />
        ) : (
          <LandingNavbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            user={user}
            openLoginModal={openLoginModal}
            openSignupModal={openSignupModal}
          />
        )}
        <LoadingState />
      </>
    );
  }

  if (error) {
    return (
      <>
        {isLoggedIn ? (
          <Navbar name="New Entry" link="/journaling-alt" />
        ) : (
          <LandingNavbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            user={user}
            openLoginModal={openLoginModal}
            openSignupModal={openSignupModal}
          />
        )}
        <ErrorState error={error} onRetry={() => fetchJournals(1)} />
      </>
    );
  }

  return (
    <>
      {isLoggedIn ? (
        <Navbar name="New Entry" link="/journaling-alt" />
      ) : (
        <LandingNavbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user={user}
          openLoginModal={openLoginModal}
          openSignupModal={openSignupModal}
        />
      )}

      <div className="mt-16 min-h-screen text-[var(--text-primary)] bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <Header
            showFollowingOnly={showFollowingOnly}
            isLoggedIn={isLoggedIn}
            onShowSubscriptions={handleShowSubscriptions}
            onBackToAll={handleBackToAll}
          />

          <FilterSection
            feedType={feedType}
            handleFeedTypeChange={handleFeedTypeChange}
            isLoggedIn={isLoggedIn}
            toggleFollowingOnly={toggleFollowingOnly}
            showFollowingOnly={showFollowingOnly}
          />

          {journals.length === 0 ? (
            <EmptyState
              showFollowingOnly={showFollowingOnly}
              toggleFollowingOnly={toggleFollowingOnly}
              isLoggedIn={isLoggedIn}
            />
          ) : (
            <>
              {/* Journal Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {journals.map((journal) => (
                  <PublicJournalCard
                    key={journal._id}
                    journal={journal}
                    onLike={handleLike}
                    onShare={handleShare}
                    isLiked={likedJournals.has(journal._id)}
                  />
                ))}
              </div>

              {/* Load More Section */}
              {hasMore && !loadingMore && (
                <div className="text-center mt-12 lg:mt-16">
                  <button
                    onClick={loadMore}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-lg"
                  >
                    <span>Load More Journals</span>
                    <div className="w-1 h-1 bg-current rounded-full opacity-60" />
                    <div className="w-1 h-1 bg-current rounded-full opacity-40" />
                    <div className="w-1 h-1 bg-current rounded-full opacity-20" />
                  </button>
                </div>
              )}

              {loadingMore && (
                <div className="text-center mt-12 lg:mt-16">
                  <div className="inline-flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Loading more journals...
                    </span>
                  </div>
                </div>
              )}

              {!hasMore && (
                <div className="text-center mt-12 lg:mt-16 py-8">
                  <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <span className="text-2xl">🎉</span>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        You've reached the end!
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Thanks for exploring our community
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {modals}
      </div>
    </>
  );
};

export default PublicJournals;
