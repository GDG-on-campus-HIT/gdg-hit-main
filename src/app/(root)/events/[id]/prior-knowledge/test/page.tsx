'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetUserQuizQuery, useSubmitQuizMutation } from '@/redux/features/api/event/eventApi';
import { useDispatch, useSelector } from 'react-redux';
import { eventApi } from '@/redux/features/api/event/eventApi';

function QuizPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = React.use(paramsPromise);
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);
  // Fetch quiz data (hardcoded userId for consistency)
  const { data: quizData, isLoading, error } = useGetUserQuizQuery({
    eventId: params.id, // Use params.id as eventId
    userId: user._id, // Use user._id as userId
  }, { skip: !params.id });

  const [submitQuiz, { isLoading: isSubmitting, error: submitError }] = useSubmitQuizMutation();

  // State for quiz
  const [questions, setQuestions] = useState<{ question: string; options: string[]; correctAnswer: string }[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [testConfig, setTestConfig] = useState({
    difficulty: 'Basic',
    selectedQuestionTypes: ['Multiple Choice'],
    questionCount: 0,
    selectedSubjects: [] as string[],
    customTopics: 'None specified',
  });

  // Set questions and testConfig when quizData is fetched
  useEffect(() => {
    if (quizData?.quizGenerated && !quizData.quizAnswered && quizData.questions && quizData.priorKnowledge) {
      setQuestions(quizData.questions);
      setAnswers(new Array(quizData.questions.length).fill(null));
      setTestConfig({
        difficulty: quizData.priorKnowledge.some(p => p.proficiency.includes('Advanced'))
          ? 'Advanced'
          : quizData.priorKnowledge.some(p => p.proficiency.includes('Intermediate'))
          ? 'Intermediate'
          : 'Basic',
        selectedQuestionTypes: ['Multiple Choice'],
        questionCount: quizData.questions.length,
        selectedSubjects: quizData.priorKnowledge.map(p => p.skill),
        customTopics: 'None specified',
      });
    }
  }, [quizData]);

  // Handle answer selection
  const handleAnswerSelect = (option: string) => {
    if (!showExplanation) {
      setSelectedAnswer(option);
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = option;
      setAnswers(newAnswers);

      // Update score
      if (option === questions[currentQuestion].correctAnswer) {
        setScore(prev => prev + 1);
      }
      setShowExplanation(true);
    }
  };

  // Handle next question or finish
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
      setShowExplanation(false);
    }
  };

  // Handle quiz submission
  const handleSubmit = async () => {
    // Validate all questions answered
    if (answers.some(answer => answer === null)) {
      alert('Please answer all questions before submitting.');
      return;
    }

    try {
      const result = await submitQuiz({
        quizId: quizData?.quizId || '',
        answers: answers as string[], // Send answers as an array of selected answers
      }).unwrap();
      
      console.log('Quiz submission successful:', result);

      // Invalidate the quiz query cache to force a re-fetch
      dispatch(eventApi.util.invalidateTags([{ type: 'Quiz', id: params.id }]));

      // Full page reload to ensure updated quiz state
      window.location.reload();
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  // Handle loading and error states
  if (isLoading) return <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error instanceof Error ? error.message : 'Failed to load quiz'}</p>;

  // Handle quiz completed state
  if (quizData?.quizAnswered) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-6xl max-lg:text-5xl max-md:text-3xl font-bold mb-3 leading-[1.25]">
            Prior Knowledge{' '}
              <span className="from-green-400 to-green-600 bg-gradient-to-b bg-clip-text text-transparent">
                Results
              </span>
            </h2>
            <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed mx-auto">
              Review your performance and see the feedback and prerequisites to prepare for the event.
            </p>
          </div>

          {/* Results Card */}
          <div className="gradient-card backdrop-blur-sm rounded-xl p-6 shadow-lg dark:shadow-gray-900/30 mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Your Results</h3>
            <div className="space-y-4">
              <div>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Score: {quizData.result?.score} / {quizData.result?.totalQuestions}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You answered {quizData.result?.score} out of {quizData.result?.totalQuestions} questions correctly.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Feedback</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {quizData.result?.feedback || 'No feedback available.'}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Prerequisites</h4>
                {quizData.result?.prerequisites && quizData.result.prerequisites.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                    {quizData.result.prerequisites.map((prereq, index) => (
                      <li key={index}>{prereq}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">No prerequisites provided.</p>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => router.push(`/events/${quizData.eventId}`)}
                className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Back to Event
              </button>
            </div>
            <div className="pt-5">
              <p className='text-[12px] text-white/50'>Disclaimer: Responses are AI-generated and currently in testing. Some information may be inaccurate or not fully valid.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle no quiz or not generated
  if (!quizData?.quizGenerated) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-300 pt-40">
        No quiz available.
      </p>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-6xl max-lg:text-5xl max-md:text-3xl font-bold mb-3 leading-[1.25]">
            Prior{' '}
            <span className="from-red-400 to-red-600 bg-gradient-to-b bg-clip-text text-transparent">
              Knowledge
            </span>{' '}
            Test
          </h2>
          <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed mx-auto">
            Test your knowledge and skills with our interactive quiz. Answer the questions to the best of your ability and receive instant feedback on your performance.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Score: {score}/{currentQuestion + 1}
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="gradient-card backdrop-blur-sm rounded-xl p-6 shadow-lg dark:shadow-gray-900/30 mb-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {questions[currentQuestion]?.question}
            </h3>
            <div className="space-y-3">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showExplanation && handleAnswerSelect(option)}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${
                    showExplanation
                      ? option === questions[currentQuestion].correctAnswer
                        ? 'border-green-500 bg-green-50/80 dark:bg-green-900/30'
                        : selectedAnswer === option
                        ? 'border-red-500 bg-red-50/80 dark:bg-red-900/30'
                        : 'border-gray-200 dark:border-gray-700'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                  disabled={showExplanation}
                >
                  <span className="text-gray-900 dark:text-white">{option}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {showExplanation && (
            <div className="mt-6 flex justify-end gap-4">
              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Test Info */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 shadow-md dark:shadow-gray-900/20">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Test Configuration</h4>
            <div className="space-y-1 text-gray-600 dark:text-gray-300">
              <p>Difficulty: <span className="capitalize">{testConfig.difficulty}</span></p>
              <p>Question Types: {testConfig.selectedQuestionTypes.join(', ')}</p>
              <p>Total Questions: {testConfig.questionCount}</p>
            </div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 shadow-md dark:shadow-gray-900/20">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Selected Topics</h4>
            <div className="space-y-1 text-gray-600 dark:text-gray-300">
              <p>Subjects: {testConfig.selectedSubjects.join(', ') || 'None'}</p>
              <p>Custom Topics: {testConfig.customTopics}</p>
            </div>
          </div>
        </div> */}

        {/* Submit Error */}
        {submitError && (
          <p className="text-center text-red-500 mt-4">
            Error: {submitError instanceof Error ? submitError.message : 'Failed to submit quiz'}
          </p>
        )}
      </div>
    </div>
  );
}

export default QuizPage;