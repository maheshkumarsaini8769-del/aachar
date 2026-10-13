import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  MessageSquare, 
  ChevronDown, 
  ArrowRight, 
  RotateCcw,
  CheckCircle2,
  Bot
} from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  {
    icon: '🥭',
    text: 'Best pickle for daily parathas & dal?',
    reply: 'Our #1 recommendation is the **Classic Ramkela Mango Pickle**! Prepared with tart summer mangoes and cold-pressed mustard oil, it offers the perfect nostalgic crunch. Pair it with stuffed aloo parathas for an unbeatable meal!',
    target: 'category',
    targetParams: { categoryId: 'mango' },
    targetLabel: 'View Mango Pickles'
  },
  {
    icon: '🍋',
    text: 'Which pickle is best for digestion?',
    reply: 'Go for our **Traditional Sweet & Tangy Lemon Pickle**! Made with thin-skinned Kagzi lemons and sun-cured with digestive ajwain, rock salt, and roasted cumin. It has zero oil and is soothing for daily digestion.',
    target: 'product-detail',
    targetParams: { productId: 'nimbu-khatta-meetha' },
    targetLabel: 'View Lemon Pickle'
  },
  {
    icon: '🌶️',
    text: 'I want something fiery & bold!',
    reply: 'You will love our famous **Stuffed Banarasi Red Chilli Pickle**! Whole plump red chillies packed with tangy dry amchur, yellow mustard seeds, and stone-ground spices. Rich in natural heat and aroma!',
    target: 'product-detail',
    targetParams: { productId: 'lal-mirch-bharwa' },
    targetLabel: 'View Red Chilli Pickle'
  },
  {
    icon: '🎁',
    text: 'Recommend a gift hamper for family',
    reply: 'Our **3-Pack Heritage Box** or **4-Pack Royal Feast Crate** are the top choices! Hand-packed inside a carved wooden box with a complimentary handwritten letter and free shipping.',
    target: 'combo-builder',
    targetParams: {},
    targetLabel: 'Build Custom Gift Box'
  }
];

