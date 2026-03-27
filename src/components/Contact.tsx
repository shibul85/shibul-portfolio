import { motion } from 'motion/react';
import { Mail, Phone, Send, MapPin } from 'lucide-react';
import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setIsSubmitting(false);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7F5AF0', '#00E5FF', '#2CB67D']
      });
      alert('Message sent successfully! Check your inbox.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Error sending message:", error);
      alert('Failed to send message. Please try again later.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">
              Let's <span className="text-primary">Connect</span>
            </h2>
            <p className="text-white/50 text-lg">
              Have a project in mind or just want to say hi? I'm always open to new opportunities and collaborations.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 glass rounded-2xl border border-white/5">
              <div className="p-4 bg-primary/10 rounded-xl text-primary">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider">Email</p>
                <p className="text-lg font-medium">shibulkumarpadhan85@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 glass rounded-2xl border border-white/5">
              <div className="p-4 bg-accent/10 rounded-xl text-accent">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider">Phone</p>
                <p className="text-lg font-medium">+91 9556106188</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 glass rounded-2xl border border-white/5">
              <div className="p-4 bg-secondary/10 rounded-xl text-secondary">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider">Location</p>
                <p className="text-lg font-medium">Sonpur, Odisha, India</p>
              </div>
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-6 p-8 glass rounded-3xl border border-white/10"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/60">Full Name</label>
            <input
              required
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-6 py-4 bg-white/5 rounded-xl border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/60">Email Address</label>
            <input
              required
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-6 py-4 bg-white/5 rounded-xl border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/60">Message</label>
            <textarea
              required
              rows={4}
              placeholder="Tell me about your project..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-6 py-4 bg-white/5 rounded-xl border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
            />
          </div>
          <button
            disabled={isSubmitting}
            className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:glow-purple transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : (
              <>
                Send Message <Send size={20} />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
