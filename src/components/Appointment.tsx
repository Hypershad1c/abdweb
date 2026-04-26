'use client';

import { useState } from 'react';

export default function Appointment() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Consultation',
    date: '',
    time: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      setDone(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        service: 'Consultation',
        date: '',
        time: '',
        message: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />

      <input
        type="time"
        value={form.time}
        onChange={(e) => setForm({ ...form, time: e.target.value })}
        required
      />

      <select
        value={form.service}
        onChange={(e) => setForm({ ...form, service: e.target.value })}
      >
        <option>Consultation</option>
        <option>Contract Review</option>
        <option>Court Case</option>
      </select>

      <textarea
        placeholder="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <button disabled={loading}>
        {loading ? 'Booking...' : 'Book Appointment'}
      </button>

      {done && <p>Appointment booked ✓</p>}
    </form>
  );
}