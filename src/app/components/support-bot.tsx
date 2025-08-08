'use client';

import * as React from 'react';
import { Bot, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export function SupportBot() {
  const [position, setPosition] = React.useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
  const botRef = React.useRef<HTMLButtonElement>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { toast } = useToast();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');

  // Effect to set initial position in useEffect to avoid SSR issues with window object
  React.useEffect(() => {
    const setInitialPosition = () => {
      setPosition({
        x: window.innerWidth - 80, // 64px button width + 16px margin
        y: window.innerHeight - 80, // 64px button height + 16px margin
      });
    };
    setInitialPosition();
    window.addEventListener('resize', setInitialPosition);
    return () => window.removeEventListener('resize', setInitialPosition);
  }, []);

  const handleDragStart = (
    e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    setIsDragging(true);
    const event = 'touches' in e ? e.touches[0] : e;
    if (botRef.current) {
      const rect = botRef.current.getBoundingClientRect();
      setDragOffset({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
    // Prevent text selection while dragging
    e.preventDefault();
  };

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const event = 'touches' in e ? e.touches[0] : e;
    let newX = event.clientX - dragOffset.x;
    let newY = event.clientY - dragOffset.y;
    
    // Clamp position to be within viewport
    newX = Math.max(0, Math.min(newX, window.innerWidth - (botRef.current?.offsetWidth || 0)));
    newY = Math.max(0, Math.min(newY, window.innerHeight - (botRef.current?.offsetHeight || 0)));

    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('touchmove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    } else {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, dragOffset]);

  const handleBotClick = () => {
    if (!isDragging) { // Only open dialog if not dragging
      setIsDialogOpen(true);
    }
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    const newMessages: Message[] = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { text: "Thanks for your message! A support agent will be with you shortly. This is a demo, so no real support is available.", sender: 'bot' },
      ]);
    }, 1000);
  };

  return (
    <>
      <Button
        ref={botRef}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onClick={handleBotClick}
        variant="default"
        size="icon"
        className={cn(
          'fixed z-50 h-16 w-16 rounded-full shadow-lg cursor-grab active:cursor-grabbing transition-opacity duration-200',
          isDragging ? 'opacity-70' : 'opacity-100'
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <Bot className="h-8 w-8" />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Support Chat</DialogTitle>
            <DialogDescription>
              Have a question? Ask our support bot.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <ScrollArea className="h-[300px] w-full rounded-md border p-4 space-y-4">
               {messages.length === 0 && <p className="text-center text-sm text-muted-foreground">No messages yet.</p>}
               {messages.map((msg, index) => (
                <div key={index} className={cn("flex", msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={cn(
                    "rounded-lg px-3 py-2 max-w-[80%]",
                    msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="flex items-center gap-2">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