export const AiAssistantWidget = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! 👋 I'm your **Marusthali Taste AI**. Looking for a specific flavour profile, food pairing, or gift recommendation?",
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const chatBottomRef = useRef(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasUnread(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSend = (textToSend = null) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg = {
      id: userMessageId,
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Generate intelligent AI response after short delay
    setTimeout(() => {
      let replyText = "Our pickles are 100% handcrafted in Sikar, Rajasthan using pure cold-pressed mustard oil, sendha namak, and stone-ground spices without chemical vinegar or preservatives!";
      let action = null;

      const lower = text.toLowerCase();
      if (lower.includes('mango') || lower.includes('aam')) {
        replyText = "For mango lovers, we offer **Classic Mango**, **Crisp Baby Kairi**, **Punjabi Dhaba Mango**, and **Royal Marwari Mango**! All sun-ripened in traditional ceramic barnis.";
        action = { target: 'category', targetParams: { categoryId: 'mango' }, label: 'Explore 8 Mango Pickles' };
      } else if (lower.includes('lemon') || lower.includes('nimbu') || lower.includes('digest')) {
        replyText = "Our **Sweet & Tangy Kagzi Lemon Pickle** is oil-free, sun-cooked with digestive ajwain and black salt—ideal for stomach comfort and everyday dal-chawal!";
        action = { target: 'product-detail', targetParams: { productId: 'nimbu-khatta-meetha' }, label: 'View Lemon Pickle' };
      } else if (lower.includes('chilli') || lower.includes('mirch') || lower.includes('spicy') || lower.includes('hot')) {
        replyText = "Craving bold spice? Try our **Stuffed Banarasi Red Chilli** or **Tangy Chatpata Mango**! Packed with authentic whole spices and pungent mustard oil.";
        action = { target: 'all-products', targetParams: {}, label: 'View Spicy Pickles' };
      } else if (lower.includes('gift') || lower.includes('combo') || lower.includes('box') || lower.includes('hamper')) {
        replyText = "Check out our **Craft Your Signature Gift Box** studio! You can handpick any 2, 3 or 4 jars with complimentary keepsake packaging and a personal greeting note.";
        action = { target: 'combo-builder', targetParams: {}, label: 'Open Custom Box Studio' };
      } else if (lower.includes('oil') || lower.includes('preservative') || lower.includes('pure') || lower.includes('natural')) {
        replyText = "We use **100% pure cold-pressed kachi ghani mustard oil** and sun-cooking fermentation over 21 days. Absolutely zero artificial preservatives or acidity regulators!";
      } else if (lower.includes('ship') || lower.includes('delivery') || lower.includes('order')) {
        replyText = "We deliver across all pin codes in India within 3–5 business days using protective cushion packaging so glass jars arrive safely!";
      }

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: replyText,
          action,
          timestamp: 'Just now'
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleSuggestedClick = (item) => {
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: item.text,
      timestamp: 'Just now'
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: item.reply,
          action: {
            target: item.target,
            targetParams: item.targetParams,
            label: item.targetLabel
          },
          timestamp: 'Just now'
        }
      ]);
      setIsTyping(false);
    }, 500);
  };

  const handleActionClick = (action) => {
    if (onNavigate && action?.target) {
      onNavigate(action.target, action.targetParams || {});
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* ================= FLOATING ACTION CIRCLE BUTTON (BOTTOM-RIGHT) ================= */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex items-center gap-2.5">
        
        {/* Subtle Greeting Pill (Visible when closed) */}
        {!isOpen && hasUnread && (
          <button
            onClick={handleOpen}
            className="hidden sm:flex items-center gap-1.5 bg-white text-[#2D1810] border-2 border-amber-400 px-3 py-1.5 rounded-full text-xs font-extrabold shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>Ask Achar AI</span>
          </button>
        )}

        {/* Small Circular AI Button */}
        <button
          onClick={() => (isOpen ? handleClose() : handleOpen())}
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#2D1810] via-[#432314] to-[#693922] text-amber-300 flex items-center justify-center shadow-2xl border-2 border-amber-400 hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          aria-label="Toggle AI Pickle Assistant"
          title="Marusthali Taste AI"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-amber-200" />
          ) : (
            <div className="relative">
              <Sparkles className="w-6 h-6 text-amber-300 group-hover:rotate-12 transition-transform" />
              {/* Pulsing online badge */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white" />
              </span>
            </div>
          )}
        </button>
      </div>

      {/* ================= INTERACTIVE AI CHAT POPOVER ================= */}
      {isOpen && (
        <div className="fixed bottom-36 md:bottom-22 right-4 md:right-6 z-50 w-[92vw] sm:w-[380px] max-h-[520px] bg-white rounded-3xl shadow-2xl border-2 border-[#E8DDCD] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2D1810] to-[#4A2D1B] text-white p-4 flex items-center justify-between border-b border-amber-900/40">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
                <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300/30" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-black text-sm text-amber-100">
                    Marusthali Taste AI
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                </div>
                <p className="text-[10px] text-amber-200/80 font-medium">
                  Traditional Pickle Sommelier • Online
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-1 rounded-full text-amber-200/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Conversation Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF6EE] text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 shadow-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#2D1810] text-amber-50 rounded-br-xs'
                      : 'bg-white text-[#2D1810] border border-[#E8DDCD] rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Optional Navigation Action Button */}
                  {msg.action && (
                    <button
                      onClick={() => handleActionClick(msg.action)}
                      className="mt-2.5 inline-flex items-center gap-1 bg-[#F5A623] hover:bg-[#E09415] text-[#2D1810] font-black text-[11px] px-3 py-1 rounded-full shadow-xs cursor-pointer transition-all"
                    >
                      <span>{msg.action.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <span className="text-[9px] text-gray-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white border border-[#E8DDCD] rounded-2xl px-3 py-2 text-gray-500 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] font-semibold text-gray-400 ml-1">Thinking...</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Suggested Quick Questions */}
          <div className="p-2.5 bg-white border-t border-[#EFE8DD] flex gap-1.5 overflow-x-auto no-scrollbar">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestedClick(q)}
                className="shrink-0 bg-[#FAF5EC] hover:bg-amber-100 text-[#2D1810] border border-[#E8DDCD] rounded-full px-2.5 py-1 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>{q.icon}</span>
                <span className="truncate max-w-[130px]">{q.text}</span>
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#E8DDCD] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about spices, flavours, pairing..."
              className="flex-1 bg-[#FAF6EE] border border-[#E8DDCD] rounded-full px-3.5 py-2 text-xs text-[#2D1810] placeholder-gray-400 focus:outline-none focus:border-amber-500 font-medium"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-8 h-8 rounded-full bg-[#2D1810] hover:bg-amber-900 text-amber-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};

export default AiAssistantWidget;
