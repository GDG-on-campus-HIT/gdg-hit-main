"use client"
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Trophy, CheckCircle2, Rocket } from 'lucide-react';

// Add types for skill selection
type TechSkill = 'react' | 'javascript' | 'css' | 'html';
type ViewState = 'form' | 'success' | 'test' | 'results';

// GDG Logo component
const GDGLogo = () => (
  <div className="flex items-center space-x-2 p-10">
    <div className="w-8 h-8">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M50 0 L100 86.6 L0 86.6 Z" fill="#4285F4" />
        <path d="M50 20 L85 75 L15 75 Z" fill="black" />
      </svg>
    </div>
    <span className="text-white text-xl font-bold">GDG HIT</span>
  </div>
);

// Define interfaces
interface FormData {
  name: string;
  rollNo: string;
  email: string;
  techStack: Record<TechSkill, boolean>;
  branch: string;
  batch: string;
}

interface RegistrationFormProps {
  formData: FormData;
  handleChange: (e: { target: { name: string; value: string } }) => void;
  handleCheckboxChange: (e: { target: { name: string; checked: boolean } }) => void;
  handleSubmit: () => void;
}

interface SuccessScreenProps {
  startTest: () => void;
}

interface TestQuestionProps {
  number: number;
  question: string;
  options: string[];
  selectedOption: string;
  onChange: (questionIndex: number, value: string) => void;
}

interface TestScreenProps {
  skill: 'react' | 'javascript' | 'css' | 'html';
  finishTest: () => void;
}

interface ResultsScreenProps {
  score: number;
  reset: () => void;
}

