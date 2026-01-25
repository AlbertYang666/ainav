'use client';

import { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import Toast, { ToastType } from './Toast';

interface NewsletterSubscribeProps {
  source?: string;
  language?: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export default function NewsletterSubscribe({
  source = 'homepage',
  language = 'en',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  className = '',
}: NewsletterSubscribeProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setToast({
        message: 'Please enter a valid email address',
        type: 'error',
      });
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source, language }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        let message = 'Successfully subscribed! Check your email.';
        let toastType: ToastType = 'success';
        
        if (data.message === 'already_subscribed') {
          message = 'You are already subscribed!';
          toastType = 'info';
        } else if (data.message === 'resubscribed') {
          message = 'Welcome back! You have been resubscribed.';
          toastType = 'success';
        }
        
        setToast({ message, type: toastType });
        setEmail('');
        
        // Reset status after 3 seconds
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setToast({
          message: data.error || 'Failed to subscribe. Please try again.',
          type: 'error',
        });
        
        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setToast({
        message: 'Something went wrong. Please try again.',
        type: 'error',
      });
      console.error('Subscribe error:', error);
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className={className}>
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            disabled={status === 'loading'}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 
                   text-white font-medium flex items-center justify-center gap-2
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200 shadow-lg hover:shadow-xl
                   whitespace-nowrap"
        >
          {status === 'loading' ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Subscribing...
            </>
          ) : status === 'success' ? (
            <>
              <Check className="w-5 h-5" />
              Subscribed!
            </>
          ) : (
            <>
              <Mail className="w-5 h-5" />
              {buttonText}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
