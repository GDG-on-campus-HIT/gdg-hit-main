'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckUserQuizStatusQuery, useGenerateQuizMutation, useGetPriorKnowledgeQuery } from '@/redux/features/api/event/eventApi';
import React from 'react';
import { useSelector } from 'react-redux';

// TypeScript interfaces for type safety
interface Skill {
  skill: string;
  proficiency: string[];
  _id: string;
}

interface PriorKnowledgeData {
  eventId: string;
  skills: Skill[];
}

function PriorKnowledge({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const { user } = useSelector((state: any) => state.auth);
  const params = React.use(paramsPromise); // Unwrap params Promise
  const { data: quizStatus, isLoading: isQuizStatusLoading, error: quizStatusError } = useCheckUserQuizStatusQuery(
    { eventId: params.id, userId: user._id },
  );
  const { data: priorKnowledgeData, isLoading, error } = useGetPriorKnowledgeQuery(params.id);
  const [proficiencies, setProficiencies] = useState<{ [skill: string]: string }>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generateQuiz, { isLoading: isLoadingsubmit, isError: isErrorSubmit }] = useGenerateQuizMutation();
  const router = useRouter();

  // Initialize proficiencies when data loads
  useEffect(() => {
    if (priorKnowledgeData && Object.keys(proficiencies).length === 0) {
      const initialProficiencies = priorKnowledgeData.skills.reduce(
        (acc: { [skill: string]: string }, skill: Skill) => {
          acc[skill.skill] = skill.proficiency[0] || 'Basic';
          return acc;
        },
        {}
      );
      setProficiencies(initialProficiencies);
    }
  }, [priorKnowledgeData]);

  // Memoize handleProficiencyChange to prevent unnecessary re-renders
  const handleProficiencyChange = useCallback(
    (skill: string, proficiency: string) => {
      setProficiencies((prev) => ({ ...prev, [skill]: proficiency }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const data = {
        eventId: params.id,
        proficiencies,
      };
      const quizData = await generateQuiz(data).unwrap();
      router.push(`/events/${params.id}/prior-knowledge/test`);
    } catch (error) {
      setSubmitError('Failed to submit prior knowledge.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle loading and error states
  if (isQuizStatusLoading || isLoading) {
    return <p className="text-center text-gray-600 dark:text-gray-300 mt-40">Loading...</p>;
  }

  if (quizStatusError || error) {
    return (
      <p className="text-center text-red-500 mt-40">
        Error:{' '}
        {quizStatusError instanceof Error
          ? quizStatusError.message
          : error instanceof Error
          ? error.message
          : 'Failed to load quiz status or skills'}
      </p>
    );
  }

  // Handle quiz status
  if (quizStatus?.quizGenerated) {
    router.push(`/events/${params.id}/prior-knowledge/test`);
  }

  // Render form if no quiz is generated
  return (
    <div className="relative min-h-screen">
      {/* Main Content */}
      <section className="max-container my-20 px-4 py-10">
        <div className="mb-8 text-center">
          <h2 className="text-6xl max-lg:text-5xl max-md:text-3xl font-bold mb-3 leading-[1.25]">
            Prior{' '}
            <span className="from-red-400 to-red-600 bg-gradient-to-b bg-clip-text text-transparent">
              Knowledge
            </span>{' '}
            Check
          </h2>
          <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed mx-auto">
            Select your proficiency levels to start the test and prepare for the event.
          </p>
        </div>

        {submitError && <p className="text-center text-red-500 mb-4">{submitError}</p>}

        {priorKnowledgeData && (
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto gradient-card p-6 rounded-lg shadow-lg"
          >
            {priorKnowledgeData.skills.map((item: Skill) => (
              <div key={item._id} className="mb-4">
                <label className="block text-gray-800/20 dark:text-gray-300 mb-2 font-medium">
                  {item.skill} Proficiency
                </label>
                <select
                  value={proficiencies[item.skill] || item.proficiency[0]}
                  onChange={(e) => handleProficiencyChange(item.skill, e.target.value)}
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-800/20 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-red-500"
                >
                  {item.proficiency.map((proficiency: string) => (
                    <option key={proficiency} value={proficiency}>
                      {proficiency}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full px-4 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 dark:bg-gradient-to-r dark:from-red-600 dark:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Start Quiz'}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

export default PriorKnowledge;