import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Brain,
  CheckCircle,
  X,
  ArrowRight,
  Trophy,
  Clock
} from "lucide-react";
import { useState } from "react";

const quizQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    id: 3,
    question: "What is 2 + 2 × 3?",
    options: ["12", "8", "6", "10"],
    correctAnswer: "8"
  }
];

export default function PracticeQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(newAnswers[currentQuestion + 1] || "");
      } else {
        setShowResults(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || "");
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return answer === quizQuestions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswers([]);
    setShowResults(false);
    setQuizStarted(false);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardSidebar />

        <main className="ml-64 p-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="p-8 bg-card rounded-2xl border border-border">
              <div className="p-6 bg-primary/10 rounded-xl inline-block mb-6">
                <Brain className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Practice Quiz</h1>
              <p className="text-muted-foreground mb-8">
                Test your knowledge with this practice quiz. Answer all questions to see your results.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{quizQuestions.length}</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">5 min</div>
                  <div className="text-sm text-muted-foreground">Estimated Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">Easy</div>
                  <div className="text-sm text-muted-foreground">Difficulty</div>
                </div>
              </div>

              <Button size="lg" onClick={() => setQuizStarted(true)}>
                Start Quiz
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quizQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-background">
        <DashboardSidebar />

        <main className="ml-64 p-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="p-6 bg-success/10 rounded-xl inline-block mb-4">
                  <Trophy className="w-12 h-12 text-success" />
                </div>
                <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="text-4xl font-bold text-primary">{percentage}%</div>
                <p className="text-muted-foreground">
                  You got {score} out of {quizQuestions.length} questions correct
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                    <div className="font-semibold">{score} Correct</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <X className="w-8 h-8 text-destructive mx-auto mb-2" />
                    <div className="font-semibold">{quizQuestions.length - score} Incorrect</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <Clock className="w-8 h-8 text-warning mx-auto mb-2" />
                    <div className="font-semibold">5 min</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Review Answers</h3>
                  {quizQuestions.map((question, index) => (
                    <div key={question.id} className="text-left p-4 bg-muted/30 rounded-lg">
                      <p className="font-medium mb-2">{question.question}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Your answer:</span>
                        <span className={`font-medium ${
                          answers[index] === question.correctAnswer ? 'text-success' : 'text-destructive'
                        }`}>
                          {answers[index]}
                        </span>
                        {answers[index] !== question.correctAnswer && (
                          <>
                            <span className="text-sm">• Correct:</span>
                            <span className="font-medium text-success">{question.correctAnswer}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={resetQuiz} className="flex-1">
                    Try Again
                  </Button>
                  <Button className="flex-1">
                    Continue Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <main className="ml-64 p-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{quizQuestions[currentQuestion].question}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
                {quizQuestions[currentQuestion].options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="flex-1 cursor-pointer py-3">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                >
                  {currentQuestion === quizQuestions.length - 1 ? "Finish" : "Next"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}