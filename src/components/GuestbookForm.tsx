'use client';

import { FormEvent, useState } from 'react';

type Entry = {
  id: number;
  name: string;
  message: string;
  createdAt: string;
};

export default function GuestbookForm({
  onAdded,
}: {
  onAdded: (entry: Entry) => void;
}) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<
    | { type: 'idle' | 'success' | 'error'; text: string }
    | undefined
  >(undefined);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setStatus(undefined);

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });
      const data = (await res.json()) as { entry?: Entry; error?: string };
      if (!res.ok || !data.entry) {
        setStatus({ type: 'error', text: data.error ?? 'Something went wrong.' });
        return;
      }
      onAdded(data.entry);
      setName('');
      setMessage('');
      setStatus({
        type: 'success',
        text: 'Thank you for your kind words. o7',
      });
    } catch {
      setStatus({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="Leave a guestbook message"
    >
      <div>
        <label htmlFor="gb-name" className="mb-1 block text-sm font-medium text-gray-300">
          Your name
        </label>
        <input
          id="gb-name"
          type="text"
          required
          maxLength={50}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          placeholder="e.g. TechnoEnjoyer_"
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="gb-message" className="mb-1 block text-sm font-medium text-gray-300">
          Your message
        </label>
        <textarea
          id="gb-message"
          required
          maxLength={500}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input"
          placeholder="Technoblade never dies..."
        />
      </div>
      <div className="flex items-center gap-4">
        <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50">
          {submitting ? 'Sending…' : 'Sign the guestbook'}
        </button>
        {status && (
          <p
            role="status"
            className={`text-sm ${status.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}
          >
            {status.text}
          </p>
        )}
      </div>
    </form>
  );
}