// Question component
const TestQuestion = ({ number, question, options, selectedOption, onChange }: TestQuestionProps) => {
  return (
    <div className="p-4 border border-gray-700 rounded-lg space-y-3">
      <p className="font-medium text-white">Question {number}: {question}</p>
      <div className="space-y-2 mt-4">
        <RadioGroup value={selectedOption} onValueChange={(value) => onChange(number - 1, value)}>
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 py-1">
              <RadioGroupItem 
                value={`q${number}${String.fromCharCode(97 + index)}`} 
                id={`q${number}${String.fromCharCode(97 + index)}`}
                className="text-blue-500 border-gray-500"
              />
              <Label htmlFor={`q${number}${String.fromCharCode(97 + index)}`} className="text-gray-300">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

// Registration form component
const RegistrationForm = ({ formData, handleChange, handleCheckboxChange, handleSubmit }: RegistrationFormProps) => {
  return (
    <Card className="bg-black border-gray-700 shadow-lg bg-dot-white bg-dot-opacity-10">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white">React Event Registration</CardTitle>
        <CardDescription className="text-gray-400">Join us for an exciting React workshop and enhance your skills</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 gap-5">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-gray-300">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="rollNo" className="text-gray-300">Class Roll Number</Label>
            <Input
              id="rollNo"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              className="border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your roll number"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-gray-300">Email Address</Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              disabled
              className="border-gray-600 bg-gray-800 text-gray-400 cursor-not-allowed"
              placeholder="Your email address"
            />
            <p className="text-xs text-gray-500 mt-1">Email is linked to your account</p>
          </div>
          
          <div className="space-y-3">
            <Label className="text-gray-300">Tech Stack Experience</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="html"
                  name="html"
                  checked={formData.techStack.html}
                  onCheckedChange={(checked: boolean) => {
                    handleCheckboxChange({ target: { name: 'html', checked: !!checked } });
                  }}
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <Label htmlFor="html" className="text-gray-300">HTML</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="css"
                  name="css"
                  checked={formData.techStack.css}
                  onCheckedChange={(checked: boolean) => {
                    handleCheckboxChange({ target: { name: 'css', checked: !!checked } });
                  }}
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <Label htmlFor="css" className="text-gray-300">CSS</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="javascript"
                  name="javascript"
                  checked={formData.techStack.javascript}
                  onCheckedChange={(checked: boolean) => {
                    handleCheckboxChange({ target: { name: 'javascript', checked } });
                  }}
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <Label htmlFor="javascript" className="text-gray-300">JavaScript</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="react"
                  name="react"
                  checked={formData.techStack.react}
                  onCheckedChange={(checked: boolean) => {
                    handleCheckboxChange({ target: { name: 'react', checked } });
                  }}
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <Label htmlFor="react" className="text-gray-300">React</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="branch" className="text-gray-300">Branch</Label>
            <Select 
              value={formData.branch} 
              onValueChange={(value) => handleChange({ target: { name: 'branch', value } })}
            >
              <SelectTrigger className="border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select your branch" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                <SelectItem value="CSE">CSE Main</SelectItem>
                <SelectItem value="CSE AIML">CSE AIML</SelectItem>
                <SelectItem value="CSE DS">CSE DS</SelectItem>
                <SelectItem value="CSE CS">CSE CS</SelectItem>
                <SelectItem value="ECE">ECE</SelectItem>
                <SelectItem value="EE">EE</SelectItem>
                <SelectItem value="ME">ME</SelectItem>
                <SelectItem value="CE">CE</SelectItem>
                <SelectItem value="BT">BT</SelectItem>
                <SelectItem value="FT">FT</SelectItem>
                <SelectItem value="AGE">AGE</SelectItem>
                <SelectItem value="OTHERS">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <Label className="text-gray-300">Batch</Label>
            <RadioGroup 
              value={formData.batch}
              onValueChange={(value) => handleChange({ target: { name: 'batch', value } })}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="1" 
                  id="batch1" 
                  className="text-blue-500 border-gray-500"
                />
                <Label htmlFor="batch1" className="text-gray-300">Batch 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="2" 
                  id="batch2"
                  className="text-blue-500 border-gray-500"
                />
                <Label htmlFor="batch2" className="text-gray-300">Batch 2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="3" 
                  id="batch3"
                  className="text-blue-500 border-gray-500"
                />
                <Label htmlFor="batch3" className="text-gray-300">Batch 3</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4">
        <Button
          onClick={handleSubmit}
          className="relative w-full py-6 px-8 rounded-full font-medium text-sm text-gray-700 dark:text-white 
                  transition duration-200 hover:shadow-2xl border dark:border-white/10 
                  bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
        >
          {/* Bottom gradient line */}
          <div className="absolute inset-x-0 h-px w-1/2 mx-auto -bottom-px shadow-2xl bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          {/* Button text */}
          <span className="relative z-20">Register now</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Success screen component
const SuccessScreen = ({ startTest }: SuccessScreenProps) => {
  return (
    <Card className="bg-black border-gray-700 shadow-lg bg-dot-white bg-dot-opacity-10 max-w-md w-full">
      <CardContent className="flex flex-col items-center space-y-6 text-center pt-8">
        <div className="rounded-full bg-green-500/20 p-3">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
        </div>
        <div className="text-blue-500 text-4xl font-bold">Success!</div>
        <div className="text-white text-lg">
          You are successfully registered for the GDG HIT React Event!
        </div>
        
        <Button 
          onClick={startTest}
          className="px-8 py-2 rounded-full relative gradient-card text-gray-700 dark:text-white text-sm hover:shadow-2xl transition duration-200 border dark:border-white/10"
        >
          <Rocket className="h-5 w-5 mr-2" />
          Test Your Skills
        </Button>
      </CardContent>
    </Card>
  );
};

// Test screen component
const TestScreen = ({ skill, finishTest }: TestScreenProps) => {
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = {
    react: [
      {
        question: "What is the React Hook used for managing state?",
        options: ["useStates", "useState", "useStateful"]
      },
      {
        question: "What is the correct lifecycle method for class components?",
        options: ["componentWillRender", "componentDidMount", "onComponentLoad"]
      }
    ],
    javascript: [
      {
        question: "Which method is used to add an element to the end of an array?",
        options: ["push()", "append()", "addToEnd()"]
      },
      {
        question: "What is the correct way to check if an object has a property?",
        options: ["hasOwnProperty()", "contains()", "includes()"]
      }
    ],
    css: [
      {
        question: "Which CSS property is used to control the spacing between elements?",
        options: ["margin", "spacing", "gap"]
      },
      {
        question: "Which CSS property is used for creating responsive layouts?",
        options: ["display: flex", "position: responsive", "align: grid"]
      }
    ],
    html: [
      {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<a>", "<link>", "<href>"]
      },
      {
        question: "Which attribute is used to specify an alternate text for an image?",
        options: ["alt", "title", "description"]
      }
    ]
  };

  const skillQuestions = questions[skill] || questions.html;
  
  const handleAnswerChange = (questionIndex: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };
  
  const handleSubmitTest = () => {
    console.log("Test submission data:", { skill, answers });
    finishTest();
  };

  return (
    <Card className="bg-black border-gray-700 shadow-lg bg-dot-white bg-dot-opacity-10 max-w-3xl w-full">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-blue-500 text-center flex items-center justify-center gap-2">
          <div className="rounded-full bg-blue-500/20 p-2">
            <AlertCircle className="h-6 w-6 text-blue-500" />
          </div>
          {skill.toUpperCase()} Skill Test
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {skillQuestions.map((q, index) => (
          <TestQuestion 
            key={index}
            number={index + 1}
            question={q.question}
            options={q.options}
            onChange={handleAnswerChange}
            selectedOption={answers[index] || ""}
          />
        ))}
      </CardContent>
      
      <CardFooter className="flex justify-end pt-4">
        <Button 
          onClick={handleSubmitTest}
          className="px-8 py-6 font-medium transition-all
          bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
        >
          Submit Test
        </Button>
      </CardFooter>
    </Card>
  );
};

// Results screen component
const ResultsScreen = ({ score, reset }: ResultsScreenProps) => {
  const getSkillLevel = () => {
    if (score < 30) return 'Novice';
    if (score < 60) return 'Beginner';
    if (score < 85) return 'Expert';
    return 'Master';
  };

  const getSkillLevelColor = () => {
    if (score < 30) return 'text-red-500';
    if (score < 60) return 'text-yellow-500';
    if (score < 85) return 'text-blue-500';
    return 'text-green-500';
  };

  const getFeedbackMessage = () => {
    if (score < 30) return "Keep practicing! There&apos;s room for improvement.";
    if (score < 60) return "You&apos;re on the right track! Keep learning.";
    if (score < 85) return "Great job! You have solid knowledge.";
    return "Incredible! You&apos;ve mastered these skills.";
  };

  console.log("Results data:", {
    score,
    skillLevel: getSkillLevel(),
    feedback: getFeedbackMessage()
  });

  return (
    <Card className="bg-black border-gray-700 shadow-lg bg-dot-white bg-dot-opacity-10 max-w-md w-full">
      <CardContent className="flex flex-col items-center space-y-6 text-center pt-8">
        <div className="rounded-full bg-blue-500/20 p-3">
          <Trophy className="h-12 w-12 text-blue-500" />
        </div>
        <div className="text-blue-500 text-3xl font-bold">Test Results</div>
        
        <div className="w-52 h-52 relative rounded-full flex flex-col items-center justify-center border-8 border-gray-700">
          <div className="text-5xl font-bold text-white">{score}</div>
          <div className="text-lg text-gray-400">/ 100</div>
          <Progress 
            value={score} 
            max={100}
            className={`h-2 w-4/5 mt-2 ${
              score >= 85 ? "[&>div]:bg-green-500" : 
              score >= 60 ? "[&>div]:bg-blue-500" : 
              score >= 30 ? "[&>div]:bg-yellow-500" : 
              "[&>div]:bg-red-500"
            } bg-gray-700`}
          />
        </div>
        
        <div className={`text-2xl font-bold ${getSkillLevelColor()}`}>{getSkillLevel()}</div>
        
        <div className="text-white text-lg">
          {getFeedbackMessage()}
        </div>
        
        <Button 
          onClick={reset}
          className="w-full py-6 mt-4 font-medium transition-all
          bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
        >
          Back to Registration
        </Button>
      </CardContent>
    </Card>
  );
};

// Main component
const EventRegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    rollNo: '',
    email: 'student@hit.edu.in',
    techStack: {
      html: false,
      css: false,
      javascript: false,
      react: false
    },
    branch: '',
    batch: ''
  });

  const [currentView, setCurrentView] = useState<ViewState>('form');
  const [skill, setSkill] = useState<TechSkill>('html');
  const [score, setScore] = useState(0);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: { target: { name: string; checked: boolean } }) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      techStack: {
        ...prev.techStack,
        [name]: checked
      }
    }));
  };

  const handleSubmit = () => {
    console.log("Registration form submission data:", formData);
    setCurrentView('success');
  };

  const startTest = () => {
    const selectedTech = Object.entries(formData.techStack)
      .filter(([_, value]) => value)
      .map(([key]) => key) as ('react' | 'javascript' | 'css' | 'html')[];
    
    let selectedSkill: 'react' | 'javascript' | 'css' | 'html' = 'html';
    
    if (selectedTech.includes('react')) {
      selectedSkill = 'react';
    } else if (selectedTech.includes('javascript')) {
      selectedSkill = 'javascript';
    } else if (selectedTech.includes('css')) {
      selectedSkill = 'css';
    }
    
    console.log("Starting skill test:", {
      selectedSkill,
      techStackSelected: selectedTech
    });
    
    setSkill(selectedSkill);
    setCurrentView('test');
  };

  const finishTest = () => {
    const randomScore = Math.floor(Math.random() * 101);
    setScore(randomScore);
    setCurrentView('results');
  };

  const resetApp = () => {
    setFormData({
      name: '',
      rollNo: '',
      email: 'student@hit.edu.in',
      techStack: {
        html: false,
        css: false,
        javascript: false,
        react: false
      },
      branch: '',
      batch: ''
    });
    setCurrentView('form');
    setSkill('html');
    setScore(0);
    
    console.log("Application reset to initial state");
  };

  const renderView = () => {
    switch (currentView) {
      case 'success':
        return <SuccessScreen startTest={startTest} />;
      case 'test':
        return <TestScreen skill={skill} finishTest={finishTest} />;
      case 'results':
        return <ResultsScreen score={score} reset={resetApp} />;
      default:
        return (
          <RegistrationForm 
            formData={formData} 
            handleChange={handleChange} 
            handleCheckboxChange={handleCheckboxChange} 
            handleSubmit={handleSubmit} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-6">
      <div className="mb-8">
        <GDGLogo />
      </div>
      {renderView()}
    </div>
  );
};

export default EventRegistrationForm;