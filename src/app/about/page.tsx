'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  Code, 
  Database, 
  Smartphone, 
  Monitor, 
  Zap, 
  Palette, 
  Globe, 
  Shield, 
  Gamepad2,
  Music,
  Trophy,
  Users,
  ArrowLeft,
  Github,
  Linkedin,
  Mail,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import ClientOnly from '@/components/ClientOnly'

export default function AboutPage() {
  const technologies = {
    frontend: [
      { name: 'Next.js 15', description: 'React framework with App Router', icon: '⚡' },
      { name: 'React 19', description: 'Latest React with concurrent features', icon: '⚛️' },
      { name: 'TypeScript 5', description: 'Type-safe JavaScript', icon: '📘' },
      { name: 'Tailwind CSS 4', description: 'Utility-first CSS framework', icon: '🎨' },
      { name: 'shadcn/ui', description: 'High-quality component library', icon: '🧩' },
      { name: 'Framer Motion', description: 'Production-ready animations', icon: '🌈' }
    ],
    backend: [
      { name: 'Node.js Server', description: 'Custom server with Socket.IO', icon: '🖥️' },
      { name: 'Prisma ORM', description: 'Type-safe database client', icon: '🗄️' },
      { name: 'Socket.IO', description: 'Real-time communication', icon: '🔌' },
      { name: 'SQLite', description: 'Lightweight database', icon: '💾' }
    ],
    tools: [
      { name: 'ESLint', description: 'Code quality enforcement', icon: '🔍' },
      { name: 'Nodemon', description: 'Development hot reload', icon: '🔄' },
      { name: 'React Hook Form', description: 'Performant forms', icon: '📝' },
      { name: 'Zod', description: 'Schema validation', icon: '✅' }
    ]
  }

  const features = [
    {
      title: 'Responsive Design',
      description: 'Adapts perfectly to mobile, tablet, and desktop screens',
      icon: <Monitor className="h-6 w-6" />
    },
    {
      title: 'Real-time Gameplay',
      description: 'Smooth 60fps gameplay with HTML5 Canvas rendering',
      icon: <Gamepad2 className="h-6 w-6" />
    },
    {
      title: 'Touch Controls',
      description: 'Mobile-friendly touch controls with swipe gestures',
      icon: <Smartphone className="h-6 w-6" />
    },
    {
      title: 'Audio Feedback',
      description: 'Sound effects for eating food and game over events',
      icon: <Music className="h-6 w-6" />
    },
    {
      title: 'Leaderboard System',
      description: 'Global leaderboard with persistent high scores',
      icon: <Trophy className="h-6 w-6" />
    },
    {
      title: 'Dark/Light Theme',
      description: 'Beautiful theme switching with smooth transitions',
      icon: <Palette className="h-6 w-6" />
    },
    {
      title: 'WebSocket Ready',
      description: 'Real-time features for future multiplayer support',
      icon: <Globe className="h-6 w-6" />
    },
    {
      title: 'Type Safety',
      description: 'Full TypeScript implementation for reliability',
      icon: <Shield className="h-6 w-6" />
    }
  ]

  const gameMechanics = [
    'Snake movement with arrow keys and touch controls',
    'Random food types with emoji icons (🍎🍌🍒🍇🍊🍓)',
    'Collision detection for walls and self',
    'Progressive speed increase with score',
    'Pause/resume functionality',
    'High score persistence with localStorage',
    'Responsive grid size for different screens',
    'Game state management (idle, playing, paused, game over)'
  ]

  const databaseSchema = {
    users: [
      'id: String (Primary Key)',
      'email: String (Unique)',
      'name: String (Optional)',
      'createdAt: DateTime',
      'updatedAt: DateTime'
    ],
    leaderboard: [
      'id: String (Primary Key)',
      'playerName: String',
      'score: Int',
      'timestamp: DateTime',
      'createdAt: DateTime',
      'updatedAt: DateTime'
    ]
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Game
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">🐍 WebSnake X</h1>
          <p className="text-xl text-muted-foreground">A modern, full-stack Snake game built with cutting-edge web technologies</p>
        </div>

        {/* Project Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              WebSnake X is a complete gaming application that demonstrates modern web development practices, 
              real-time features, and responsive design. Built with Next.js 15, React 19, and TypeScript, 
              it showcases the latest web technologies while providing an engaging gaming experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Technologies Used</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground">Core Features</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Type Safe</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <ClientOnly>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Frontend Technologies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {technologies.frontend.map((tech, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-lg">{tech.icon}</span>
                      <div>
                        <div className="font-medium">{tech.name}</div>
                        <div className="text-sm text-muted-foreground">{tech.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backend & Database
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {technologies.backend.map((tech, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-lg">{tech.icon}</span>
                      <div>
                        <div className="font-medium">{tech.name}</div>
                        <div className="text-sm text-muted-foreground">{tech.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Development Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {technologies.tools.map((tech, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-lg">{tech.icon}</span>
                      <div>
                        <div className="font-medium">{tech.name}</div>
                        <div className="text-sm text-muted-foreground">{tech.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ClientOnly>

        {/* Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Core Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Game Mechanics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5" />
              Game Mechanics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {gameMechanics.map((mechanic, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">{mechanic}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Database Schema */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Schema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-primary">User Model</h3>
                <div className="space-y-1">
                  {databaseSchema.users.map((field, index) => (
                    <div key={index} className="text-sm font-mono bg-muted p-2 rounded">
                      {field}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-primary">Leaderboard Model</h3>
                <div className="space-y-1">
                  {databaseSchema.leaderboard.map((field, index) => (
                    <div key={index} className="text-sm font-mono bg-muted p-2 rounded">
                      {field}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Architecture */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Project Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">File Structure</h3>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  <div>src/</div>
                  <div className="ml-4">
                    <div>├── app/                 # Next.js App Router pages</div>
                    <div>│   ├── api/            # API routes</div>
                    <div>│   ├── leaderboard/    # Leaderboard page</div>
                    <div>│   └── settings/       # Settings page</div>
                    <div>├── components/          # React components</div>
                    <div>│   ├── ui/             # shadcn/ui components</div>
                    <div>│   └── game/           # Game-specific components</div>
                    <div>├── hooks/              # Custom React hooks</div>
                    <div>├── lib/                # Utility functions</div>
                    <div>│   ├── db.ts          # Database configuration</div>
                    <div>│   ├── socket.ts      # Socket.IO setup</div>
                    <div>│   └── utils.ts       # Utility functions</div>
                    <div>└── prisma/            # Database schema and migrations</div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-2">Key Technical Implementations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="font-medium">Game Engine</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Canvas Rendering (60fps)</li>
                      <li>• RequestAnimationFrame game loop</li>
                      <li>• Collision detection system</li>
                      <li>• State management with React</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Performance Optimizations</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• useCallback hooks for memoization</li>
                      <li>• Efficient canvas rendering</li>
                      <li>• Batched state updates</li>
                      <li>• Memory management</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future Enhancements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Future Enhancements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-primary">Planned Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Multiplayer Support</li>
                  <li>• Global Leaderboard Integration</li>
                  <li>• User Authentication</li>
                  <li>• Achievement System</li>
                  <li>• Custom Themes</li>
                  <li>• Sound Customization</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-primary">Technical Roadmap</h3>
                <ul className="space-y-2 text-sm">
                  <li>• PWA Implementation</li>
                  <li>• Offline Support</li>
                  <li>• Performance Monitoring</li>
                  <li>• Accessibility (WCAG)</li>
                  <li>• Analytics Integration</li>
                  <li>• Mobile App</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Developer Info */}
        <ClientOnly>
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-center text-lg">👨‍💻 Developer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Shivansh Singhal</h3>
                  <p className="text-muted-foreground text-sm">Full Stack Developer & Game Enthusiast</p>
                </div>
                
                <div className="flex justify-center items-center gap-4 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://github.com/shivanshssinghal', '_blank')}
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://www.linkedin.com/in/shivanshssinghal/', '_blank')}
                    className="flex items-center gap-2"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('mailto:shivanshssinghal@gmail.com', '_blank')}
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://shivanshssinghal-vert.vercel.app/', '_blank')}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Portfolio
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground pt-2 border-t">
                  <p>Built with ❤️ using Next.js, TypeScript, and Tailwind CSS</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ClientOnly>
      </div>
    </div>
  )
} 