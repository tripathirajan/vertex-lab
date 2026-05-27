import { ThemeProvider, useTheme } from '@vertex-lab/theme';
import {
  Tabs, TabList, Tab, TabPanel,
  Button,
  Accordion, AccordionItem, AccordionHeader, AccordionPanel,
  Switch, Checkbox,
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription,
  Input, Textarea,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Badge,
  Separator,
  Avatar, AvatarImage, AvatarFallback,
} from '@vertex-lab/ui';
import { Moon, Sun, Monitor } from 'lucide-react';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 p-1 bg-[var(--color-bg-muted)] rounded-[var(--radius-lg)]">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-[var(--radius-md)] transition-colors ${theme === 'light' ? 'bg-[var(--color-bg-default)] shadow-[var(--shadow-sm)] text-[var(--color-text-interactive)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-default)]'}`}
      >
        <Sun size={18} />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-[var(--radius-md)] transition-colors ${theme === 'dark' ? 'bg-[var(--color-bg-default)] shadow-[var(--shadow-sm)] text-[var(--color-text-interactive)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-default)]'}`}
      >
        <Moon size={18} />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-[var(--radius-md)] transition-colors ${theme === 'system' ? 'bg-[var(--color-bg-default)] shadow-[var(--shadow-sm)] text-[var(--color-text-interactive)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-default)]'}`}
      >
        <Monitor size={18} />
      </button>
    </div>
  );
}

function Playground() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-default)] text-[var(--color-text-default)] transition-colors">
      <header className="border-b border-[var(--color-border-default)] sticky top-0 bg-[var(--color-bg-default)]/80 backdrop-blur-md z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--color-bg-interactive)] rounded-[var(--radius-lg)] flex items-center justify-center text-white font-bold">V</div>
            <h1 className="text-xl font-bold tracking-tight">Vertex UI</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Playground</h2>
            <p className="text-[var(--color-text-muted)]">Experiment with Vertex components.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Buttons Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b border-[var(--color-border-default)] pb-2">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <Sun size={16} />
                </Button>
              </div>
            </div>

            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b border-[var(--color-border-default)] pb-2">Input & Textarea</h3>
              <div className="space-y-4">
                <Input placeholder="Default input" />
                <Input placeholder="Error input" error />
                <Input placeholder="Disabled input" disabled />
                <Textarea placeholder="Write something..." />
              </div>
            </div>

            {/* Card Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b border-[var(--color-border-default)] pb-2">Card</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>A short card description.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--color-text-subtle)]">This card uses semantic design tokens for theming.</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Action</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Badge Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b border-[var(--color-border-default)] pb-2">Badge</h3>
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>

            {/* Avatar Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b border-[var(--color-border-default)] pb-2">Avatar</h3>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/tripathirajan.png" alt="@rajan" />
                  <AvatarFallback>RT</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Separator */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b border-[var(--color-border-default)] pb-2">Separator</h3>
              <div className="space-y-4">
                <p className="text-sm text-[var(--color-text-subtle)]">Content above separator</p>
                <Separator />
                <p className="text-sm text-[var(--color-text-subtle)]">Content below separator</p>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b border-[var(--color-border-default)] pb-2">Tabs</h3>
              <Tabs defaultValue="preview">
                <TabList>
                  <Tab value="preview">Preview</Tab>
                  <Tab value="code">Code</Tab>
                  <Tab value="docs">Docs</Tab>
                </TabList>
                <TabPanel value="preview">
                  <div className="p-8 border border-dashed border-[var(--color-border-default)] rounded-[var(--radius-xl)] bg-[var(--color-bg-subtle)] flex items-center justify-center">
                    <p className="text-[var(--color-text-muted)] italic">Component Preview Content</p>
                  </div>
                </TabPanel>
                <TabPanel value="code">
                  <pre className="p-4 bg-[var(--color-bg-emphasis)] text-[var(--color-text-on-emphasis)] rounded-[var(--radius-lg)] text-sm overflow-x-auto">
                    <code>{`<Tabs defaultValue="preview">
  <TabList>
    <Tab value="preview">Preview</Tab>
  </TabList>
  <TabPanel value="preview">...</TabPanel>
</Tabs>`}</code>
                  </pre>
                </TabPanel>
                <TabPanel value="docs">
                  <p className="text-sm text-[var(--color-text-subtle)]">Tabs organize content into different views.</p>
                </TabPanel>
              </Tabs>
            </div>

            {/* Accordion Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b border-[var(--color-border-default)] pb-2">Accordion</h3>
              <Accordion type="single" collapsible defaultValue={['item-1']}>
                <AccordionItem value="item-1">
                  <AccordionHeader>Is it accessible?</AccordionHeader>
                  <AccordionPanel>Yes. It adheres to the WAI-ARIA design pattern.</AccordionPanel>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionHeader>Is it unstyled?</AccordionHeader>
                  <AccordionPanel>Yes. It's built on top of headless primitives.</AccordionPanel>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionHeader>Can it be multiple?</AccordionHeader>
                  <AccordionPanel>Yes. Just set the type to "multiple".</AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Selection Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b border-[var(--color-border-default)] pb-2">Selection</h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <Switch id="airplane-mode" />
                  <label htmlFor="airplane-mode" className="text-sm font-medium">Airplane Mode</label>
                </div>
                <div className="flex items-center gap-4">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-sm font-medium leading-none">Accept terms and conditions</label>
                </div>
              </div>
            </div>

            {/* Dialog Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b border-[var(--color-border-default)] pb-2">Dialog</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>Make changes to your profile here.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="name" className="text-right text-sm font-medium">Name</label>
                      <Input id="name" defaultValue="Rajan Tripathi" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="username" className="text-right text-sm font-medium">Username</label>
                      <Input id="username" defaultValue="@rajan" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button>Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Token Showcase */}
          <div className="space-y-6 mt-16">
            <h3 className="text-lg font-semibold border-b border-[var(--color-border-default)] pb-2">Design Tokens</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { name: 'bg-default', var: 'var(--color-bg-default)' },
                { name: 'bg-subtle', var: 'var(--color-bg-subtle)' },
                { name: 'bg-muted', var: 'var(--color-bg-muted)' },
                { name: 'bg-emphasis', var: 'var(--color-bg-emphasis)' },
                { name: 'bg-interactive', var: 'var(--color-bg-interactive)' },
                { name: 'bg-danger', var: 'var(--color-bg-danger-emphasis)' },
                { name: 'bg-success', var: 'var(--color-bg-success-emphasis)' },
                { name: 'bg-warning', var: 'var(--color-bg-warning-emphasis)' },
              ].map(({ name, var: cssVar }) => (
                <div key={name} className="space-y-1.5">
                  <div className="h-12 rounded-[var(--radius-md)] border border-[var(--color-border-default)]" style={{ backgroundColor: cssVar }} />
                  <p className="text-xs text-[var(--color-text-muted)] font-mono">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Playground />
    </ThemeProvider>
  );
}
